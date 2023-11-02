import { Button } from "../../components/Button";
import { Category, Item } from "@wasp/entities";
import { FormEvent, useState } from "react";
import * as Form from "../../components/Form";
import * as Table from "../../components/Table";

export function ItemRow(props: {
  item: Item;
  categories: Category[];
  isDisabled: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    itemName: props.item.name,
    note: props.item.note,
    image: props.item.image,
    categoryId: props.item.categoryId,
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
    //   const updatedCategory = await updateCategory({
    //     id: props.category.id,
    //     name: form.categoryName,
    //   });
    //   setForm({
    //     categoryName: updatedCategory.name,
    //   });
    // } catch (error: any) {
    //   setForm({
    //     categoryName: props.category.name,
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
    //   await deleteCategory({ id: props.category.id });
    // } catch (error: any) {
    //   console.error(error);
    //   window.alert("Error: " + error.message);
    // } finally {
    //   setIsLoading(false);
    // }
  }

  return (
    <tr>
      <Table.TableData>{props.item.id}</Table.TableData>
      <Table.TableData>
        <Form.Input
          disabled={isActionDisabled}
          name="itemName"
          onChange={handleInputChange}
          placeholder="Name"
          required
          type="text"
          value={form.itemName}
        />
      </Table.TableData>
      <Table.TableData>
        <Form.Input
          disabled={isActionDisabled}
          name="note"
          onChange={handleInputChange}
          placeholder="Note"
          required
          type="text"
          value={form.note ?? ""}
        />
      </Table.TableData>
      <Table.TableData>
        <Form.Input
          disabled={isActionDisabled}
          name="image"
          onChange={handleInputChange}
          placeholder="Image"
          required
          type="text"
          value={form.image ?? ""}
        />
      </Table.TableData>
      <Table.TableData>
        <Form.Select
          disabled={isActionDisabled}
          name="categoryId"
          onChange={handleInputChange}
          placeholder="Name"
          required
          value={form.categoryId}
        >
          {props.categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
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
