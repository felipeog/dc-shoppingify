import { createAppState, AppStateContext } from "./state";
import { ItemsList } from "@wasp/entities";
import { Layout } from "./components/Layout";
import { useEffect, useState } from "react";
import createItemsList from "@wasp/actions/createItemsList";
import getOngoingItemsList from "@wasp/queries/getOngoingItemsList";
import useAuth from "@wasp/auth/useAuth";

type TRootProps = {
  children: React.ReactNode;
};

export function Root(props: TRootProps) {
  const { data: user } = useAuth();
  const [ongoingItemsList, setOngoingItemsList] = useState<ItemsList>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function getOrCreateOngoingItemsList() {
      try {
        let ongoingItemsList = await getOngoingItemsList([""]);

        if (!ongoingItemsList) {
          ongoingItemsList = await createItemsList({});
        }

        setOngoingItemsList(ongoingItemsList);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    }

    if (user) {
      getOrCreateOngoingItemsList();
    }
  }, [user]);

  if (!user) {
    return props.children;
  }

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
      <Layout>{props.children}</Layout>
    </AppStateContext.Provider>
  );
}
