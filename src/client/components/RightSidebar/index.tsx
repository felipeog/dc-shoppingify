import { ERightSidebar } from "../../types";
import { ItemDetails } from "./components/ItemDetails";
import { ItemForm } from "./components/ItemForm";
import { ItemsList } from "./components/ItemsList";
import { useAppState } from "../../state";

const sidebar = {
  [ERightSidebar.ITEMS_LIST]: ItemsList,
  [ERightSidebar.ITEM_DETAILS]: ItemDetails,
  [ERightSidebar.ITEM_FORM]: ItemForm,
};

export function RightSidebar() {
  const state = useAppState();

  if (state.selectedRightSidebar.value === null) {
    return null;
  }

  const CurrentSidebar = sidebar[state.selectedRightSidebar.value];

  return <CurrentSidebar />;
}
