import { CreateCategory, DeleteCategory } from "@wasp/actions/types";
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

export const deleteCategory: DeleteCategory<
  Pick<Category, "id">,
  Category
> = async (args, context) => {
  const category = await context.entities.Category.delete({
    where: {
      id: args.id,
    },
  });

  return category;
};
