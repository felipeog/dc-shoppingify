import { Category, Item } from "@wasp/entities";
import { GetItemsByCategory } from "@wasp/queries/types";
import HttpError from "@wasp/core/HttpError.js";

type TOutput = { category: Category; items: Item[] }[];

export const getItemsByCategory: GetItemsByCategory<void, TOutput> = async (
  _args,
  context
) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const items = await context.entities.Item.findMany({
    include: { category: true },
    where: { userId: context.user.id },
    orderBy: { id: "asc" },
  });
  const itemsByCategory = items.reduce(
    (acc: TOutput, cur: Item & { category: Category }) => {
      const currentCategory = cur.category;
      const categoryGroupIndex = acc.findIndex(
        (categoryGroup) => categoryGroup.category.id === currentCategory.id
      );

      if (categoryGroupIndex < 0) {
        const newCategoryGroup = { category: currentCategory, items: [cur] };

        return [...acc, newCategoryGroup];
      }

      const currentCategoryGroup = acc[categoryGroupIndex];

      acc[categoryGroupIndex] = {
        ...currentCategoryGroup,
        items: [...currentCategoryGroup.items, cur],
      };

      return acc;
    },
    []
  );

  return itemsByCategory;
};
