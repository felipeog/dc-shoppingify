import { GetListItems } from "@wasp/queries/types";
import { ListItem } from "@wasp/entities";
import HttpError from "@wasp/core/HttpError.js";

export const getListItems: GetListItems<void, ListItem[]> = async (
  _args,
  context
) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const listItems = await context.entities.ListItem.findMany({
    orderBy: { id: "asc" },
    where: { userId: context.user.id },
  });

  return listItems;
};
