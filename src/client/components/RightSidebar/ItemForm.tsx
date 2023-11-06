import { ERightSidebar } from "../../types";
import { useAppState } from "../../state";
import { useState, FormEvent } from "react";
import createItem from "@wasp/actions/createItem";
import getCategories from "@wasp/queries/getCategories";
import { useQuery } from "@wasp/queries";

// TODO: style
// TODO: complete form

export function ItemForm() {
  const [isCreatingitem, setIsCreatingItem] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const state = useAppState();
  const categoriesResult = useQuery(getCategories);

  function handleCancelButtonClick() {
    state.selectedRightSidebar.value = ERightSidebar.ITEMS_LIST;
  }

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsCreatingItem(true);

    try {
      const target = event.target as HTMLFormElement;
      const name = target.itemName.value;
      const categoryId = target.categoryId.value;

      await createItem({ name, categoryId });

      target.reset();
    } catch (error: any) {
      console.error(error);
      setError(error);
    } finally {
      setIsCreatingItem(false);
    }
  }

  const isLoading = isCreatingitem || categoriesResult.isLoading;

  // TODO: improve render
  return (
    <section className="bg-white flex-shrink-0 w-96">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {categoriesResult.error && <p>Error: {categoriesResult.error.message}</p>}

      <form onSubmit={handleFormSubmit}>
        <label>
          Name
          <input type="text" name="itemName" required />
        </label>
        <label>
          Category
          <select name="categoryId" required>
            <option value="">Select a category</option>

            {Boolean(categoriesResult.data?.length) &&
              categoriesResult.data?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        </label>

        <button onClick={handleCancelButtonClick}>Cancel</button>
        <button type="submit">Create</button>
      </form>
    </section>
  );
}
