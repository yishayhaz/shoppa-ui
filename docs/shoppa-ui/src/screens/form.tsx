import { useEffect, useState } from "react";
import { Form, FormField } from "@shoppa-ui/widgets/form";
import { IoChevronBack } from "react-icons/io5";
import { Checkbox } from "@shoppa-ui/widgets/checkbox";

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
    {
      name: "options",
      as: "select",
      field: {
        required: true,
        options: [
          {
            label: "Select an option",
            value: "",
            isDefault: true,
          },
          {
            label: "Option 1",
            value: "option1",
          },
          {
            label: "Option 2",
            value: "option2",
          },
          {
            label: "Option 3",
            value: "option3",
          },
        ],
      },
    },
  ]);

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
