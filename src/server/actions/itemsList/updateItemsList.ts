import { ItemsList } from "@wasp/entities";
import { UpdateItemsList } from "@wasp/actions/types";
import HttpError from "@wasp/core/HttpError.js";

export const updateItemsList: UpdateItemsList<
  Pick<ItemsList, "name" | "id" | "state">,
  ItemsList
> = async (_args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  // TODO: implement
  throw new HttpError(501, "Not implemented.");
};
