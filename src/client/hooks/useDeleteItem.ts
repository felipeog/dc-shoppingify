import { ERightSidebar } from "../types";
import { toast } from "react-toastify";
import { useAppState } from "../state";
import { useState } from "react";
import deleteItemAction from "@wasp/actions/deleteItem";

export function useDeleteItem() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const state = useAppState();

  async function deleteItem(itemId: number) {
    setIsLoading(true);
    setError(undefined);

    try {
      await deleteItemAction({ id: itemId });

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
    deleteItem,
    isLoading,
    error,
  };
}
