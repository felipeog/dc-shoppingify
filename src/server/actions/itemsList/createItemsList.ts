import { CreateItemsList } from "@wasp/actions/types";
import HttpError from "@wasp/core/HttpError.js";
import { ItemsList } from "@wasp/entities";

export const createItemsList: CreateItemsList<
  Pick<ItemsList, "name">,
  ItemsList
> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const createdItemsList = await context.entities.ItemsList.create({
    data: {
      name: args.name || undefined,
      user: { connect: { id: Number(context.user.id) } },
    },
  });

  return createdItemsList;
};
