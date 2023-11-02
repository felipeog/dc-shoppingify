import { ItemForm } from "./ItemForm";
import { ItemTable } from "./ItemTable";
import { Layout } from "../../components/Layout";
import { Link } from "@wasp/router";
import { useQuery } from "@wasp/queries";
import getCategories from "@wasp/queries/getCategories";
import getItems from "@wasp/queries/getItems";

export function ItemPage() {
  const itemsResult = useQuery(getItems);
  const categoriesResult = useQuery(getCategories);

  const isLoading = itemsResult.isLoading || categoriesResult.isLoading;
  const isFetching = itemsResult.isFetching || categoriesResult.isFetching;
  const isError = itemsResult.isError || categoriesResult.isError;
  const error = isError
    ? Error(
        `Item: ${itemsResult.error?.message ?? "No error."}` +
          ", " +
          `Categories: ${categoriesResult.error?.message ?? "No error."}`
      )
    : null;

  return (
    <Layout isLoading={isLoading} error={error}>
      {Boolean(categoriesResult.data?.length) ? (
        <>
          <ItemTable
            items={itemsResult.data ?? []}
            categories={categoriesResult.data ?? []}
            isDisabled={isFetching}
          />
          <br />
          <ItemForm isDisabled={isFetching} />
        </>
      ) : (
        <p>
          Can't have items without a <Link to="/debug/category">category</Link>.
        </p>
      )}
    </Layout>
  );
}
