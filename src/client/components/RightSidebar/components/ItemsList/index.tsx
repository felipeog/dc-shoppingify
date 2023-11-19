import { Completing } from "./Completing";
import { Editing } from "./Editing";
import { ERightSidebar, ERightSidebarItemsList } from "../../../../types";
import { GiFruitBowl } from "react-icons/gi";
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

  function handleAddItemButtonClick() {
    state.selectedRightSidebar.value = ERightSidebar.ITEM_FORM;
  }

  const CurrentPanel = panel[state.selectedRightSidebarItemsList.value];

  return (
    <section className="bg-orange-100 flex-shrink-0 w-96 overflow-x-hidden overflow-y-auto px-8 py-6">
      <div className="bg-pink-700 flex items-center gap-6 p-4 rounded-3xl mb-8">
        <GiFruitBowl size="6rem" className="text-orange-400" />

        <div>
          <p className="text-white">Didn't find what you need?</p>
          <button
            className="bg-white text-pink-950 rounded-lg px-4 py-2 whitespace-nowrap mt-2 text-sm"
            onClick={handleAddItemButtonClick}
          >
            Add item
          </button>
        </div>
      </div>

      <QueryContainer
        isLoading={listItemsResult.isLoading}
        error={listItemsResult.error}
      >
        <CurrentPanel listItems={listItemsResult.data ?? []} />
      </QueryContainer>
    </section>
  );
}
