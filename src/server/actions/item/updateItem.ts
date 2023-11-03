import { Item } from "@wasp/entities";
import { sanitizer, validator } from "./validation.js";
import { UpdateItem } from "@wasp/actions/types";
import { z, ZodError } from "zod";
import HttpError from "@wasp/core/HttpError.js";

const updateSanitizer = z.object({
  id: sanitizer.id,
  name: sanitizer.name,
  note: sanitizer.note,
  image: sanitizer.image,
  categoryId: sanitizer.categoryId,
});

const updateValidator = z.object({
  id: validator.id,
  name: validator.name,
  note: validator.note,
  image: validator.image,
  categoryId: validator.categoryId,
});

export const updateItem: UpdateItem<
  Pick<Item, "categoryId" | "id" | "image" | "name" | "note">,
  Item
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

  const itemToUpdate = await context.entities.Item.findFirst({
    where: {
      id: sanitizedArgs.id,
      AND: { userId: { equals: context.user.id } },
    },
  });

  if (!itemToUpdate) {
    throw new HttpError(404, "Item not found.");
  }

  const existingItem = await context.entities.Item.findFirst({
    where: {
      name: { equals: sanitizedArgs.name },
      AND: { userId: Number(context.user.id) },
    },
  });

  if (itemToUpdate.id !== existingItem?.id) {
    throw new HttpError(400, "This item already exists.");
  }

  const updatedItem = await context.entities.Item.update({
    where: { id: sanitizedArgs.id },
    data: {
      name: sanitizedArgs.name,
      note: sanitizedArgs.note,
      image: sanitizedArgs.image,
      category: { connect: { id: sanitizedArgs.categoryId } },
    },
  });

  return updatedItem;
};
