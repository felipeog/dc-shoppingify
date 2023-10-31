import { Item } from "@wasp/entities";
import { FormEvent } from "react";
import { useQuery } from "@wasp/queries";
import createItem from "@wasp/actions/createItem";
import deleteItem from "@wasp/actions/deleteItem";
import getItems from "@wasp/queries/getItems";
import getCategories from "@wasp/queries/getCategories";
import { Layout } from "./Layout";

function ItemItem({ item, index }: { item: Item; index: number }) {
  async function handleClick() {
    try {
      await deleteItem({ id: item.id });
    } catch (err: any) {
      console.error(err);
      window.alert("Error: " + err.message);
    }
  }

  return (
    <li>
      {index}

      <ul>
        <li>id: {item.id}</li>
        <li>image: {item.image}</li>
        <li>name: {item.name}</li>
        <li>note: {item.note}</li>
        <li>categoryId: {item.categoryId}</li>

        <li>
          <button onClick={handleClick}>Delete</button>
        </li>
      </ul>
    </li>
  );
}

function ItemList({ items }: { items: Item[] }) {
  if (!items?.length) {
    return <div>No items</div>;
  }

  return (
    <ul>
      {items.map((item, index) => (
        <ItemItem key={item.id} item={item} index={index + 1} />
      ))}
    </ul>
  );
}

function ItemForm() {
  const { data: categories, isLoading, error } = useQuery(getCategories);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const target = event.target as HTMLFormElement;
      const image = target.image.value;
      const name = target.itemName.value;
      const note = target.note.value;
      const categoryId = target.category.value;

      await createItem({
        image,
        name,
        note,
        categoryId,
      });

      target.reset();
    } catch (err: any) {
      console.error(err);
      window.alert("Error: " + err.message);
    }
  }

  return (
    <div>
      {isLoading && "Loading..."}
      {error && "Error: " + error}

      {categories && categories.length ? (
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Image URL"
            name="image"
            type="text"
            defaultValue=""
          />
          <input
            placeholder="Name"
            name="itemName"
            type="text"
            defaultValue=""
          />
          <input placeholder="Note" name="note" type="text" defaultValue="" />
          <select name="category">
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <input type="submit" value="Create item" />
        </form>
      ) : (
        "Can't create an item without a category"
      )}
    </div>
  );
}

export function DebugItemPage() {
  const { data: items, isLoading, error } = useQuery(getItems);

  return (
    <Layout isLoading={isLoading} error={error}>
      <ItemList items={items ?? []} />
      <ItemForm />
    </Layout>
  );
}
