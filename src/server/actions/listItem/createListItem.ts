import { CreateListItem } from "@wasp/actions/types";
import { ListItem } from "@wasp/entities";
import { z, ZodError } from "zod";
import HttpError from "@wasp/core/HttpError.js";

const sanitizer = z.object({
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
  amount: z.number().min(1, "The minimum amount is 1.").optional(),
  isDone: z.boolean().optional(),
  itemId: z.number().min(1, "Invalid item ID."),
  itemsListId: z.number().min(1, "Invalid items list ID."),
});

export const createListItem: CreateListItem<
  Pick<ListItem, "itemId" | "itemsListId" | "amount" | "isDone">,
  ListItem
> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const sanitizedArgs = sanitizer.parse(args);

  try {
    validator.parse(sanitizedArgs);
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
