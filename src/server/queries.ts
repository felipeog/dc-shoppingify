import { GetCategories } from "@wasp/queries/types";
import { Category } from "@wasp/entities";

export const getCategories: GetCategories<void, Category[]> = async (
  _args,
  context
) => {
  const categories = await context.entities.Category.findMany({
    orderBy: { id: "asc" },
  });

  return categories;
};
