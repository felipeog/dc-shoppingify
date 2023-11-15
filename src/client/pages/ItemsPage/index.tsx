import { ERightSidebar } from "../../types";
import { Item } from "@wasp/entities";
import { QueryContainer } from "../../components/QueryContainer";
import { toast } from "react-toastify";
import { useAppState } from "../../state";
import { useQuery } from "@wasp/queries";
import { useState } from "react";
import createListItem from "@wasp/actions/createListItem";
import getItemsByCategory from "@wasp/queries/getItemsByCategory";

export function ItemsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const state = useAppState();
  const itemsByCategoryResult = useQuery(getItemsByCategory);

  function getDetailsButtonClickHandler(item: Item) {
    return () => {
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

        state.selectedRightSidebar.value = ERightSidebar.ITEMS_LIST;
      } catch (error: any) {
        console.error(error);
        toast.info(error.message);
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
      {Boolean(itemsByCategoryResult.data?.length) ? (
        <ul>
          {itemsByCategoryResult.data?.map((categoryGroup) => (
            <li key={categoryGroup.category.id}>
              Category: {categoryGroup.category.name}
              <ul>
                {categoryGroup.items.map((item) => (
                  <li key={item.id}>
                    Item:{" "}
                    <button onClick={getDetailsButtonClickHandler(item)}>
                      {item.name}
                    </button>
                    <button
                      onClick={getAddButtonClickHandler(item)}
                      disabled={isLoading}
                    >
                      +
                    </button>
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
