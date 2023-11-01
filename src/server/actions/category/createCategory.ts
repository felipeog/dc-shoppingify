import { Category } from "@wasp/entities";
import { CreateCategory } from "@wasp/actions/types";
import { z, ZodError } from "zod";
import HttpError from "@wasp/core/HttpError.js";

const categorySchema = z.object({
  name: z
    .string()
    .min(3, "The category name must contain at least 3 characters.")
    .max(100, "The category name must contain at most 100 characters."),
});

export const createCategory: CreateCategory<
  Pick<Category, "name">,
  Category
> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  try {
    categorySchema.parse(args);
  } catch (error) {
    const firstErrorMessage =
      (error as ZodError).errors[0].message ?? "Invalid input.";

    throw new HttpError(400, firstErrorMessage);
  }

  // TODO: prevent case insensitive duplicates
  const createdCategory = await context.entities.Category.create({
    data: {
      name: args.name,
    },
  });

  return createdCategory;
};
