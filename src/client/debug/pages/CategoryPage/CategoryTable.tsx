import { Category } from "@wasp/entities";
import { CategoryRow } from "./CategoryRow";
import * as Table from "../../components/Table";

export function CategoriesTable(props: {
  categories: Category[];
  isDisabled: boolean;
}) {
  if (!props.categories.length) {
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
