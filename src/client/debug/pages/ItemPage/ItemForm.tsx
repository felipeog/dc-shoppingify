import { Category } from "@wasp/entities";
import { FormEvent, useState } from "react";
import * as Form from "../../components/Form";
import createItem from "@wasp/actions/createItem";
import { Button } from "../../components/Button";

export function ItemForm(props: {
  isDisabled: boolean;
  categories: Category[];
}) {
  const [isLoading, setIsLoading] = useState(false);

  const isFormDisabled = props.isDisabled || isLoading;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const target = event.target as HTMLFormElement;
      const image = target.image.value;
      const name = target.itemName.value;
      const note = target.note.value;
      const categoryId = target.category.value;

      await createItem({
        image,
        name,
        note,
        categoryId,
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
        name="itemName"
        type="text"
        defaultValue=""
        disabled={isFormDisabled}
        required
      />
      <Form.Input
        placeholder="Image URL"
        name="image"
        type="text"
        defaultValue=""
        disabled={isFormDisabled}
      />
      <Form.Input
        placeholder="Note"
        name="note"
        type="text"
        defaultValue=""
        disabled={isFormDisabled}
      />
      <Form.Select name="category" disabled={isFormDisabled} required>
        {props.categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Form.Select>

      <Button type="submit" disabled={isFormDisabled}>
        Create item
      </Button>
    </Form.Form>
  );
}
