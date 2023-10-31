import { DeleteItemsList } from "@wasp/actions/types";
import { ItemsList } from "@wasp/entities";
import HttpError from "@wasp/core/HttpError.js";

export const deleteItemsList: DeleteItemsList<
  Pick<ItemsList, "id">,
  ItemsList
> = async (_args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  // TODO: implement
  throw new HttpError(501, "Not implemented.");
};
