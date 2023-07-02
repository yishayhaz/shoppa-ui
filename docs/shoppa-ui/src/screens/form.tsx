import { useMemo, useState } from "react";
import {
  Form,
  FormErrors,
  FormFields,
  FormOnSubmit,
} from "@shoppa-ui/widgets/form";
import { Input } from "@shoppa-ui/widgets/input";

export function FormScreen() {
  const [fields, setFields] = useState<FormFields>({
    status: {
      as: "select",
      field: {
        label: "סטטוס",
        required: true,
        options: [
          {
            label: "סטטוס המוצר",
            value: "",
            isDefault: true,
          },
          {
            label: "פעיל",
            value: "active",
          },
          {
            label: "נמחק",
            value: "deleted",
          },
          {
            label: "לא פעיל",
            value: "inactive",
          },
        ],
      },
    },
    price: {
      as: "input",
      field: {
        required: true,
        placeholder: "מחיר",
        label: "מחיר",
        type: "number",
        icon: "₪",
      },
    },
    in_storage: {
      as: "input",
      validation: [
        {
          validate: (value) => Number(value) >= 0,
          message: "כמות במלאי חייבת להיות גדולה מ-0",
        },
      ],
      field: {
        type: "number",
        required: true,
        placeholder: "כמות במלאי",
        label: "כמות במלאי",
      },
    },
    name: {
      as: "input",
      nullWhenEmpty: true,
      field: {
        placeholder: "שם הפריט",
        label: "שם הפריט",
      },
    },
    info: {
      nullWhenEmpty: true,
      as: "textarea",
      field: {
        placeholder: "מידע נוסף",
        label: "מידע נוסף",
      },
    },
    sku: {
      nullWhenEmpty: true,
      as: "input",
      field: {
        placeholder: `מק"ט`,
        label: `מק"ט`,
      },
    },
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const [internalValue, setInternal] = useState("");

  const handleSubmit: FormOnSubmit = (doc) => {
    if (Math.random() > 0.5) {
      setFormErrors({
        status: "שם הפריט חייב להיות גדול מ-3 תווים",
        in_storage: "כמות במלאי חייבת להיות גדולה מ-0",
      });
    } else {
      alert(JSON.stringify(doc, null, 2));
    }

    console.log(doc);
  };

  const initialValues = useMemo(
    () => ({
      status: "deleted",
      name: "מגלשיים",
      price: 169,
      in_storage: 0,
      info: null,
      sku: "54564",
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
        onSubmit={handleSubmit}
        initialValues={initialValues}
        buttonLabel="Submit"
        isDisabled={(internal) =>
          internal ? Boolean(internalValue) === false : internal
        }
        errors={formErrors}
        setErrors={setFormErrors}
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
