import { Category } from "@wasp/entities";
import { FormEvent } from "react";
import { useQuery } from "@wasp/queries";
import createCategory from "@wasp/actions/createCategory";
import deleteCategory from "@wasp/actions/deleteCategory";
import getCategories from "@wasp/queries/getCategories";

function CategoryItem({ category }: { category: Category }) {
  async function handleClick() {
    try {
      await deleteCategory({ id: category.id });
    } catch (err: any) {
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
    <div className="container">
      <main>
        <div>
          {categories && <CategoriesList categories={categories} />}
          {isLoading && "Loading..."}
          {error && "Error: " + error}
        </div>

        <div>
          <CategoryForm />
        </div>
      </main>
    </div>
  );
}
