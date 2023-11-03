// import { createCategory } from "../actions/category/createCategory.js";
// import { createItem } from "../actions/item/createItem.js";
// import { createItemsList } from "../actions/itemsList/createItemsList.js";
// import { createListItem } from "../actions/listItem/createListItem.js";
import { PrismaClient } from "@prisma/client";
import { User } from "@wasp/entities";

// TODO: reimplement

export const development = async (prismaClient: PrismaClient) => {};

const createUser = async (
  prismaClient: PrismaClient,
  data: Pick<User, "username" | "password">
): Promise<Omit<User, "password">> => {
  const { password, ...createdUser } = await prismaClient.user.create({ data });

  return createdUser;
};
