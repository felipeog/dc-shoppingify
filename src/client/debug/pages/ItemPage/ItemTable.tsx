import { Category, Item } from "@wasp/entities";
import { ItemRow } from "./ItemRow";
import * as Table from "../../components/Table";

export function ItemTable(props: {
  items: Item[];
  categories: Category[];
  isDisabled: boolean;
}) {
  if (!props.items.length) {
    return <p>No items</p>;
  }

  return (
    <Table.Table>
      <thead>
        <Table.TableRow>
          <Table.TableHeader>id</Table.TableHeader>
          <Table.TableHeader>name</Table.TableHeader>
          <Table.TableHeader>note</Table.TableHeader>
          <Table.TableHeader>image</Table.TableHeader>
          <Table.TableHeader>category</Table.TableHeader>
          <Table.TableHeader>actions</Table.TableHeader>
        </Table.TableRow>
      </thead>

      <tbody>
        {props.items.map((item) => (
          <ItemRow
            key={item.id}
            item={item}
            categories={props.categories}
            isDisabled={props.isDisabled}
          />
        ))}
      </tbody>
    </Table.Table>
  );
}
