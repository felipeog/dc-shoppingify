import { createAppState, AppStateContext } from "./state";
import { ItemsList } from "@wasp/entities";
import { useEffect, useState } from "react";
import createItemsList from "@wasp/actions/createItemsList";
import getOngoingItemsList from "@wasp/queries/getOngoingItemsList";

type TRootProps = {
  children: React.ReactNode;
};

export function Root(props: TRootProps) {
  const [ongoingItemsList, setOngoingItemsList] = useState<ItemsList>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function getOrCreateOngoingItemsList() {
      try {
        // NOTE: using a query without `useQuery` requires `queryCacheKey: string[]`?
        let ongoingItemsList = await getOngoingItemsList([""]);

        if (!ongoingItemsList) {
          // NOTE: `args` is required even when empty?
          ongoingItemsList = await createItemsList({});
        }

        setOngoingItemsList(ongoingItemsList);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    }

    getOrCreateOngoingItemsList();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!ongoingItemsList) {
    return <p>Error: Couldn't set items list</p>;
  }

  return (
    <AppStateContext.Provider value={createAppState({ ongoingItemsList })}>
      {props.children}
    </AppStateContext.Provider>
  );
}
