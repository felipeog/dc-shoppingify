import { Layout } from "../../components/Layout";
import { Link } from "@wasp/router";
import { ListItemForm } from "./ListItemForm";
import { ListItemTable } from "./ListItemTable";
import { useQuery } from "@wasp/queries";
import getItems from "@wasp/queries/getItems";
import getItemsLists from "@wasp/queries/getItemsLists";
import getListItems from "@wasp/queries/getListItems";

export function ListItemPage() {
  const itemsResult = useQuery(getItems);
  const itemsListsResult = useQuery(getItemsLists);
  const listItemsResult = useQuery(getListItems);

  const isLoading =
    itemsResult.isLoading ||
    itemsListsResult.isLoading ||
    listItemsResult.isLoading;
  const isFetching =
    itemsResult.isFetching ||
    itemsListsResult.isFetching ||
    listItemsResult.isFetching;
  const isError =
    itemsResult.isError || itemsListsResult.isError || listItemsResult.isError;
  const error = isError
    ? Error(
        `Items: ${itemsResult.error?.message ?? "No error."}` +
          " - " +
          `Items lists: ${itemsListsResult.error?.message ?? "No error."}` +
          " - " +
          `List items: ${listItemsResult.error?.message ?? "No error."}`
      )
    : null;
  const hasDependencies =
    Boolean(itemsListsResult.data?.length) && Boolean(itemsResult.data?.length);

  return (
    <Layout isLoading={isLoading} error={error}>
      {hasDependencies ? (
        <>
          <ListItemTable
            listItems={listItemsResult.data ?? []}
            items={itemsResult.data ?? []}
            itemsLists={itemsListsResult.data ?? []}
            isDisabled={isFetching}
          />
          <br />
          <ListItemForm
            items={itemsResult.data ?? []}
            itemsLists={itemsListsResult.data ?? []}
            isDisabled={isFetching}
          />
        </>
      ) : (
        <p>
          Can't have list items without an <Link to="/debug/item">item</Link> or
          an <Link to="/debug/items-list">items list</Link>.
        </p>
      )}
    </Layout>
  );
}
