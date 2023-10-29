import {
  CreateCategory,
  CreateItem,
  CreateItemsList,
  CreateListItem,
  DeleteCategory,
  DeleteItem,
} from "@wasp/actions/types";
import HttpError from "@wasp/core/HttpError.js";
import { Category, Item, ItemsList, ListItem } from "@wasp/entities";

export const createCategory: CreateCategory<
  Pick<Category, "name">,
  Category
> = async (args, context) => {
  // TODO: prevent case insensitive duplicates

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
  // TODO: make sure empty args are `undefined`

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

export const createItemsList: CreateItemsList<
  Pick<ItemsList, "name">,
  ItemsList
> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const createdItemsList = await context.entities.ItemsList.create({
    data: {
      name: args.name || undefined,
      user: { connect: { id: Number(context.user.id) } },
    },
  });

  return createdItemsList;
};

export const createListItem: CreateListItem<
  Pick<ListItem, "itemId" | "itemsListId">,
  ListItem
> = async (args, context) => {
  const itemsList = await context.entities.ItemsList.findUnique({
    select: { listItems: { where: { itemId: Number(args.itemId) } } },
    where: { id: Number(args.itemsListId) },
  });

  if (itemsList && itemsList.listItems.length) {
    throw new HttpError(
      400,
      "This list item is already in the items list, it can't be created."
    );
  }

  const createdListItem = await context.entities.ListItem.create({
    data: {
      item: { connect: { id: Number(args.itemId) } },
      itemsList: { connect: { id: Number(args.itemsListId) } },
    },
  });

  return createdListItem;
};
