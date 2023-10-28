import {
  CreateCategory,
  CreateItem,
  DeleteCategory,
  DeleteItem,
} from "@wasp/actions/types";
import HttpError from "@wasp/core/HttpError.js";
import { Category, Item } from "@wasp/entities";

export const createCategory: CreateCategory<
  Pick<Category, "name">,
  Category
> = async (args, context) => {
  const createdCategory = await context.entities.Category.create({
    data: {
      name: args.name,
    },
  });

  return createdCategory;
};

export const deleteCategory: DeleteCategory<
  Pick<Category, "id">,
  Category
> = async (args, context) => {
  const itemsInCategory = await context.entities.Item.findMany({
    select: { id: true },
    where: { categoryId: { equals: args.id } },
  });

  if (itemsInCategory.length) {
    throw new HttpError(400, "This category is in use, it can't be deleted.");
  }

  const deletedCategory = await context.entities.Category.delete({
    where: { id: args.id },
  });

  return deletedCategory;
};

export const createItem: CreateItem<
  Pick<Item, "categoryId" | "image" | "name" | "note">,
  Item
> = async (args, context) => {
  const createdItem = await context.entities.Item.create({
    data: {
      image: args.image,
      name: args.name,
      note: args.note,
      category: { connect: { id: Number(args.categoryId) } },
    },
  });

  return createdItem;
};

export const deleteItem: DeleteItem<Pick<Item, "id">, Item> = async (
  args,
  context
) => {
  const listItemsinItem = await context.entities.ListItem.findMany({
    select: { id: true },
    where: { itemId: { equals: args.id } },
  });

  if (listItemsinItem.length) {
    throw new HttpError(400, "This item is in use, it can't be deleted.");
  }

  const deletedItem = await context.entities.Item.delete({
    where: { id: args.id },
  });

  return deletedItem;
};
