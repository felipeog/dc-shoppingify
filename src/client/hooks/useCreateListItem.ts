import { ERightSidebar } from "../types";
import { toast } from "react-toastify";
import { useAppState } from "../state";
import { useState } from "react";
import createListItemAction from "@wasp/actions/createListItem";

export function useCreateListItem() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const state = useAppState();

  async function createListItem(itemId: number) {
    setIsLoading(true);
    setError(undefined);

    try {
      await createListItemAction({
        itemId,
        itemsListId: state.ongoingItemsList.value.id,
      });

      state.selectedRightSidebar.value = ERightSidebar.ITEMS_LIST;
    } catch (error: any) {
      console.error(error);
      setError(error);
      toast.info(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    createListItem,
    isLoading,
    error,
  };
}
