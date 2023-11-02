import { Button } from "../../components/Button";
import { Category } from "@wasp/entities";
import { FormEvent } from "react";
import { useState } from "react";
import * as Form from "../../components/Form";
import * as Table from "../../components/Table";
import deleteCategory from "@wasp/actions/deleteCategory";
import updateCategory from "@wasp/actions/updateCategory";

export function CategoryRow(props: {
  category: Category;
  isDisabled: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    categoryName: props.category.name,
  });

  const isActionDisabled = props.isDisabled || isLoading;

  function handleInputChange(event: FormEvent<HTMLInputElement>) {
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
      const updatedCategory = await updateCategory({
        id: props.category.id,
        name: form.categoryName,
      });

      setForm({
        categoryName: updatedCategory.name,
      });
    } catch (error: any) {
      setForm({
        categoryName: props.category.name,
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
      await deleteCategory({ id: props.category.id });
    } catch (error: any) {
      console.error(error);
      window.alert("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <tr>
      <Table.TableData>{props.category.id}</Table.TableData>
      <Table.TableData>
        <Form.Input
          disabled={isActionDisabled}
          name="categoryName"
          onChange={handleInputChange}
          placeholder="Name"
          required
          type="text"
          value={form.categoryName}
        />
      </Table.TableData>
      <Table.TableData>
        <Button onClick={handleUpdateButtonClick} disabled={isActionDisabled}>
          Update
        </Button>
        <Button onClick={handleDeleteButtonClick} disabled={isActionDisabled}>
          Delete
        </Button>
      </Table.TableData>
    </tr>
  );
}
