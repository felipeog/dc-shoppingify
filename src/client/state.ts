import { createContext, useContext } from "react";
import { ERightSidebar } from "./types";
import { ItemsList } from ".prisma/client";
import { signal, computed } from "@preact/signals-react";

type TCreateAppStateArgs = {
  ongoingItemsList: ItemsList | null;
};

export function createAppState(args: TCreateAppStateArgs) {
  const ongoingItemsList = signal(args.ongoingItemsList);

  const hasOngoingItemsList = computed(() => {
    return Boolean(ongoingItemsList.value);
  });

  const selectedRightSidebar = signal<ERightSidebar | null>(
    ERightSidebar.ITEMS_LIST
  );

  const isRightSidebarOpen = computed(() => {
    return Boolean(selectedRightSidebar.value);
  });

  return {
    ongoingItemsList,
    hasOngoingItemsList,
    selectedRightSidebar,
    isRightSidebarOpen,
  };
}

export const AppStateContext = createContext(
  {} as ReturnType<typeof createAppState>
);

export function useAppState() {
  const state = useContext(AppStateContext);

  return state;
}
