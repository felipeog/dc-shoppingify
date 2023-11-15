import { ERightSidebar } from "../../../../types";
import { toast } from "react-toastify";
import { useAppState } from "../../../../state";
import { useQuery } from "@wasp/queries";
import { useState, FormEvent } from "react";
import createCategory from "@wasp/actions/createCategory";
import createItem from "@wasp/actions/createItem";
import getCategories from "@wasp/queries/getCategories";

// TODO: style
// TODO: complete form

export function ItemForm() {
  const [isCreatingItem, setIsCreatingItem] = useState(false);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
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
      toast.info(error.message);
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
      toast.info(error.message);
    } finally {
      setIsCreatingCategory(false);
    }
  }

  const isLoading =
    isCreatingItem || isCreatingCategory || categoriesResult.isLoading;

  // TODO: improve render
  return (
    <section className="bg-white flex-shrink-0 w-96 overflow-x-hidden overflow-y-auto">
      {isLoading && <p>Loading...</p>}
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
