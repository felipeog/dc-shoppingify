import { GetCategories, GetItems, GetItemsLists } from "@wasp/queries/types";
import { Category, Item, ItemsList, ListItem } from "@wasp/entities";

export const getCategories: GetCategories<void, Category[]> = async (
  _args,
  context
) => {
  const categories = await context.entities.Category.findMany({
    orderBy: { id: "asc" },
  });

  return categories;
};

export const getItems: GetItems<void, Item[]> = async (_args, context) => {
  const items = await context.entities.Item.findMany({
    orderBy: { id: "asc" },
  });

  return items;
};

export const getItemsLists: GetItemsLists<
  void,
  ItemsList[] & { listItems: ListItem[] }[]
> = async (_args, context) => {
  const itemsLists = await context.entities.ItemsList.findMany({
    orderBy: { id: "asc" },
    include: { listItems: true },
  });

  return itemsLists;
};
