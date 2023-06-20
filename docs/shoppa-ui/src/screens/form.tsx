import { useMemo, useState } from "react";
import { Form, FormFields } from "@shoppa-ui/widgets/form";
import { Input } from "@shoppa-ui/widgets/input";

export function FormScreen() {
  const [fields, setFields] = useState<FormFields>({
    name: {
      as: "input",
      field: {
        required: true,
      },
    },
    age: {
      as: "textarea",
      field: {},
    },
    city: {
      as: "select",
      field: {
        required: true,
        options: [
          { label: "Select a city", value: "", isDefault: true },
          { label: "New York", value: "new-york" },
          { label: "London", value: "london" },
        ],
      },
    },
  });

  const [internalValue, setInternal] = useState("");

  const initialValues = useMemo(
    () => ({
      name: "John Doe",
      age: "20",
      city: "london",
    }),
    []
  );

  return (
    <div>
      <h1>This is the documentation for the Form component. </h1>
      <br />
      <Form
        className="d-flex gap-12 flex-column"
        fields={fields}
        setFields={setFields}
        onSubmit={(d) => alert(JSON.stringify(d, null, 2))}
        initialValues={initialValues}
        buttonLabel="Submit"
        isDisabled={(internal) =>
          internal ? Boolean(internalValue) === false : internal
        }
      >
        <Input
          name="name"
          label="INTERNAL Name"
          onChange={(e) => setInternal(e.target.value)}
          value={internalValue}
        />
        <Input
          name="name"
          label="INTERNAL Name"
          onChange={(e) => setInternal(e.target.value)}
          value={internalValue}
        />
      </Form>
    </div>
  );
}
