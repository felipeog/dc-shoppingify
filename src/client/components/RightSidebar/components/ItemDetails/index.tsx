import { ERightSidebar } from "../../../../types";
import { useAppState } from "../../../../state";

export function ItemDetails() {
  const state = useAppState();

  function handleBackButtonClick() {
    state.selectedRightSidebar.value = ERightSidebar.ITEMS_LIST;
    state.selectedRightSidebarItemDetails.value = null;
  }

  return (
    <section className="bg-white flex-shrink-0 w-96 overflow-x-hidden overflow-y-auto">
      <p>ItemDetailsSidebar</p>

      <button onClick={handleBackButtonClick}>Back</button>

      <pre>
        {JSON.stringify(state.selectedRightSidebarItemDetails.value, null, 2)}
      </pre>

      <button disabled>Delete</button>
      <button disabled>Add to list</button>
    </section>
  );
}
