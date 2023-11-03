import { Button } from "../../components/Button";
import { FormEvent, useState } from "react";
import * as Form from "../../components/Form";
// import createItem from "@wasp/actions/createItem";
import { ITEMS_LIST_STATES } from "@wasp/shared/constants";

export function ItemsListForm(props: { isDisabled: boolean }) {
  const [isLoading, setIsLoading] = useState(false);

  const isFormDisabled = props.isDisabled || isLoading;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // setIsLoading(true);

    // try {
    //   const target = event.target as HTMLFormElement;
    //   const image = target.image.value;
    //   const name = target.itemName.value;
    //   const note = target.note.value;
    //   const categoryId = target.category.value;

    //   await createItem({
    //     image,
    //     name,
    //     note,
    //     categoryId,
    //   });

    //   target.reset();
    // } catch (err: any) {
    //   console.error(err);
    //   window.alert("Error: " + err.message);
    // } finally {
    //   setIsLoading(false);
    // }
  }

  return (
    <Form.Form onSubmit={handleSubmit}>
      <Form.Input
        placeholder="Name"
        name="itemsListName"
        type="text"
        defaultValue=""
        disabled={isFormDisabled}
        required
      />
      <Form.Select name="state" disabled={isFormDisabled} required>
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
