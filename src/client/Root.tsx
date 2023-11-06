import { createAppState, AppStateContext } from "./state";
import getOngoingItemsList from "@wasp/queries/getOngoingItemsList";
import { useQuery } from "@wasp/queries";

type TRootProps = {
  children: React.ReactNode;
};

export function Root(props: TRootProps) {
  const {
    data: ongoingItemsList,
    isLoading,
    error,
  } = useQuery(getOngoingItemsList);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  console.log({ ongoingItemsList });

  return (
    <AppStateContext.Provider value={createAppState({ ongoingItemsList })}>
      {props.children}
    </AppStateContext.Provider>
  );
}
