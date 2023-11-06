import { CreateItem } from "@wasp/actions/types";
import { Item } from "@wasp/entities";
import { sanitizer, validator } from "./validation.js";
import { z, ZodError } from "zod";
import HttpError from "@wasp/core/HttpError.js";

const createSanitizer = z.object({
  name: sanitizer.name,
  note: sanitizer.note,
  image: sanitizer.image,
  categoryId: sanitizer.categoryId,
});

const createValidator = z.object({
  name: validator.name,
  note: validator.note,
  image: validator.image,
  categoryId: validator.categoryId,
});

export const createItem: CreateItem<
  Pick<Item, "categoryId" | "name"> & Partial<Pick<Item, "image" | "note">>,
  Item
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

  const existingItem = await context.entities.Item.findFirst({
    where: {
      name: { equals: sanitizedArgs.name },
      AND: { userId: Number(context.user.id) },
    },
  });

  if (existingItem) {
    throw new HttpError(400, "This item already exists.");
  }

  const createdItem = await context.entities.Item.create({
    data: {
      name: sanitizedArgs.name,
      note: sanitizedArgs.note,
      image: sanitizedArgs.image,
      category: { connect: { id: Number(sanitizedArgs.categoryId) } },
      user: { connect: { id: Number(context.user.id) } },
    },
  });

  return createdItem;
};
