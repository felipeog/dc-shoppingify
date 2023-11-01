import { Button } from "../../components/Button";
import { Category } from "@wasp/entities";
import { useState } from "react";
import * as Table from "../../components/Table";
import deleteCategory from "@wasp/actions/deleteCategory";

export function CategoryRow(props: {
  category: Category;
  isDisabled: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const isActionDisabled = props.isDisabled || isLoading;

  async function handleClick() {
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
      <Table.TableData>{props.category.name}</Table.TableData>
      <Table.TableData>
        <Button onClick={handleClick} disabled={isActionDisabled}>
          Delete
        </Button>
      </Table.TableData>
    </tr>
  );
}
