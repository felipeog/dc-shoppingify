import { Button } from "../../components/Button";
import { FormEvent, useState } from "react";
import { ITEMS_LIST_STATES } from "@wasp/shared/constants";
import { ItemsList } from "@wasp/entities";
import * as Form from "../../components/Form";
import * as Table from "../../components/Table";
import deleteItemsList from "@wasp/actions/deleteItemsList";
import updateItemsList from "@wasp/actions/updateItemsList";

export function ItemsListRow(props: {
  itemsList: ItemsList;
  isDisabled: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    itemsListName: props.itemsList.name,
    state: props.itemsList.state,
  });

  const isActionDisabled = props.isDisabled || isLoading;

  function handleInputChange(event: FormEvent) {
    const target = event.target as HTMLInputElement;

    setForm((form) => {
      return {
        ...form,
        [target.name]: target.value,
      };
    });
  }

  async function handleUpdateButtonClick() {
    setIsLoading(true);

    try {
      const updatedItemsList = await updateItemsList({
        id: props.itemsList.id,
        name: form.itemsListName,
        state: form.state,
      });
      setForm({
        itemsListName: updatedItemsList.name,
        state: updatedItemsList.state,
      });
    } catch (error: any) {
      setForm({
        itemsListName: props.itemsList.name,
        state: props.itemsList.state,
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
      await deleteItemsList({ id: props.itemsList.id });
    } catch (error: any) {
      console.error(error);
      window.alert("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <tr>
      <Table.TableData>{props.itemsList.id}</Table.TableData>
      <Table.TableData>
        <Form.Input
          disabled={isActionDisabled}
          name="itemsListName"
          onChange={handleInputChange}
          placeholder="Name"
          required
          type="text"
          value={form.itemsListName}
        />
      </Table.TableData>
      <Table.TableData>
        <Form.Select
          disabled={isActionDisabled}
          name="state"
          onChange={handleInputChange}
          placeholder="State"
          required
          value={form.state}
        >
          {ITEMS_LIST_STATES.map((itemsListState) => (
            <option key={itemsListState} value={itemsListState}>
              {itemsListState}
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
