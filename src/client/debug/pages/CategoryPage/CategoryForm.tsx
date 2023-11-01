import { Button } from "../../components/Button";
import { FormEvent, useState } from "react";
import * as Form from "../../components/Form";
import createCategory from "@wasp/actions/createCategory";

export function CategoryForm(props: { isDisabled: boolean }) {
  const [isLoading, setIsLoading] = useState(false);

  const isFormDisabled = props.isDisabled || isLoading;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const target = event.target as HTMLFormElement;
      const name = target.categoryName.value;

      await createCategory({ name });

      target.reset();
    } catch (error: any) {
      console.error(error);
      window.alert("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form.Form onSubmit={handleSubmit}>
      <Form.Input
        placeholder="Name"
        name="categoryName"
        type="text"
        defaultValue=""
        disabled={isFormDisabled}
        required
      />
      <Button type="submit" disabled={isFormDisabled}>
        Create category
      </Button>
    </Form.Form>
  );
}
