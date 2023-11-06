import { createContext, useContext } from "react";
import { ERightSidebar } from "./types";
import { signal, computed } from "@preact/signals-react";

export function createAppState() {
  const selectedRightSidebar = signal<ERightSidebar | null>(
    ERightSidebar.ITEMS_LIST
  );

  const isRightSidebarOpen = computed(() =>
    Boolean(selectedRightSidebar.value)
  );

  return {
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
