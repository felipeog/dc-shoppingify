import { ListItem } from "@wasp/entities";
import { FormEvent } from "react";
import { useQuery } from "@wasp/queries";
import createListItem from "@wasp/actions/createListItem";
// import deleteItem from "@wasp/actions/deleteItem";
import getListItems from "@wasp/queries/getListItems";
import getItems from "@wasp/queries/getItems";
import getItemsLists from "@wasp/queries/getItemsLists";
import { Layout } from "./Layout";

// TODO: add delete

function ListItemItem({
  listItem,
  index,
}: {
  listItem: ListItem;
  index: number;
}) {
  // async function handleClick() {
  //   try {
  //     await deleteItem({ id: item.id });
  //   } catch (err: any) {
  //     console.error(err);
  //     window.alert("Error: " + err.message);
  //   }
  // }

  return (
    <li>
      {index}

      <ul>
        <li>id: {listItem.id}</li>
        <li>amount: {listItem.amount}</li>
        <li>isDone: {String(listItem.isDone)}</li>
        <li>itemId: {listItem.itemId}</li>
        <li>itemsListId: {listItem.itemsListId}</li>
      </ul>

      {/* <button onClick={handleClick}>Delete</button> */}
    </li>
  );
}

function ListItemList({ listItems }: { listItems: ListItem[] }) {
  if (!listItems?.length) {
    return <div>No list items</div>;
  }

  return (
    <ul>
      {listItems.map((listItem, index) => (
        <ListItemItem key={listItem.id} listItem={listItem} index={index + 1} />
      ))}
    </ul>
  );
}

function ListItemForm() {
  const getItemsResult = useQuery(getItems);
  const getItemsListsResult = useQuery(getItemsLists);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const target = event.target as HTMLFormElement;
      const item = target.item.value;
      const itemsList = target.itemsList.value;

      await createListItem({
        itemId: item,
        itemsListId: itemsList,
      });

      target.reset();
    } catch (err: any) {
      console.error(err);
      window.alert("Error: " + err.message);
    }
  }

  const items = getItemsResult.data ?? [];
  const itemsLists = getItemsListsResult.data ?? [];
  const canCreate = items.length > 0 && itemsLists.length > 0;

  const isLoading = getItemsResult.isLoading || getItemsListsResult.isLoading;
  const error =
    getItemsResult.error || getItemsListsResult.error
      ? `${getItemsResult.error?.message} - ${getItemsListsResult.error?.message}`
      : null;

  return (
    <div>
      {isLoading && "Loading..."}
      {error && "Error: " + error}

      {canCreate ? (
        <form onSubmit={handleSubmit}>
          <select placeholder="Item" name="item" defaultValue="">
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <select placeholder="Items list" name="itemsList" defaultValue="">
            {itemsLists.map((itemsList) => (
              <option key={itemsList.id} value={itemsList.id}>
                {itemsList.name}
              </option>
            ))}
          </select>

          <input type="submit" value="Create list item" />
        </form>
      ) : (
        "Can't create a list item without a list and a item"
      )}
    </div>
  );
}

export function DebugListItemPage() {
  const { data: listItems, isLoading, error } = useQuery(getListItems);

  return (
    <Layout>
      <h1>ListItem</h1>

      {isLoading && <p>Loading...</p>}

      {error && <p>Error: {error.message}</p>}

      {listItems && <ListItemList listItems={listItems} />}

      <ListItemForm />
    </Layout>
  );
}
