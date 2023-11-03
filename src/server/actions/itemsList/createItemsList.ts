import { CreateItemsList } from "@wasp/actions/types";
import HttpError from "@wasp/core/HttpError.js";
import { ItemsList } from "@wasp/entities";

// TODO: fix

export const createItemsList: CreateItemsList<
  Pick<ItemsList, "name">,
  ItemsList
> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  // TODO: make sure there's only one `ONGOING` list at a time

  throw new HttpError(501, "Not implemented.");

  // const createdItemsList = await context.entities.ItemsList.create({
  //   data: {
  //     name: args.name || undefined,
  //     user: { connect: { id: Number(context.user.id) } },
  //   },
  // });

  // return createdItemsList;
};
