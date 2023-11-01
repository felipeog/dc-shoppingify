import { Category } from "@wasp/entities";
import { DeleteCategory } from "@wasp/actions/types";
import HttpError from "@wasp/core/HttpError.js";

export const deleteCategory: DeleteCategory<
  Pick<Category, "id">,
  Category
> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const categoryToDelete = await context.entities.Category.findFirst({
    where: {
      id: args.id,
      AND: { userId: { equals: context.user.id } },
    },
  });

  if (!categoryToDelete) {
    throw new HttpError(404, "Category not found.");
  }

  const itemsInCategory = await context.entities.Item.findMany({
    select: { id: true },
    where: {
      categoryId: { equals: args.id },
      AND: { userId: { equals: context.user.id } },
    },
  });

  console.log({ itemsInCategory });

  if (itemsInCategory.length) {
    throw new HttpError(400, "This category is in use, it can't be deleted.");
  }

  const deletedCategory = await context.entities.Category.delete({
    where: { id: args.id },
  });

  return deletedCategory;
};
