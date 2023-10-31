import { CreateItem } from "@wasp/actions/types";
import { Item } from "@wasp/entities";
import HttpError from "@wasp/core/HttpError.js";

export const createItem: CreateItem<
  Pick<Item, "categoryId" | "image" | "name" | "note">,
  Item
> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  // TODO: make sure empty args are `undefined`
  const createdItem = await context.entities.Item.create({
    data: {
      image: args.image,
      name: args.name,
      note: args.note,
      category: { connect: { id: Number(args.categoryId) } },
    },
  });

  return createdItem;
};
