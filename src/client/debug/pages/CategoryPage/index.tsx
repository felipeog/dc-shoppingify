import { CategoriesTable } from "./CategoryTable";
import { CategoryForm } from "./CategoryForm";
import { Layout } from "../../components/Layout";
import { useQuery } from "@wasp/queries";
import getCategories from "@wasp/queries/getCategories";

export function CategoryPage() {
  const {
    data: categories,
    isLoading,
    error,
    isFetching,
  } = useQuery(getCategories);

  return (
    <Layout isLoading={isLoading} error={error}>
      <CategoriesTable categories={categories ?? []} isDisabled={isFetching} />

      <br />

      <CategoryForm isDisabled={isFetching} />
    </Layout>
  );
}
