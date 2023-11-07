import { ERightSidebarItemsList } from "../../../../types";
import { Completing } from "./Completing";
import { Editing } from "./Editing";
import { QueryContainer } from "../../../QueryContainer";
import { useAppState } from "../../../../state";
import { useQuery } from "@wasp/queries";
import getListItemsFromItemsList from "@wasp/queries/getListItemsFromItemsList";

const panel = {
  [ERightSidebarItemsList.COMPLETING]: Completing,
  [ERightSidebarItemsList.EDITING]: Editing,
};

export function ItemsList() {
  const state = useAppState();
  const listItemsResult = useQuery(getListItemsFromItemsList);

  function handleToggleButton() {
    const previous = state.selectedRightSidebarItemsList.value;

    state.selectedRightSidebarItemsList.value =
      previous === ERightSidebarItemsList.COMPLETING
        ? ERightSidebarItemsList.EDITING
        : ERightSidebarItemsList.COMPLETING;
  }

  const CurrentPanel = panel[state.selectedRightSidebarItemsList.value];

  return (
    <section className="bg-orange-100 flex-shrink-0 w-96 overflow-x-hidden overflow-y-auto">
      <p>{state.ongoingItemsList.value.name}</p>
      <button onClick={handleToggleButton}>Toggle panel</button>

      <QueryContainer
        isLoading={listItemsResult.isLoading}
        error={listItemsResult.error}
      >
        <CurrentPanel listItems={listItemsResult.data ?? []} />
      </QueryContainer>
    </section>
  );
}
