import { Button } from "../../components/Button";
import { FormEvent, useState } from "react";
import { ItemsList, Item, ListItem } from "@wasp/entities";
import * as Form from "../../components/Form";
import * as Table from "../../components/Table";
import deleteListItem from "@wasp/actions/deleteListItem";
import updateListItem from "@wasp/actions/updateListItem";

export function ListItemRow(props: {
  listItem: ListItem;
  items: Item[];
  itemsLists: ItemsList[];
  isDisabled: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    amount: props.listItem.amount,
    isDone: props.listItem.isDone,
    itemId: props.listItem.itemId,
    itemsListId: props.listItem.itemsListId,
  });

  const isActionDisabled = props.isDisabled || isLoading;

  function handleInputChange(event: FormEvent) {
    const target = event.target as HTMLInputElement;

    setForm((form) => {
      return {
        ...form,
        [target.name]:
          target.type === "checkbox" ? target.checked : target.value,
      };
    });
  }

  async function handleUpdateButtonClick() {
    setIsLoading(true);

    try {
      const updatedListItem = await updateListItem({
        id: props.listItem.id,
        amount: form.amount,
        isDone: form.isDone,
        itemId: form.itemId,
        itemsListId: form.itemsListId,
      });
      setForm({
        amount: updatedListItem.amount,
        isDone: updatedListItem.isDone,
        itemId: updatedListItem.itemId,
        itemsListId: updatedListItem.itemsListId,
      });
    } catch (error: any) {
      setForm({
        amount: props.listItem.amount,
        isDone: props.listItem.isDone,
        itemId: props.listItem.itemId,
        itemsListId: props.listItem.itemsListId,
      });
      console.error(error);
      window.alert("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteButtonClick() {
    setIsLoading(true);

    try {
      await deleteListItem({ id: props.listItem.id });
    } catch (error: any) {
      console.error(error);
      window.alert("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <tr>
      <Table.TableData>{props.listItem.id}</Table.TableData>
      <Table.TableData>
        <Form.Input
          disabled={isActionDisabled}
          name="amount"
          onChange={handleInputChange}
          placeholder="Amount"
          required
          type="number"
          value={form.amount}
        />
      </Table.TableData>
      <Table.TableData>
        <Form.Input
          disabled={isActionDisabled}
          name="isDone"
          onChange={handleInputChange}
          placeholder="Done"
          required
          type="checkbox"
          checked={form.isDone}
        />
      </Table.TableData>
      <Table.TableData>
        <Form.Select
          disabled={isActionDisabled}
          name="itemId"
          onChange={handleInputChange}
          placeholder="Item"
          required
          value={form.itemId}
        >
          {props.items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Form.Select>
      </Table.TableData>
      <Table.TableData>
        <Form.Select
          disabled={isActionDisabled}
          name="itemsListId"
          onChange={handleInputChange}
          placeholder="Items list"
          required
          value={form.itemsListId}
        >
          {props.itemsLists.map((itemsList) => (
            <option key={itemsList.id} value={itemsList.id}>
              {itemsList.name}
            </option>
          ))}
        </Form.Select>
      </Table.TableData>
      <Table.TableData>
        <Button onClick={handleUpdateButtonClick} disabled={isActionDisabled}>
          Update
        </Button>{" "}
        <Button onClick={handleDeleteButtonClick} disabled={isActionDisabled}>
          Delete
        </Button>
      </Table.TableData>
    </tr>
  );
}
