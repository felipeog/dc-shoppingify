import { ERightSidebar } from "../../types";
import { GrAdd } from "react-icons/gr";
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

  const hasPopulatedCategories = Boolean(itemsByCategoryResult.data?.length);

  // TODO: broke into separate components
  return (
    <>
      <h1 className="text-2xl max-w-lg">
        <span className="text-orange-400">Shoppingify</span> allows you to take
        your shopping list wherever you go
      </h1>

      <QueryContainer
        isLoading={itemsByCategoryResult.isLoading}
        error={itemsByCategoryResult.error}
      >
        {!hasPopulatedCategories && <p>No items</p>}

        {hasPopulatedCategories && (
          <ul className="grid gap-10 mt-12">
            {itemsByCategoryResult.data?.map((categoryGroup) => (
              <li key={categoryGroup.category.id}>
                <p className="text-lg first-letter:capitalize">
                  {categoryGroup.category.name}
                </p>

                <ul className="grid gap-6 mt-4 items-start grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))]">
                  {categoryGroup.items.map((item) => (
                    <li
                      key={item.id}
                      className="card flex justify-between items-start p-0"
                    >
                      <button
                        className="grow text-left px-4 py-3 hover:text-gray-500 transition-colors first-letter:capitalize"
                        onClick={getDetailsButtonClickHandler(item)}
                      >
                        {item.name}
                      </button>

                      <button
                        className="group shrink-0 px-4 py-3 disabled:cursor-progress"
                        onClick={getAddButtonClickHandler(item)}
                        disabled={isLoading}
                      >
                        <GrAdd className="h-6 text-gray-400 group-hover:text-gray-300 transition-colors" />
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </QueryContainer>
    </>
  );
}
