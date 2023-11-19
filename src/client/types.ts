import { Item, Category } from "@wasp/entities";

export enum ERightSidebar {
  ITEMS_LIST = "ITEMS_LIST",
  ITEM_FORM = "ITEM_FORM",
  ITEM_DETAILS = "ITEM_DETAILS",
}

export enum ERightSidebarItemsList {
  EDITING = "EDITING",
  COMPLETING = "COMPLETING",
}

export type TItemWithCategory = Item & {
  category: Category;
};
