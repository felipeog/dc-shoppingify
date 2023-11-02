import { Category } from "@wasp/entities";
import { CreateCategory } from "@wasp/actions/types";
import { sanitizer, validator } from "./validation.js";
import { z, ZodError } from "zod";
import HttpError from "@wasp/core/HttpError.js";

const createSanitizer = z.object({
  name: sanitizer.name,
});

const createValidator = z.object({
  name: validator.name,
});

export const createCategory: CreateCategory<
  Pick<Category, "name">,
  Category
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

  const existingCategory = await context.entities.Category.findFirst({
    where: {
      name: { equals: sanitizedArgs.name },
      AND: { userId: Number(context.user.id) },
    },
  });

  if (existingCategory) {
    throw new HttpError(400, "This category already exists.");
  }

  const createdCategory = await context.entities.Category.create({
    data: {
      name: sanitizedArgs.name,
      user: { connect: { id: Number(context.user.id) } },
    },
  });

  return createdCategory;
};
