import { GetListItemsFromItemsList } from "@wasp/queries/types";
import { ListItem } from "@wasp/entities";
import HttpError from "@wasp/core/HttpError.js";

// TODO: add valitation

export const getListItemsFromItemsList: GetListItemsFromItemsList<
  Pick<ListItem, "itemsListId">,
  ListItem[]
> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const listItems = await context.entities.ListItem.findMany({
    orderBy: { id: "asc" },
    where: { itemsListId: args.itemsListId, userId: context.user.id },
  });

  return listItems;
};
