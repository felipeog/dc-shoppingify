import { ERightSidebar } from "../types";
import { useAppState } from "../state";

// TODO: break into separate components

function ItemsListSidebar() {
  const state = useAppState();

  function handleCreateButtonClick() {
    state.selectedRightSidebar.value = ERightSidebar.ITEM_FORM;
  }

  function handleDetailsButtonClick() {
    state.selectedRightSidebar.value = ERightSidebar.ITEM_DETAILS;
  }

  return (
    <>
      <p>ItemsListSidebar</p>

      <button onClick={handleCreateButtonClick}>Create a new item</button>
      <button onClick={handleDetailsButtonClick}>Get item details</button>
    </>
  );
}

function ItemDetailsSidebar() {
  const state = useAppState();

  function handleBackButtonClick() {
    state.selectedRightSidebar.value = ERightSidebar.ITEMS_LIST;
  }

  return (
    <>
      <p>ItemDetailsSidebar</p>

      <button onClick={handleBackButtonClick}>Back</button>
      <button disabled>Delete</button>
      <button disabled>Add to list</button>
    </>
  );
}

function ItemFormSidebar() {
  const state = useAppState();

  function handleCancelButtonClick() {
    state.selectedRightSidebar.value = ERightSidebar.ITEMS_LIST;
  }

  return (
    <>
      <p>ItemFormSidebar</p>

      <button onClick={handleCancelButtonClick}>Cancel</button>
      <button disabled>Create</button>
    </>
  );
}

const sidebar = {
  [ERightSidebar.ITEMS_LIST]: ItemsListSidebar,
  [ERightSidebar.ITEM_DETAILS]: ItemDetailsSidebar,
  [ERightSidebar.ITEM_FORM]: ItemFormSidebar,
};

export function RightSidebar() {
  const state = useAppState();

  if (state.selectedRightSidebar.value === null) {
    return null;
  }

  const CurrentSidebar = sidebar[state.selectedRightSidebar.value];

  return (
    <section className="bg-white flex-shrink-0 w-96">
      <CurrentSidebar />
    </section>
  );
}
