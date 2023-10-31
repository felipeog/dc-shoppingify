import { ListItem } from "@wasp/entities";
import { UpdateListItem } from "@wasp/actions/types";
import HttpError from "@wasp/core/HttpError.js";

export const updateListItem: UpdateListItem<
  Pick<ListItem, "id" | "amount" | "isDone">,
  ListItem
> = async (_args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  // TODO: implement
  throw new HttpError(501, "Not implemented.");
};
