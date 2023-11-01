import { createCategory } from "../actions/category/createCategory.js";
import { createItem } from "../actions/item/createItem.js";
import { createItemsList } from "../actions/itemsList/createItemsList.js";
import { createListItem } from "../actions/listItem/createListItem.js";
import { PrismaClient } from "@prisma/client";
import { User } from "@wasp/entities";

// TODO: reimplement

export const development = async (prismaClient: PrismaClient) => {
  // start: users
  const user1 = await createUser(prismaClient, {
    username: "username1",
    password: "password1",
  });
  const user2 = await createUser(prismaClient, {
    username: "username2",
    password: "password2",
  });
  // end: users

  // start: categories
  const category1 = await createCategory(
    { name: "Limpeza" },
    { user: user1, entities: { Category: prismaClient.category } }
  );
  const category2 = await createCategory(
    { name: "Frios" },
    { user: user1, entities: { Category: prismaClient.category } }
  );
  const category3 = await createCategory(
    { name: "Bebidas" },
    { user: user1, entities: { Category: prismaClient.category } }
  );
  // end: categories

  // start: items
  const item1 = await createItem(
    { categoryId: category1.id, image: null, name: "Esponja", note: null },
    { user: user1, entities: { Item: prismaClient.item } }
  );
  const item2 = await createItem(
    { categoryId: category2.id, image: null, name: "Queijo", note: null },
    { user: user1, entities: { Item: prismaClient.item } }
  );
  const item3 = await createItem(
    { categoryId: category2.id, image: null, name: "Presunto", note: null },
    { user: user1, entities: { Item: prismaClient.item } }
  );
  // end: items

  // start: items lists
  const itemsListForUser1 = await createItemsList(
    { name: "Lista do Usuário 1" },
    { user: user1, entities: { ItemsList: prismaClient.itemsList } }
  );
  const itemsListForUser2 = await createItemsList(
    { name: "Lista do Usuário 2" },
    { user: user2, entities: { ItemsList: prismaClient.itemsList } }
  );
  // end: items lists

  // start: list items
  const listItemForUser1 = await createListItem(
    { itemId: item1.id, itemsListId: itemsListForUser1.id },
    {
      user: user1,
      entities: {
        ListItem: prismaClient.listItem,
        ItemsList: prismaClient.itemsList,
      },
    }
  );
  const listItemForUser2 = await createListItem(
    { itemId: item2.id, itemsListId: itemsListForUser2.id },
    {
      user: user2,
      entities: {
        ListItem: prismaClient.listItem,
        ItemsList: prismaClient.itemsList,
      },
    }
  );
  // end: list items
};

const createUser = async (
  prismaClient: PrismaClient,
  data: Pick<User, "username" | "password">
): Promise<Omit<User, "password">> => {
  const { password, ...createdUser } = await prismaClient.user.create({ data });

  return createdUser;
};
