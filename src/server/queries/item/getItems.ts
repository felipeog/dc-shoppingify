import { GetItems } from "@wasp/queries/types";
import { Item } from "@wasp/entities";
import HttpError from "@wasp/core/HttpError.js";

export const getItems: GetItems<void, Item[]> = async (_args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const items = await context.entities.Item.findMany({
    where: { userId: context.user.id },
    orderBy: { id: "asc" },
  });

  return items;
};
