import { ERightSidebar } from "../../../../types";
import { useAppState } from "../../../../state";

export function ItemDetails() {
  const state = useAppState();

  function handleBackButtonClick() {
    state.selectedRightSidebar.value = ERightSidebar.ITEMS_LIST;
  }

  return (
    <section className="bg-white flex-shrink-0 w-96 overflow-x-hidden overflow-y-auto">
      <p>ItemDetailsSidebar</p>

      <button onClick={handleBackButtonClick}>Back</button>
      <button disabled>Delete</button>
      <button disabled>Add to list</button>
    </section>
  );
}
