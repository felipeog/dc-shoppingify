import "./index.css";
import { Category, Item } from "@wasp/entities";
import { QueryContainer } from "../../components/QueryContainer";
import { useAppState } from "../../state";
import { useQuery } from "@wasp/queries";
import { useState } from "react";
import createListItem from "@wasp/actions/createListItem";
import getItemsByCategory from "@wasp/queries/getItemsByCategory";
import { ERightSidebar } from "../../types";

export function ItemsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const state = useAppState();
  const itemsByCategoryResult = useQuery(getItemsByCategory);

  function getDetailsButtonClickHandler(category: Category, item: Item) {
    return async () => {
      state.selectedRightSidebarItemDetails.value = item;
      state.selectedRightSidebar.value = ERightSidebar.ITEM_DETAILS;
    };
  }

  function getAddButtonClickHandler(item: Item) {
    return async () => {
      setIsLoading(true);

      try {
        await createListItem({
          itemId: item.id,
          itemsListId: state.ongoingItemsList.value.id,
        });
      } catch (error: any) {
        console.error(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
  }

  // TODO: improve render
  return (
    <QueryContainer
      isLoading={itemsByCategoryResult.isLoading}
      error={itemsByCategoryResult.error}
    >
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {Boolean(itemsByCategoryResult.data?.length) ? (
        <ul>
          {itemsByCategoryResult.data?.map((categoryGroup) => (
            <li key={categoryGroup.category.id}>
              Category: {categoryGroup.category.name}
              <ul>
                {categoryGroup.items.map((item) => (
                  <li key={item.id}>
                    Item:{" "}
                    <button
                      onClick={getDetailsButtonClickHandler(
                        categoryGroup.category,
                        item
                      )}
                    >
                      {item.name}
                    </button>{" "}
                    <button onClick={getAddButtonClickHandler(item)}>+</button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items</p>
      )}
    </QueryContainer>
  );
}
