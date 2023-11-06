import { ERightSidebar } from "../../types";
import { useAppState } from "../../state";
import { useState, FormEvent } from "react";
import createItem from "@wasp/actions/createItem";
import createCategory from "@wasp/actions/createCategory";
import getCategories from "@wasp/queries/getCategories";
import { useQuery } from "@wasp/queries";

// TODO: style
// TODO: complete form

export function ItemForm() {
  const [isCreatingItem, setIsCreatingItem] = useState(false);
  const [itemError, setItemError] = useState<Error | null>(null);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [categoryError, setCategoryError] = useState<Error | null>(null);
  const state = useAppState();
  const categoriesResult = useQuery(getCategories);

  function handleCancelButtonClick() {
    state.selectedRightSidebar.value = ERightSidebar.ITEMS_LIST;
  }

  async function handleItemFormSubmit(event: FormEvent<HTMLFormElement>) {
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
      setItemError(error);
    } finally {
      setIsCreatingItem(false);
    }
  }

  async function handleCategoryFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsCreatingCategory(true);

    try {
      const target = event.target as HTMLFormElement;
      const name = target.categoryName.value;

      await createCategory({ name });

      target.reset();
    } catch (error: any) {
      console.error(error);
      setCategoryError(error);
    } finally {
      setIsCreatingCategory(false);
    }
  }

  const isLoading =
    isCreatingItem || isCreatingCategory || categoriesResult.isLoading;

  // TODO: improve render
  return (
    <section className="bg-white flex-shrink-0 w-96">
      {isLoading && <p>Loading...</p>}
      {itemError && <p>Error: {itemError.message}</p>}
      {categoryError && <p>Error: {categoryError.message}</p>}
      {categoriesResult.error && <p>Error: {categoriesResult.error.message}</p>}

      <form onSubmit={handleItemFormSubmit}>
        <label>
          Name
          <input
            type="text"
            name="itemName"
            required
            placeholder="Enter a name"
          />
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

      {/* TODO: create category select input that's able to create categories */}
      <details>
        <summary>Create category</summary>

        <form onSubmit={handleCategoryFormSubmit}>
          <label>
            Name
            <input
              type="text"
              name="categoryName"
              required
              placeholder="Enter a name"
            />
          </label>

          <button type="submit">Create</button>
        </form>
      </details>
    </section>
  );
}
