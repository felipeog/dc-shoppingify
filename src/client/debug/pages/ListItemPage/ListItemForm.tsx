import { Item, ItemsList } from "@wasp/entities";
import { FormEvent, useState } from "react";
import * as Form from "../../components/Form";
import createListItem from "@wasp/actions/createListItem";
import { Button } from "../../components/Button";

export function ListItemForm(props: {
  isDisabled: boolean;
  items: Item[];
  itemsLists: ItemsList[];
}) {
  const [isLoading, setIsLoading] = useState(false);

  const isFormDisabled = props.isDisabled || isLoading;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const target = event.target as HTMLFormElement;
      const amount = target.amount.value;
      const isDone = target.isDone.checked;
      const itemId = target.itemId.value;
      const itemsListId = target.itemsListId.value;

      await createListItem({
        amount,
        isDone,
        itemId,
        itemsListId,
      });

      target.reset();
    } catch (err: any) {
      console.error(err);
      window.alert("Error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form.Form onSubmit={handleSubmit}>
      <Form.Input
        placeholder="Amount"
        name="amount"
        type="number"
        disabled={isFormDisabled}
      />

      <label>
        Done{" "}
        <Form.Input
          placeholder="Done"
          name="isDone"
          type="checkbox"
          disabled={isFormDisabled}
        />
      </label>

      <Form.Select name="itemId" disabled={isFormDisabled} required>
        <option value="">Item</option>

        {props.items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </Form.Select>
      <Form.Select name="itemsListId" disabled={isFormDisabled} required>
        <option value="">Items list</option>

        {props.itemsLists.map((itemsList) => (
          <option key={itemsList.id} value={itemsList.id}>
            {itemsList.name}
          </option>
        ))}
      </Form.Select>

      <Button type="submit" disabled={isFormDisabled}>
        Create list item
      </Button>
    </Form.Form>
  );
}
