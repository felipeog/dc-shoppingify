import { ERightSidebar } from "../../types";
import { useAppState } from "../../state";

export function ItemsList() {
  const state = useAppState();

  function handleCreateButtonClick() {
    state.selectedRightSidebar.value = ERightSidebar.ITEM_FORM;
  }

  return (
    <section className="bg-orange-100 flex-shrink-0 w-96">
      <p>ItemsListSidebar</p>

      {state.hasOngoingItemsList.value ? (
        <button onClick={handleCreateButtonClick}>Create a new item</button>
      ) : (
        <button disabled>Create a new list</button>
      )}
    </section>
  );
}
