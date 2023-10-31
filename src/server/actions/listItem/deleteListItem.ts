import { DeleteListItem } from "@wasp/actions/types";
import { ListItem } from "@wasp/entities";
import HttpError from "@wasp/core/HttpError.js";

export const deleteListItem: DeleteListItem<
  Pick<ListItem, "id">,
  ListItem
> = async (_args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  // TODO: implement
  throw new HttpError(501, "Not implemented.");
};
