import { Item } from "@wasp/entities";
import { UpdateItem } from "@wasp/actions/types";
import HttpError from "@wasp/core/HttpError.js";

export const updateItem: UpdateItem<
  Pick<Item, "categoryId" | "id" | "image" | "name" | "note">,
  Item
> = async (_args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  // TODO: implement
  throw new HttpError(501, "Not implemented.");
};
