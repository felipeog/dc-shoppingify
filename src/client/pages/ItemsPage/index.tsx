import "./index.css";
import { Layout } from "../../components/Layout";
import { QueryContainer } from "../../components/QueryContainer";
import { useQuery } from "@wasp/queries";
import getItemsByCategory from "@wasp/queries/getItemsByCategory";

export function ItemsPage() {
  const itemsByCategoryResult = useQuery(getItemsByCategory);

  // TODO: improve render
  return (
    <Layout>
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
                    <li key={item.id}>Item: {item.name}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items</p>
        )}
      </QueryContainer>
    </Layout>
  );
}
