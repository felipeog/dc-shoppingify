import { createAppState, AppStateContext } from "./state";

type TRootProps = {
  children: React.ReactNode;
};

export function Root(props: TRootProps) {
  return (
    <AppStateContext.Provider value={createAppState()}>
      {props.children}
    </AppStateContext.Provider>
  );
}
