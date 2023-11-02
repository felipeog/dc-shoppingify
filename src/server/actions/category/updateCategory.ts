import { Category } from "@wasp/entities";
import { sanitizer, validator } from "./validation.js";
import { UpdateCategory } from "@wasp/actions/types";
import { z, ZodError } from "zod";
import HttpError from "@wasp/core/HttpError.js";

const updateSanitizer = z.object({
  id: sanitizer.id,
  name: sanitizer.name,
});

const updateValidator = z.object({
  id: validator.id,
  name: validator.name,
});

export const updateCategory: UpdateCategory<
  Pick<Category, "name" | "id">,
  Category
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

  const existingCategory = await context.entities.Category.findFirst({
    where: {
      name: { equals: sanitizedArgs.name },
      AND: { userId: Number(context.user.id) },
    },
  });

  if (existingCategory) {
    throw new HttpError(400, "This category already exists.");
  }

  const updatedCategory = await context.entities.Category.update({
    where: { id: sanitizedArgs.id },
    data: { name: sanitizedArgs.name },
  });

  return updatedCategory;
};
