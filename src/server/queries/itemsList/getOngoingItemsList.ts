import { GetOngoingItemsList } from "@wasp/queries/types";
import { ItemsList } from "@wasp/entities";
import HttpError from "@wasp/core/HttpError.js";

export const getOngoingItemsList: GetOngoingItemsList<
  void,
  ItemsList | null
> = async (_args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const ongoingItemslist = await context.entities.ItemsList.findFirst({
    where: { user: { id: context.user.id } },
  });

  return ongoingItemslist;
};
