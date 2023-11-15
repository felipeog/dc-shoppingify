import { Category, Item, ItemsList } from "@wasp/entities";
import { createContext, useContext } from "react";
import { ERightSidebar, ERightSidebarItemsList } from "./types";
import { signal, computed } from "@preact/signals-react";

type TCreateAppStateArgs = {
  ongoingItemsList: ItemsList;
};

const selectedRightSidebarItemsList = signal<ERightSidebarItemsList>(
  ERightSidebarItemsList.COMPLETING
);

const selectedRightSidebar = signal<ERightSidebar | null>(
  ERightSidebar.ITEMS_LIST
);

const selectedRightSidebarItemDetails = signal<Item | null>(null);

export function createAppState(args: TCreateAppStateArgs) {
  const ongoingItemsList = signal(args.ongoingItemsList);

  return {
    ongoingItemsList,
    selectedRightSidebarItemsList,
    selectedRightSidebar,
    selectedRightSidebarItemDetails,
  };
}

export const AppStateContext = createContext(
  {} as ReturnType<typeof createAppState>
);

export function useAppState() {
  const state = useContext(AppStateContext);

  return state;
}
