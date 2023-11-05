import { ListItem } from "@wasp/entities";
import { UpdateListItem } from "@wasp/actions/types";
import { sanitizer, validator } from "./validation.js";
import { z, ZodError } from "zod";
import HttpError from "@wasp/core/HttpError.js";

const updateSanitizer = z.object({
  id: sanitizer.id,
  amount: sanitizer.amount,
  isDone: sanitizer.isDone,
  itemId: sanitizer.itemId,
  itemsListId: sanitizer.itemsListId,
});

const updateValidator = z.object({
  id: validator.id,
  amount: validator.amount.optional(),
  isDone: validator.isDone.optional(),
  itemId: validator.itemId.optional(),
  itemsListId: validator.itemsListId.optional(),
});

export const updateListItem: UpdateListItem<
  Pick<ListItem, "id"> &
    Partial<Pick<ListItem, "amount" | "isDone" | "itemId" | "itemsListId">>,
  ListItem
> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const sanitizedArgs = updateSanitizer.parse(args);

  try {
    updateValidator.parse(sanitizedArgs);
  } catch (error) {
    const firstErrorMessage =
      (error as ZodError).errors[0].message ?? "Invalid input.";

    throw new HttpError(400, firstErrorMessage);
  }

  const listItemToUpdate = await context.entities.ListItem.findFirst({
    where: {
      id: sanitizedArgs.id,
      userId: context.user.id,
    },
  });

  if (!listItemToUpdate) {
    throw new HttpError(404, "List item not found.");
  }

  if (
    sanitizedArgs.itemId &&
    sanitizedArgs.itemId !== listItemToUpdate.itemId &&
    sanitizedArgs.itemsListId &&
    sanitizedArgs.itemsListId !== listItemToUpdate.itemsListId
  ) {
    const existingItem = await context.entities.Item.findFirst({
      where: {
        id: sanitizedArgs.itemId,
        userId: context.user.id,
      },
    });

    if (!existingItem) {
      throw new HttpError(400, "Invalid item.");
    }

    const existingItemsList = await context.entities.ItemsList.findFirst({
      where: {
        id: sanitizedArgs.itemsListId,
        userId: context.user.id,
      },
    });

    if (!existingItemsList) {
      throw new HttpError(400, "Invalid items list.");
    }

    const itemsListWithItem = await context.entities.ItemsList.findFirst({
      where: {
        id: sanitizedArgs.itemsListId,
        userId: context.user.id,
        listItems: { some: { itemId: sanitizedArgs.itemId } },
      },
    });

    if (itemsListWithItem) {
      throw new HttpError(400, "The item already exists in the items list.");
    }

    const updatedItem = await context.entities.ListItem.update({
      where: { id: sanitizedArgs.id },
      data: {
        amount: sanitizedArgs.amount,
        isDone: sanitizedArgs.isDone,
        item: { connect: { id: sanitizedArgs.itemId } },
        itemsList: { connect: { id: sanitizedArgs.itemsListId } },
      },
    });

    return updatedItem;
  }

  if (
    sanitizedArgs.itemId &&
    sanitizedArgs.itemId !== listItemToUpdate.itemId
  ) {
    const existingItem = await context.entities.Item.findFirst({
      where: {
        id: sanitizedArgs.itemId,
        userId: context.user.id,
      },
    });

    if (!existingItem) {
      throw new HttpError(400, "Invalid item.");
    }

    const itemsListWithItem = await context.entities.ItemsList.findFirst({
      where: {
        id: listItemToUpdate.itemsListId,
        userId: context.user.id,
        listItems: { some: { itemId: sanitizedArgs.itemId } },
      },
    });

    if (itemsListWithItem) {
      throw new HttpError(400, "The item already exists in the items list.");
    }

    const updatedItem = await context.entities.ListItem.update({
      where: { id: sanitizedArgs.id },
      data: {
        amount: sanitizedArgs.amount,
        isDone: sanitizedArgs.isDone,
        item: { connect: { id: sanitizedArgs.itemId } },
        itemsList: { connect: { id: listItemToUpdate.itemsListId } },
      },
    });

    return updatedItem;
  }

  if (
    sanitizedArgs.itemsListId &&
    sanitizedArgs.itemsListId !== listItemToUpdate.itemsListId
  ) {
    const existingItemsList = await context.entities.ItemsList.findFirst({
      where: {
        id: sanitizedArgs.itemsListId,
        userId: context.user.id,
      },
    });

    if (!existingItemsList) {
      throw new HttpError(400, "Invalid items list.");
    }

    const itemsListWithItem = await context.entities.ItemsList.findFirst({
      where: {
        id: sanitizedArgs.itemsListId,
        userId: context.user.id,
        listItems: { some: { itemId: listItemToUpdate.itemId } },
      },
    });

    if (itemsListWithItem) {
      throw new HttpError(400, "The item already exists in the items list.");
    }

    const updatedItem = await context.entities.ListItem.update({
      where: { id: sanitizedArgs.id },
      data: {
        amount: sanitizedArgs.amount,
        isDone: sanitizedArgs.isDone,
        item: { connect: { id: listItemToUpdate.itemId } },
        itemsList: { connect: { id: sanitizedArgs.itemsListId } },
      },
    });

    return updatedItem;
  }

  const updatedItem = await context.entities.ListItem.update({
    where: { id: sanitizedArgs.id },
    data: {
      amount: sanitizedArgs.amount,
      isDone: sanitizedArgs.isDone,
      item: { connect: { id: listItemToUpdate.itemId } },
      itemsList: { connect: { id: listItemToUpdate.itemsListId } },
    },
  });

  return updatedItem;
};
