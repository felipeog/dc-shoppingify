import { ListItem } from "@wasp/entities";

export function Completing(props: { listItems: ListItem[] }) {
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
