import { createContext, useContext } from "react";
import { ERightSidebar, ERightSidebarItemsList } from "./types";
import { Item, ItemsList } from "@wasp/entities";
import { signal } from "@preact/signals-react";

const ongoingItemsList = signal<ItemsList>({} as ItemsList);
const selectedRightSidebar = signal<ERightSidebar | null>(
  ERightSidebar.ITEMS_LIST
);
const selectedRightSidebarItemDetails = signal<Item | null>(null);
const selectedRightSidebarItemsList = signal<ERightSidebarItemsList>(
  ERightSidebarItemsList.COMPLETING
);

export const state = {
  ongoingItemsList,
  selectedRightSidebar,
  selectedRightSidebarItemDetails,
  selectedRightSidebarItemsList,
};

export const AppStateContext = createContext({} as typeof state);

export function useAppState() {
  const state = useContext(AppStateContext);

  return state;
}
