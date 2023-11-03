import { ItemsListForm } from "./ItemsListForm";
import { ItemsListTable } from "./ItemsListTable";
import { Layout } from "../../components/Layout";
import { useQuery } from "@wasp/queries";
import getItemsLists from "@wasp/queries/getItemsLists";

export function ItemsListPage() {
  const itemsListsResult = useQuery(getItemsLists);

  return (
    <Layout
      isLoading={itemsListsResult.isLoading}
      error={itemsListsResult.error}
    >
      <ItemsListTable
        itemsLists={itemsListsResult.data ?? []}
        isDisabled={itemsListsResult.isFetching}
      />

      <br />

      <ItemsListForm isDisabled={itemsListsResult.isFetching} />
    </Layout>
  );
}
