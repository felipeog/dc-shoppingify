import { ItemsList, ListItem } from "@wasp/entities";
import { FormEvent } from "react";
import { useQuery } from "@wasp/queries";
import createItemsList from "@wasp/actions/createItemsList";
// import deleteItem from "@wasp/actions/deleteItem";
import getItemsLists from "@wasp/queries/getItemsLists";
import { Layout } from "./Layout";

// TODO: add delete

// https://github.com/microsoft/TypeScript/issues/41874
type TItemsListList = ItemsList[] & { listItems: ListItem[] }[];
type TItemsListItem = ItemsList & { listItems: ListItem[] };

function ItemsListItem({
  itemsList,
  index,
}: {
  itemsList: TItemsListItem;
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
        <li>id: {itemsList.id}</li>
        <li>name: {itemsList.name}</li>
        <li>
          listItems:
          <ul>
            {itemsList.listItems.map((listItem) => (
              <li key={listItem.id}>itemId: {listItem.itemId}</li>
            ))}
          </ul>
        </li>
        <li>state: {itemsList.state}</li>
        <li>userId: {itemsList.userId}</li>
      </ul>

      {/* <button onClick={handleClick}>Delete</button> */}
    </li>
  );
}

function ItemsListList({ itemsLists }: { itemsLists: TItemsListList }) {
  if (!itemsLists?.length) {
    return <div>No lists</div>;
  }

  return (
    <ul>
      {itemsLists.map((itemsList, index) => (
        <ItemsListItem
          key={itemsList.id}
          itemsList={itemsList as TItemsListItem}
          index={index + 1}
        />
      ))}
    </ul>
  );
}

function ItemsListForm() {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const target = event.target as HTMLFormElement;
      const name = target.itemsListName.value;

      await createItemsList({
        name,
      });

      target.reset();
    } catch (err: any) {
      console.error(err);
      window.alert("Error: " + err.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          name="itemsListName"
          type="text"
          defaultValue=""
        />

        <input type="submit" value="Create items list" />
      </form>
    </div>
  );
}

export function DebugItemsListPage() {
  const { data: itemsLists, isLoading, error } = useQuery(getItemsLists);

  return (
    <Layout>
      <h1>ItemsList</h1>

      {isLoading && <p>Loading...</p>}

      {error && <p>Error: {error.message}</p>}

      {itemsLists && <ItemsListList itemsLists={itemsLists} />}

      <ItemsListForm />
    </Layout>
  );
}
