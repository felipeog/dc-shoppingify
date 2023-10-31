import { DeleteItem } from "@wasp/actions/types";
import { Item } from "@wasp/entities";
import HttpError from "@wasp/core/HttpError.js";

export const deleteItem: DeleteItem<Pick<Item, "id">, Item> = async (
  args,
  context
) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const listItemsinItem = await context.entities.ListItem.findMany({
    select: { id: true },
    where: { itemId: { equals: args.id } },
  });

  if (listItemsinItem.length) {
    throw new HttpError(400, "This item is in use, it can't be deleted.");
  }

  const deletedItem = await context.entities.Item.delete({
    where: { id: args.id },
  });

  return deletedItem;
};
