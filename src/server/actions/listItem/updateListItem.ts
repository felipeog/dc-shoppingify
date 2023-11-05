import { ListItem } from "@wasp/entities";
import { UpdateListItem } from "@wasp/actions/types";
import { z, ZodError } from "zod";
import HttpError from "@wasp/core/HttpError.js";

const sanitizer = z.object({
  id: z.preprocess(
    (value) => (!value ? undefined : Number(value)),
    z.union([z.number(), z.undefined()])
  ),
  amount: z.preprocess(
    (value) => (!value ? undefined : Number(value)),
    z.union([z.number(), z.undefined()])
  ),
  isDone: z.preprocess(
    (value) =>
      ["true", "false"].includes(String(value)) ? Boolean(value) : undefined,
    z.union([z.boolean(), z.undefined()])
  ),
  itemId: z.preprocess(
    (value) => (!value ? undefined : Number(value)),
    z.union([z.number(), z.undefined()])
  ),
  itemsListId: z.preprocess(
    (value) => (!value ? undefined : Number(value)),
    z.union([z.number(), z.undefined()])
  ),
});

const validator = z.object({
  id: z.number().min(1, "Invalid list item ID."),
  amount: z.number().min(1, "The minimum amount is 1.").optional(),
  isDone: z.boolean().optional(),
  itemId: z.number().min(1, "Invalid item ID.").optional(),
  itemsListId: z.number().min(1, "Invalid items list ID.").optional(),
});

export const updateListItem: UpdateListItem<
  Pick<ListItem, "id" | "amount" | "isDone" | "itemId" | "itemsListId">,
  ListItem
> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const sanitizedArgs = sanitizer.parse(args);
  console.log({ sanitizedArgs });

  try {
    validator.parse(sanitizedArgs);
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
        itemsList: { connect: { id: sanitizedArgs.itemsListId } },
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
        item: { connect: { id: sanitizedArgs.itemId } },
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
      item: { connect: { id: sanitizedArgs.itemId } },
      itemsList: { connect: { id: sanitizedArgs.itemsListId } },
    },
  });

  return updatedItem;
};
