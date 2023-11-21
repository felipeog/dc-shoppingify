import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { useQuery } from "@wasp/queries";
import CreatableSelect from "react-select/creatable";
import createCategory from "@wasp/actions/createCategory";
import getCategories from "@wasp/queries/getCategories";

export type TCategorySelectOption = {
  label: string;
  value: number;
} | null;

type TCategorySelectProps = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  value: TCategorySelectOption;
  setValue: Dispatch<SetStateAction<TCategorySelectOption>>;
  name: string;
};

export function CategorySelect(props: TCategorySelectProps) {
  const categoriesResult = useQuery(getCategories);

  async function handleCreate(inputValue: string) {
    props.setIsLoading(true);

    try {
      const createdCategory = await createCategory({ name: inputValue });

      props.setValue({
        label: createdCategory.name,
        value: createdCategory.id,
      });
    } catch (error: any) {
      console.error(error);
      toast.info(error.message);
    } finally {
      props.setIsLoading(false);
    }
  }

  const options = categoriesResult?.data?.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  return (
    <CreatableSelect
      isClearable
      isDisabled={props.isLoading}
      name={props.name}
      onChange={props.setValue}
      onCreateOption={handleCreate}
      options={options}
      placeholder="Enter a category"
      required
      value={props.value}
    />
  );
}
