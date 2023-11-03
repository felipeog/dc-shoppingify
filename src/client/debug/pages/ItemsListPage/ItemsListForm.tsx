import { Button } from "../../components/Button";
import { FormEvent, useState } from "react";
import { ITEMS_LIST_STATES } from "@wasp/shared/constants";
import * as Form from "../../components/Form";
import createItemsList from "@wasp/actions/createItemsList";

export function ItemsListForm(props: { isDisabled: boolean }) {
  const [isLoading, setIsLoading] = useState(false);

  const isFormDisabled = props.isDisabled || isLoading;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const target = event.target as HTMLFormElement;
      const name = target.itemsListName.value;
      const state = target.state.value;

      await createItemsList({
        name,
        state,
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
        placeholder="Name"
        name="itemsListName"
        type="text"
        defaultValue=""
        disabled={isFormDisabled}
      />
      <Form.Select name="state" disabled={isFormDisabled}>
        <option value="">State</option>

        {ITEMS_LIST_STATES.map((itemsListState) => (
          <option key={itemsListState} value={itemsListState}>
            {itemsListState}
          </option>
        ))}
      </Form.Select>

      <Button type="submit" disabled={isFormDisabled}>
        Create items list
      </Button>
    </Form.Form>
  );
}
