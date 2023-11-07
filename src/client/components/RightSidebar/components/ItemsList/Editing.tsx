import { ERightSidebar, ERightSidebarItemsList } from "../../../../types";
import { ListItem } from "@wasp/entities";
import { useAppState } from "../../../../state";

export function Editing(props: { listItems: ListItem[] }) {
  const state = useAppState();

  function handleCreateButtonClick() {
    state.selectedRightSidebar.value = ERightSidebar.ITEM_FORM;
  }

  return (
    <div>
      <button onClick={handleCreateButtonClick}>Create item</button>

      <ul>
        {Boolean(props.listItems.length) ? (
          props.listItems.map((listItem) => (
            <pre key={listItem.id}>{JSON.stringify(listItem, null, 2)}</pre>
          ))
        ) : (
          <p>No items to edit</p>
        )}
      </ul>
    </div>
  );
}
