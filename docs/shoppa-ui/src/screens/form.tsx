import { useState } from "react";
import { Form, FormFields } from "@shoppa-ui/widgets/form";

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

  return (
    <div>
      <h1>This is the documentation for the Form component. </h1>
      <br />
      <Form
        className="d-flex gap-12 flex-column"
        fields={fields}
        setFields={setFields}
        onSubmit={(d) => alert(JSON.stringify(d, null, 2))}
        buttonLabel="Submit"
      />
    </div>
  );
}
