import { CreateListItem } from "@wasp/actions/types";
import { ListItem } from "@wasp/entities";
import { sanitizer, validator } from "./validation.js";
import { z, ZodError } from "zod";
import HttpError from "@wasp/core/HttpError.js";

const createSanitizer = z.object({
  amount: sanitizer.amount,
  isDone: sanitizer.isDone,
  itemId: sanitizer.itemId,
  itemsListId: sanitizer.itemsListId,
});

const createValidator = z.object({
  amount: validator.amount.optional(),
  isDone: validator.isDone.optional(),
  itemId: validator.itemId,
  itemsListId: validator.itemsListId,
});

export const createListItem: CreateListItem<
  Pick<ListItem, "itemId" | "itemsListId"> &
    Partial<Pick<ListItem, "amount" | "isDone">>,
  ListItem
> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const sanitizedArgs = createSanitizer.parse(args);

  try {
    createValidator.parse(sanitizedArgs);
  } catch (error) {
    const firstErrorMessage =
      (error as ZodError).errors[0].message ?? "Invalid input.";

    throw new HttpError(400, firstErrorMessage);
  }

  const existingItemsList = await context.entities.ItemsList.findFirst({
    where: { id: sanitizedArgs.itemsListId, userId: context.user.id },
  });

  if (!existingItemsList) {
    throw new HttpError(400, "Invalid items list.");
  }

  const existingItem = await context.entities.Item.findFirst({
    where: { id: sanitizedArgs.itemId, userId: context.user.id },
  });

  if (!existingItem) {
    throw new HttpError(400, "Invalid item.");
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

  const createdListItem = await context.entities.ListItem.create({
    data: {
      amount: sanitizedArgs.amount,
      isDone: sanitizedArgs.isDone,
      user: { connect: { id: Number(context.user.id) } },
      item: { connect: { id: sanitizedArgs.itemId } },
      itemsList: { connect: { id: sanitizedArgs.itemsListId } },
    },
  });

  return createdListItem;
};
