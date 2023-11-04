import { Item, ItemsList, ListItem } from "@wasp/entities";
import { ListItemRow } from "./ListItemRow";
import * as Table from "../../components/Table";

export function ListItemTable(props: {
  listItems: ListItem[];
  items: Item[];
  itemsLists: ItemsList[];
  isDisabled: boolean;
}) {
  if (!props.listItems.length) {
    return <p>No list items</p>;
  }

  return (
    <Table.Table>
      <thead>
        <Table.TableRow>
          <Table.TableHeader>id</Table.TableHeader>
          <Table.TableHeader>amount</Table.TableHeader>
          <Table.TableHeader>isDone</Table.TableHeader>
          <Table.TableHeader>item</Table.TableHeader>
          <Table.TableHeader>listItem</Table.TableHeader>
          <Table.TableHeader>actions</Table.TableHeader>
        </Table.TableRow>
      </thead>

      <tbody>
        {props.listItems.map((listItem) => (
          <ListItemRow
            key={listItem.id}
            listItem={listItem}
            items={props.items}
            itemsLists={props.itemsLists}
            isDisabled={props.isDisabled}
          />
        ))}
      </tbody>
    </Table.Table>
  );
}
