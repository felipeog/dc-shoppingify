import { Category } from "@wasp/entities";
import { FormEvent } from "react";
import { useQuery } from "@wasp/queries";
import { User } from "@wasp/entities";
import createCategory from "@wasp/actions/createCategory";
import getCategories from "@wasp/queries/getCategories";
import logout from "@wasp/auth/logout";

const CategoriesList = ({ categories }: { categories: Category[] }) => {
  if (!categories?.length) {
    return <div>No categories</div>;
  }

  return (
    <ul>
      {categories.map((category) => (
        <li key={category.id}>{category.name}</li>
      ))}
    </ul>
  );
};

const NewCategoryForm = () => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const target = event.target as HTMLFormElement;
      const name = target.categoryName.value;

      await createCategory({ name });

      target.reset();
    } catch (err: any) {
      window.alert("Error: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="categoryName" type="text" defaultValue="" />
      <input type="submit" value="Create category" />
    </form>
  );
};

const MainPage = ({ user }: { user: User }) => {
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
          <NewCategoryForm />
        </div>

        <div>
          <pre>{JSON.stringify({ user })}</pre>
          <button onClick={logout}>Logout</button>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
