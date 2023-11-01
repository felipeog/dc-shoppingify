import { GetItemsLists } from "@wasp/queries/types";
import { ItemsList, ListItem } from "@wasp/entities";
import HttpError from "@wasp/core/HttpError.js";

export const getItemsLists: GetItemsLists<
  void,
  ItemsList[] & { listItems: ListItem[] }[]
> = async (_args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const itemsLists = await context.entities.ItemsList.findMany({
    where: { user: { id: context.user.id } },
    include: { listItems: true },
    orderBy: { id: "asc" },
  });

  return itemsLists;
};
