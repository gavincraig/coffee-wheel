import { FormField } from "../../primatives/forms/FormField";
import { TextField } from "../../primatives/forms/TextField";

type NewCoffeeFormProps = {
  values: Record<string, string>;
  callbacks: Record<string, (arg: string) => void>;
};

const NewCoffeeForm = ({ values, callbacks }: NewCoffeeFormProps) => {
  return (
    <form>
      <div className="flex flex-col gap-2 p-4">
        <FormField label="name">
          <TextField
            placeholder={"My new coffee"}
            value={values.nameInputValue}
            onChange={callbacks.setNameInputValue}
          />
        </FormField>
        <hr className="border-zinc-700 mt-2" />
        <FormField label="origin">
          <TextField
            value={values.originInputValue}
            placeholder="e.g Ethiopia"
            onChange={callbacks.setOriginInputValue}
          />
        </FormField>

        <FormField label="process">
          <TextField
            value={values.processInputValue}
            placeholder="e.g Washed"
            onChange={callbacks.setProcessInputValue}
          />
        </FormField>

        <FormField label="varietal">
          <TextField
            value={values.varietalInputValue}
            placeholder="e.g Caturra"
            onChange={callbacks.setVarietalInputValue}
          />
        </FormField>
      </div>
    </form>
  );
};

export default NewCoffeeForm;
