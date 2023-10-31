import { Button } from "./components/Button";
import { Category } from "@wasp/entities";
import { Form } from "./components/Form";
import { FormEvent, useState } from "react";
import { Layout } from "./components/Layout";
import { useQuery } from "@wasp/queries";
import * as Table from "./components/Table";
import createCategory from "@wasp/actions/createCategory";
import deleteCategory from "@wasp/actions/deleteCategory";
import getCategories from "@wasp/queries/getCategories";

function CategoryRow({ category }: { category: Category }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    setIsLoading(true);

    try {
      await deleteCategory({ id: category.id });
    } catch (err: any) {
      console.error(err);
      window.alert("Error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <tr>
      <Table.TableData>{category.id}</Table.TableData>
      <Table.TableData>{category.name}</Table.TableData>
      <Table.TableData>
        <Button onClick={handleClick} disabled={isLoading}>
          Delete
        </Button>
      </Table.TableData>
    </tr>
  );
}

function CategoriesTable({ categories }: { categories: Category[] }) {
  if (!categories?.length) {
    return <p>No categories</p>;
  }

  return (
    <Table.Table>
      <thead>
        <Table.TableRow>
          <Table.TableHeader>id</Table.TableHeader>
          <Table.TableHeader>name</Table.TableHeader>
          <Table.TableHeader>actions</Table.TableHeader>
        </Table.TableRow>
      </thead>

      <tbody>
        {categories.map((category, index) => (
          <CategoryRow key={category.id} category={category} />
        ))}
      </tbody>
    </Table.Table>
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
    <Form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        name="categoryName"
        type="text"
        defaultValue=""
        required
      />
      <Button type="submit">Create category</Button>
    </Form>
  );
}

export function DebugCategoryPage() {
  const { data: categories, isLoading, error } = useQuery(getCategories);

  return (
    <Layout isLoading={isLoading} error={error}>
      <CategoriesTable categories={categories ?? []} />

      <br />

      <CategoryForm />
    </Layout>
  );
}
