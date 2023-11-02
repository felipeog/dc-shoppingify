import { Category } from "@wasp/entities";
import { DeleteCategory } from "@wasp/actions/types";
import { sanitizer, validator } from "./validation.js";
import { z, ZodError } from "zod";
import HttpError from "@wasp/core/HttpError.js";

const deleteSanitizer = z.object({
  id: sanitizer.id,
});

const deleteValidator = z.object({
  id: validator.id,
});

export const deleteCategory: DeleteCategory<
  Pick<Category, "id">,
  Category
> = async (args, context) => {
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

  const categoryToDelete = await context.entities.Category.findFirst({
    where: {
      id: sanitizedArgs.id,
      AND: { userId: { equals: context.user.id } },
    },
  });

  if (!categoryToDelete) {
    throw new HttpError(404, "Category not found.");
  }

  const itemsInCategory = await context.entities.Item.findMany({
    select: { id: true },
    where: {
      categoryId: { equals: sanitizedArgs.id },
      AND: { userId: { equals: context.user.id } },
    },
  });

  if (itemsInCategory.length) {
    throw new HttpError(400, "This category is in use, it can't be deleted.");
  }

  const deletedCategory = await context.entities.Category.delete({
    where: { id: sanitizedArgs.id },
  });

  return deletedCategory;
};
