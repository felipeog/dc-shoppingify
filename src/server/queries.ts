import {
  GetCategories,
  GetItems,
  GetItemsLists,
  GetListItems,
} from "@wasp/queries/types";
import { Category, Item, ItemsList, ListItem } from "@wasp/entities";
import HttpError from "@wasp/core/HttpError.js";

export const getCategories: GetCategories<void, Category[]> = async (
  _args,
  context
) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const categories = await context.entities.Category.findMany({
    where: { userId: context.user.id },
    orderBy: { id: "asc" },
  });

  return categories;
};

export const getItems: GetItems<void, Item[]> = async (_args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const items = await context.entities.Item.findMany({
    orderBy: { id: "asc" },
  });

  return items;
};

export const getItemsLists: GetItemsLists<
  void,
  ItemsList[] & { listItems: ListItem[] }[]
> = async (_args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const itemsLists = await context.entities.ItemsList.findMany({
    orderBy: { id: "asc" },
    include: { listItems: true },
    where: { user: { id: context.user.id } },
  });

  return itemsLists;
};

export const getListItems: GetListItems<void, ListItem[]> = async (
  _args,
  context
) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const listItems = await context.entities.ListItem.findMany({
    orderBy: { id: "asc" },
    where: { itemsList: { userId: context.user.id } },
  });

  return listItems;
};
