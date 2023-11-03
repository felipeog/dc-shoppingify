import { Button } from "../../components/Button";
import { FormEvent, useState } from "react";
import { ItemsList } from "@wasp/entities";
import { ITEMS_LIST_STATES } from "@wasp/shared/constants";
import * as Form from "../../components/Form";
import * as Table from "../../components/Table";
// import deleteItem from "@wasp/actions/deleteItem";
// import updateItem from "@wasp/actions/updateItem";

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
    // setIsLoading(true);
    // try {
    //   const updatedItem = await updateItem({
    //     id: props.itemsList.id,
    //     name: form.itemName,
    //     note: form.note,
    //     image: form.image,
    //     categoryId: form.categoryId,
    //   });
    //   setForm({
    //     itemName: updatedItem.name,
    //     note: updatedItem.note,
    //     image: updatedItem.image,
    //     categoryId: updatedItem.categoryId,
    //   });
    // } catch (error: any) {
    //   setForm({
    //     itemName: props.itemsList.name,
    //     note: props.itemsList.note,
    //     image: props.itemsList.image,
    //     categoryId: props.itemsList.categoryId,
    //   });
    //   console.error(error);
    //   window.alert("Error: " + error.message);
    // } finally {
    //   setIsLoading(false);
    // }
  }

  async function handleDeleteButtonClick() {
    // setIsLoading(true);
    // try {
    //   await deleteItem({ id: props.itemsList.id });
    // } catch (error: any) {
    //   console.error(error);
    //   window.alert("Error: " + error.message);
    // } finally {
    //   setIsLoading(false);
    // }
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
