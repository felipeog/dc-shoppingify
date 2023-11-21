import { CategorySelect, TCategorySelectOption } from "./CategorySelect";
import { ERightSidebar } from "../../../../types";
import { toast } from "react-toastify";
import { useAppState } from "../../../../state";
import { useState, FormEvent } from "react";
import createItem from "@wasp/actions/createItem";

export function ItemForm() {
  const [isCreatingItem, setIsCreatingItem] = useState(false);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [newCategoryValue, setNewCategoryValue] =
    useState<TCategorySelectOption>(null);
  const state = useAppState();

  function handleCancelButtonClick() {
    state.selectedRightSidebar.value = ERightSidebar.ITEMS_LIST;
  }

  async function handleItemFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsCreatingItem(true);

    try {
      const target = event.target as HTMLFormElement;
      const name = target.itemName.value;
      const note = target.note.value;
      const image = target.image.value;
      const categoryId = target.categoryId.value;

      await createItem({
        name,
        note,
        image,
        categoryId,
      });

      target.reset();
      setNewCategoryValue(null);
    } catch (error: any) {
      console.error(error);
      toast.info(error.message);
    } finally {
      setIsCreatingItem(false);
    }
  }

  const isLoading = isCreatingItem || isCreatingCategory;

  // TODO: improve render
  return (
    <section className="bg-white flex-shrink-0 w-96 overflow-x-hidden overflow-y-auto">
      <form onSubmit={handleItemFormSubmit}>
        <label>
          Name
          <input
            type="text"
            name="itemName"
            required
            placeholder="Enter a name"
            disabled={isLoading}
          />
        </label>

        <br />

        <label>
          Note (optional)
          <input
            type="text"
            name="note"
            placeholder="Enter a note"
            disabled={isLoading}
          />
        </label>

        <br />

        <label>
          Image (optional)
          <input
            type="text"
            name="image"
            placeholder="Enter a URL"
            disabled={isLoading}
          />
        </label>

        <br />

        <CategorySelect
          isLoading={isLoading}
          setIsLoading={setIsCreatingCategory}
          value={newCategoryValue}
          setValue={setNewCategoryValue}
          name="categoryId"
        />

        <br />

        <button onClick={handleCancelButtonClick} disabled={isLoading}>
          Cancel
        </button>
        <button type="submit" disabled={isLoading}>
          Create
        </button>
      </form>
    </section>
  );
}
