import React, { useMemo } from "react";
import {
  Form as PrimitiveForm,
  FormProps as PrimitiveFormProps,
} from "../../primitives/form";
import { Input, InputProps } from "../input";
import { Textarea, TextareaProps } from "../textarea";
import { Button, ButtonProps } from "../button";

export type FormProps = {
  onSubmit: (
    data: { [key: string]: string | number },
    fields: FormField[],
    e: React.FormEvent<HTMLFormElement>
  ) => void;
  fields: FormField[];
  setFields: React.Dispatch<React.SetStateAction<FormField[]>>;
  buttonLabel?: string;
  buttonProps?: Omit<ButtonProps, "link" | "onClick" | "disabled">;
} & PrimitiveFormProps;

export type FormField = {
  name: string;
  as: "input" | "textarea";
  validation?: FormValidation[];
  field: Omit<
    InputProps,
    "onChange" | "pattern" | "name" | "onClick" | "isValid"
  > &
    Omit<
      TextareaProps,
      "onChange" | "pattern" | "name" | "onClick" | "isValid"
    >;
};

export type FormValidation = {
  pattern?: RegExp;
  validate?: FormFieldValidate;
  message: string;
};

export type FormFieldValidate = (
  value: string | number | readonly string[] | undefined
) => boolean | null;

export function Form({
  onSubmit,
  fields,
  buttonLabel,
  setFields,
  buttonProps,
  ...rest
}: FormProps) {
  const handleIsValid = (field: FormField) => {
    if (!field.field.value) return null;
    if (!field.validation) return null;

    for (const validation of field.validation) {
      const isValidateValid = validation.validate?.(field.field.value) ?? true;
      const isPatternValid =
        validation.pattern?.test(field.field.value?.toString() ?? "") ?? true;

      if (!isValidateValid || !isPatternValid) {
        return {
          isValid: false,
          title: validation.message,
        };
      }
    }

    return {
      isValid: true,
    };
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    const newFields = fields.map((field) => {
      if (field.name === name) {
        return {
          ...field,
          field: {
            ...field.field,
            value,
          },
        };
      }
      return field;
    });

    setFields(newFields);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (isDisabled) return;

    const data = fields.reduce((acc, field) => {
      if (field.field.type === "number" && Number(field.field.value)) {
        return {
          ...acc,
          [field.name]: Number(field.field.value),
        };
      }
      return {
        ...acc,
        [field.name]: field.field.value,
      };
    }, {});

    return onSubmit(data, fields, e);
  };

  const isDisabled = useMemo(() => {
    return fields.some((f) => {
      const res = handleIsValid(f);

      if (res?.isValid === true) return false;
      if (!f.field.required && res === null) return false;

      return true;
    });
  }, [fields]);

  return (
    <PrimitiveForm onSubmit={handleSubmit} {...rest}>
      {fields.map(({ name, as, field }, idx) => {
        if (as === "input") {
          return (
            <Input
              key={name}
              name={name}
              value={""}
              {...(field as InputProps)}
              {...handleIsValid(fields[idx])}
              onChange={handleChange}
            />
          );
        }
        return (
          <Textarea
            key={name}
            name={name}
            value={""}
            {...(field as TextareaProps)}
            {...handleIsValid(fields[idx])}
            onChange={handleChange}
          />
        );
      })}
      <Button {...buttonProps} disabled={isDisabled}>
        {buttonLabel || "אישור"}
      </Button>
    </PrimitiveForm>
  );
}
