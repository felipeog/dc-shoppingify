import { ERightSidebar } from "../../types";
import { GrAdd } from "react-icons/gr";
import { QueryContainer } from "../../components/QueryContainer";
import { TItemWithCategory } from "../../types";
import { useAppState } from "../../state";
import { useCreateListItem } from "../../hooks/useCreateListItem";
import { useQuery } from "@wasp/queries";
import getItemsByCategory from "@wasp/queries/getItemsByCategory";

export function ItemsPage() {
  const state = useAppState();
  const itemsByCategoryResult = useQuery(getItemsByCategory);
  const { createListItem, isLoading } = useCreateListItem();

  function getDetailsButtonClickHandler(item: TItemWithCategory) {
    return () => {
      state.selectedRightSidebarItemDetails.value = item;
      state.selectedRightSidebar.value = ERightSidebar.ITEM_DETAILS;
    };
  }

  function getAddButtonClickHandler(item: TItemWithCategory) {
    return () => createListItem(item.id);
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
                        onClick={getDetailsButtonClickHandler(
                          item as TItemWithCategory
                        )}
                      >
                        {item.name}
                      </button>

                      <button
                        className="group shrink-0 px-4 py-3 disabled:cursor-progress"
                        onClick={getAddButtonClickHandler(
                          item as TItemWithCategory
                        )}
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
