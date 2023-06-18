import { useEffect, useState } from "react";
import { Form, FormField } from "@shoppa-ui/widgets/form";

export function FormScreen() {
  const [fields, setFields] = useState<FormField[]>([
    {
      name: "name",
      as: "input",
      validation: [
        {
          message: "Name must be at least 3 characters long",
          pattern: /^.{3,}$/,
        },
      ],
      field: {
        placeholder: "Name",
        title: "Name",
        label: "Name",
      },
    },
    {
      name: "age",
      as: "input",
      validation: [
        {
          message: "Age must be between 18-100",
          pattern: /^1[8-9]$|^[2-9][0-9]$/,
        },
      ],
      field: {
        required: true,
        type: "number",
        placeholder: "age",
        title: "age",
        label: "age",
      },
    },
  ]);

  return (
    <div>
      <h1>This is the documentation for the Form component.</h1>
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
