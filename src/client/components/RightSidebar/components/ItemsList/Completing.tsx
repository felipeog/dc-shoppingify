import { ERightSidebarItemsList } from "../../../../types";
import { GrEdit } from "react-icons/gr";
import { ListItem } from "@wasp/entities";
import { useAppState } from "../../../../state";

export function Completing(props: { listItems: ListItem[] }) {
  const state = useAppState();

  function handleEditButton() {
    state.selectedRightSidebarItemsList.value = ERightSidebarItemsList.EDITING;
  }

  return (
    <div>
      <p>{state.ongoingItemsList.value.name}</p>
      <button onClick={handleEditButton}>
        <GrEdit />
      </button>

      <ul>
        {Boolean(props.listItems.length) ? (
          props.listItems.map((listItem) => (
            <pre key={listItem.id}>{JSON.stringify(listItem, null, 2)}</pre>
          ))
        ) : (
          <p>No items</p>
        )}
      </ul>
    </div>
  );
}
