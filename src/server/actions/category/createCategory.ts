import { Category } from "@wasp/entities";
import { CreateCategory } from "@wasp/actions/types";
import HttpError from "@wasp/core/HttpError.js";

export const createCategory: CreateCategory<
  Pick<Category, "name">,
  Category
> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  // TODO: prevent case insensitive duplicates
  const createdCategory = await context.entities.Category.create({
    data: {
      name: args.name,
    },
  });

  return createdCategory;
};
