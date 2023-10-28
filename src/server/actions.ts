import { CreateCategory } from "@wasp/actions/types";
import { Category } from "@wasp/entities";

export const createCategory: CreateCategory<
  Pick<Category, "name">,
  Category
> = async (args, context) => {
  const newCategory = await context.entities.Category.create({
    data: {
      name: args.name,
    },
  });

  return newCategory;
};
