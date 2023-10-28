import { Category } from "@wasp/entities";
import { FormEvent } from "react";
import { useQuery } from "@wasp/queries";
import createCategory from "@wasp/actions/createCategory";
import deleteCategory from "@wasp/actions/deleteCategory";
import getCategories from "@wasp/queries/getCategories";
import { Layout } from "./Layout";

function CategoryItem({ category }: { category: Category }) {
  async function handleClick() {
    try {
      await deleteCategory({ id: category.id });
    } catch (err: any) {
      console.error(err);
      window.alert("Error: " + err.message);
    }
  }

  return (
    <li>
      {category.name} <button onClick={handleClick}>Delete</button>
    </li>
  );
}

function CategoriesList({ categories }: { categories: Category[] }) {
  if (!categories?.length) {
    return <div>No categories</div>;
  }

  return (
    <ul>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </ul>
  );
}

function CategoryForm() {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const target = event.target as HTMLFormElement;
      const name = target.categoryName.value;

      await createCategory({ name });

      target.reset();
    } catch (err: any) {
      console.error(err);
      window.alert("Error: " + err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="categoryName" type="text" defaultValue="" />
      <input type="submit" value="Create category" />
    </form>
  );
}

export function DebugCategoryPage() {
  const { data: categories, isLoading, error } = useQuery(getCategories);

  return (
    <Layout>
      <h1>Category</h1>

      {isLoading && <p>Loading...</p>}

      {error && <p>Error: {error.message}</p>}

      {categories && <CategoriesList categories={categories} />}

      <CategoryForm />
    </Layout>
  );
}
