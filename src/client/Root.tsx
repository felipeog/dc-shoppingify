import "./Root.css";
import "react-toastify/dist/ReactToastify.css";
import { AppStateContext, state } from "./state";
import { Layout } from "./components/Layout";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import createItemsList from "@wasp/actions/createItemsList";
import getOngoingItemsList from "@wasp/queries/getOngoingItemsList";
import useAuth from "@wasp/auth/useAuth";

type TRootProps = {
  children: React.ReactNode;
};

export function Root(props: TRootProps) {
  const { data: user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (state.ongoingItemsList.value.id) {
      return;
    }

    async function getOrCreateOngoingItemsList() {
      try {
        let ongoingItemsList = await getOngoingItemsList([""]);

        if (!ongoingItemsList) {
          ongoingItemsList = await createItemsList({});
        }

        state.ongoingItemsList.value = ongoingItemsList;
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

  if (!state.ongoingItemsList.value.id) {
    return <p>Error: Couldn't set items list</p>;
  }

  return (
    <AppStateContext.Provider value={state}>
      <Layout>{props.children}</Layout>
      <ToastContainer position="top-center" hideProgressBar draggable={false} />
    </AppStateContext.Provider>
  );
}
