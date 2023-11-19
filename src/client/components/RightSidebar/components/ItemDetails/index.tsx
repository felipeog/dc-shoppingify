import { ERightSidebar } from "../../../../types";
import { useAppState } from "../../../../state";

export function ItemDetails() {
  const state = useAppState();
  const item = state.selectedRightSidebarItemDetails.value;

  function handleBackButtonClick() {
    state.selectedRightSidebar.value = ERightSidebar.ITEMS_LIST;
    state.selectedRightSidebarItemDetails.value = null;
  }

  return (
    <section className="bg-white flex-shrink-0 w-96">
      <div className="h-[calc(100vh_-_130px)] overflow-y-scroll px-8 py-6">
        <button
          className="flex items-center gap-2 text-orange-400 text-sm"
          onClick={handleBackButtonClick}
        >
          &larr; back
        </button>

        {item?.image && (
          <img
            className="w-full h-52 object-cover rounded-2xl mt-8"
            src={item.image}
          />
        )}

        <dl className="mt-8">
          <dt className="text-xs text-gray-400">name</dt>
          <dd className="text-2xl first-letter:capitalize mt-2">
            {item ? item.name : "-"}
          </dd>

          <dt className="text-xs text-gray-400 mt-8">category</dt>
          <dd className="first-letter:capitalize  mt-2">
            {item ? item.category.name : "-"}
          </dd>

          {item?.note && (
            <>
              <dt className="text-xs text-gray-400 mt-8">note</dt>
              <dd className="mt-2">{item.note}</dd>
            </>
          )}
        </dl>
      </div>

      <div className="flex gap-2 justify-center items-center h-[130px] bg-white border-t border-gray-100">
        <button disabled>Delete</button>
        <button disabled>Add to list</button>
      </div>
    </section>
  );
}
