import { DeleteItem } from "@wasp/actions/types";
import { Item } from "@wasp/entities";
import { sanitizer, validator } from "./validation.js";
import { z, ZodError } from "zod";
import HttpError from "@wasp/core/HttpError.js";

const deleteSanitizer = z.object({
  id: sanitizer.id,
});

const deleteValidator = z.object({
  id: validator.id,
});

export const deleteItem: DeleteItem<Pick<Item, "id">, Item> = async (
  args,
  context
) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const sanitizedArgs = deleteSanitizer.parse(args);

  try {
    deleteValidator.parse(sanitizedArgs);
  } catch (error) {
    const firstErrorMessage =
      (error as ZodError).errors[0].message ?? "Invalid input.";

    throw new HttpError(400, firstErrorMessage);
  }

  const itemToDelete = await context.entities.Item.findFirst({
    where: {
      id: sanitizedArgs.id,
      AND: { userId: { equals: context.user.id } },
    },
  });

  if (!itemToDelete) {
    throw new HttpError(404, "Item not found.");
  }

  const listItemsinItem = await context.entities.ListItem.findMany({
    select: { id: true },
    where: {
      itemId: { equals: sanitizedArgs.id },
      AND: { userId: Number(context.user.id) },
    },
  });

  if (listItemsinItem.length) {
    throw new HttpError(400, "This item is in use, it can't be deleted.");
  }

  const deletedItem = await context.entities.Item.delete({
    where: { id: sanitizedArgs.id },
  });

  return deletedItem;
};
