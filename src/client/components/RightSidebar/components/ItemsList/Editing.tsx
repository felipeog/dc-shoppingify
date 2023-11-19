import { ERightSidebarItemsList } from "../../../../types";
import { GrCheckmark } from "react-icons/gr";
import { ListItem } from "@wasp/entities";
import { useAppState } from "../../../../state";

export function Editing(props: { listItems: ListItem[] }) {
  const state = useAppState();

  function handleCompleteButton() {
    state.selectedRightSidebarItemsList.value =
      ERightSidebarItemsList.COMPLETING;
  }

  return (
    <div>
      <p>{state.ongoingItemsList.value.name}</p>
      <button onClick={handleCompleteButton}>
        <GrCheckmark />
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
