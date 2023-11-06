import { ERightSidebar } from "../../types";
import { ListItem } from "@wasp/entities";
import { QueryContainer } from "../QueryContainer";
import { useAppState } from "../../state";
import { useQuery } from "@wasp/queries";
import { useState } from "react";
import getListItemsFromItemsList from "@wasp/queries/getListItemsFromItemsList";

// TODO: separate components into files

enum EItemsListPanel {
  EDITING = "EDITING",
  COMPLETING = "COMPLETING",
}

function EditingPanel(props: { listItems: ListItem[] }) {
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

function CompletingPanel(props: { listItems: ListItem[] }) {
  return (
    <div>
      <ul>
        {Boolean(props.listItems.length) ? (
          props.listItems.map((listItem) => (
            <pre key={listItem.id}>{JSON.stringify(listItem, null, 2)}</pre>
          ))
        ) : (
          <p>No items to complete</p>
        )}
      </ul>
    </div>
  );
}

const panel = {
  [EItemsListPanel.COMPLETING]: CompletingPanel,
  [EItemsListPanel.EDITING]: EditingPanel,
};

export function ItemsList() {
  // TODO: move to global state to be preserved on sidebar change
  const [currentPanel, setCurrentPanel] = useState(EItemsListPanel.COMPLETING);
  const state = useAppState();
  const listItemsResult = useQuery(getListItemsFromItemsList);

  function handleToggleButton() {
    setCurrentPanel((prevCurrentPanel) =>
      prevCurrentPanel === EItemsListPanel.COMPLETING
        ? EItemsListPanel.EDITING
        : EItemsListPanel.COMPLETING
    );
  }

  const CurrentPanel = panel[currentPanel];

  return (
    <section className="bg-orange-100 flex-shrink-0 w-96">
      <p>{state.ongoingItemsList.value?.name}</p>
      <button onClick={handleToggleButton}>Toggle panel</button>

      <QueryContainer
        isLoading={listItemsResult.isLoading}
        error={listItemsResult.error}
      >
        <CurrentPanel listItems={listItemsResult.data ?? []} />
      </QueryContainer>
    </section>
  );
}
