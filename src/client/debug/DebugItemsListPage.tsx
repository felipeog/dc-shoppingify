import { ItemsList, ListItem } from "@wasp/entities";
import { FormEvent } from "react";
import { useQuery } from "@wasp/queries";
// import createItem from "@wasp/actions/createItem";
// import deleteItem from "@wasp/actions/deleteItem";
// import getItems from "@wasp/queries/getItems";
// import getCategories from "@wasp/queries/getCategories";
import getItemsLists from "@wasp/queries/getItemsLists";
import { Layout } from "./Layout";

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

// function ItemForm() {
//   const { data: categories, isLoading, error } = useQuery(getCategories);

//   async function handleSubmit(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     try {
//       const target = event.target as HTMLFormElement;
//       const image = target.image.value;
//       const name = target.itemName.value;
//       const note = target.note.value;
//       const categoryId = target.category.value;

//       await createItem({
//         image,
//         name,
//         note,
//         categoryId,
//       });

//       target.reset();
//     } catch (err: any) {
//       console.error(err);
//       window.alert("Error: " + err.message);
//     }
//   }

//   return (
//     <div>
//       {isLoading && "Loading..."}
//       {error && "Error: " + error}

//       {categories && categories.length ? (
//         <form onSubmit={handleSubmit}>
//           <input
//             placeholder="Image URL"
//             name="image"
//             type="text"
//             defaultValue=""
//           />
//           <input
//             placeholder="Name"
//             name="itemName"
//             type="text"
//             defaultValue=""
//           />
//           <input placeholder="Note" name="note" type="text" defaultValue="" />
//           <select name="category">
//             {categories.map((category) => (
//               <option key={category.id} value={category.id}>
//                 {category.name}
//               </option>
//             ))}
//           </select>

//           <input type="submit" value="Create item" />
//         </form>
//       ) : (
//         "Can't create an item without a category"
//       )}
//     </div>
//   );
// }

export function DebugItemsListPage() {
  const { data: itemsLists, isLoading, error } = useQuery(getItemsLists);

  return (
    <Layout>
      <h1>ItemsList</h1>

      {isLoading && <p>Loading...</p>}

      {error && <p>Error: {error.message}</p>}

      {itemsLists && <ItemsListList itemsLists={itemsLists} />}

      {/* <ItemForm /> */}
    </Layout>
  );
}
