import { GetCategories, GetItems } from "@wasp/queries/types";
import { Category, Item } from "@wasp/entities";

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
