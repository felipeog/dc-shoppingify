import { CreateListItem } from "@wasp/actions/types";
import { ListItem } from "@wasp/entities";
import HttpError from "@wasp/core/HttpError.js";

// TODO: fix

export const createListItem: CreateListItem<
  Pick<ListItem, "itemId" | "itemsListId">,
  ListItem
> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  throw new HttpError(501, "Not implemented.");

  // const itemsList = await context.entities.ItemsList.findUnique({
  //   select: { listItems: { where: { itemId: Number(args.itemId) } } },
  //   where: { id: Number(args.itemsListId) },
  // });

  // if (itemsList && itemsList.listItems.length) {
  //   throw new HttpError(
  //     400,
  //     "This list item is already in the items list, it can't be created."
  //   );
  // }

  // const createdListItem = await context.entities.ListItem.create({
  //   data: {
  //     item: { connect: { id: Number(args.itemId) } },
  //     itemsList: { connect: { id: Number(args.itemsListId) } },
  //   },
  // });

  // return createdListItem;
};
