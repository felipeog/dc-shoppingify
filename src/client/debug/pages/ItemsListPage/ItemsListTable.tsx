import { ItemsList } from "@wasp/entities";
import { ItemsListRow } from "./ItemsListRow";
import * as Table from "../../components/Table";

export function ItemsListTable(props: {
  itemsLists: ItemsList[];
  isDisabled: boolean;
}) {
  if (!props.itemsLists.length) {
    return <p>No items list</p>;
  }

  return (
    <Table.Table>
      <thead>
        <Table.TableRow>
          <Table.TableHeader>id</Table.TableHeader>
          <Table.TableHeader>name</Table.TableHeader>
          <Table.TableHeader>state</Table.TableHeader>
          <Table.TableHeader>actions</Table.TableHeader>
        </Table.TableRow>
      </thead>

      <tbody>
        {props.itemsLists.map((itemsList) => (
          <ItemsListRow
            key={itemsList.id}
            itemsList={itemsList}
            isDisabled={props.isDisabled}
          />
        ))}
      </tbody>
    </Table.Table>
  );
}
