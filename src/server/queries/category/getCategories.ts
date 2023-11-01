import { Category } from "@wasp/entities";
import { GetCategories } from "@wasp/queries/types";
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
