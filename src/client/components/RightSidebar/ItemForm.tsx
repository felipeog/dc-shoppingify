import { ERightSidebar } from "../../types";
import { useAppState } from "../../state";

export function ItemForm() {
  const state = useAppState();

  function handleCancelButtonClick() {
    state.selectedRightSidebar.value = ERightSidebar.ITEMS_LIST;
  }

  return (
    <section className="bg-white flex-shrink-0 w-96">
      <p>ItemFormSidebar</p>

      <button onClick={handleCancelButtonClick}>Cancel</button>
      <button disabled>Create</button>
    </section>
  );
}
