import { Button } from "./components/Button";
import { Category } from "@wasp/entities";
import { FormEvent, useState } from "react";
import { Layout } from "./components/Layout";
import { useQuery } from "@wasp/queries";
import * as Form from "./components/Form";
import * as Table from "./components/Table";
import createCategory from "@wasp/actions/createCategory";
import deleteCategory from "@wasp/actions/deleteCategory";
import getCategories from "@wasp/queries/getCategories";

// TODO: separate components in files

function CategoryRow(props: { category: Category; isDisabled: boolean }) {
  const [isLoading, setIsLoading] = useState(false);

  const isActionDisabled = props.isDisabled || isLoading;

  async function handleClick() {
    setIsLoading(true);

    try {
      await deleteCategory({ id: props.category.id });
    } catch (err: any) {
      console.error(err);
      window.alert("Error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <tr>
      <Table.TableData>{props.category.id}</Table.TableData>
      <Table.TableData>{props.category.name}</Table.TableData>
      <Table.TableData>
        <Button onClick={handleClick} disabled={isActionDisabled}>
          Delete
        </Button>
      </Table.TableData>
    </tr>
  );
}

function CategoriesTable(props: {
  categories: Category[];
  isDisabled: boolean;
}) {
  if (!props.categories?.length) {
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
        {props.categories.map((category) => (
          <CategoryRow
            key={category.id}
            category={category}
            isDisabled={props.isDisabled}
          />
        ))}
      </tbody>
    </Table.Table>
  );
}

function CategoryForm(props: { isDisabled: boolean }) {
  const [isLoading, setIsLoading] = useState(false);

  const isFormDisabled = props.isDisabled || isLoading;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const target = event.target as HTMLFormElement;
      const name = target.categoryName.value;

      await createCategory({ name });

      target.reset();
    } catch (err: any) {
      console.error(err);
      window.alert("Error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form.Form onSubmit={handleSubmit}>
      <Form.Input
        placeholder="Name"
        name="categoryName"
        type="text"
        defaultValue=""
        disabled={isFormDisabled}
        required
      />
      <Button type="submit" disabled={isFormDisabled}>
        Create category
      </Button>
    </Form.Form>
  );
}

export function DebugCategoryPage() {
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
