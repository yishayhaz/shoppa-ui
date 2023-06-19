import React, { useMemo } from "react";
import {
  Form as PrimitiveForm,
  FormProps as PrimitiveFormProps,
} from "../../primitives/form";
import { Input, InputProps } from "../input";
import { Textarea, TextareaProps } from "../textarea";
import { Button, ButtonProps } from "../button";
import { Select, SelectProps } from "../select";

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
  children?: [React.ReactNode, React.ReactNode];
} & PrimitiveFormProps;

export type FormField = {
  name: string;
  as: "input" | "textarea" | "select";
  validation?: FormValidation[];
  field: Omit<
    InputProps,
    "onChange" | "pattern" | "name" | "onClick" | "isValid"
  > &
    Omit<
      TextareaProps,
      "onChange" | "pattern" | "name" | "onClick" | "isValid"
    > &
    FormFieldSelect;
};

export type FormFieldSelect = Omit<
  SelectProps,
  "onChange" | "pattern" | "name" | "onClick" | "isValid" | "children"
> & {
  options?: {
    label: string;
    value: string | number;
    disabled?: boolean;
    isDefault?: boolean;
  }[];
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
  children,
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
      {children?.[0]}
      {fields.map(({ name, as, field }, idx) => {
        if (as === "select") {
          field as FormFieldSelect;
          return (
            <Select
              key={name}
              name={name}
              value={""}
              {...(field as SelectProps)}
              {...handleIsValid(fields[idx])}
              onChange={handleChange}
            >
              {field.options?.map((option, idx) => {
                return (
                  <option
                    key={idx}
                    disabled={
                      option.disabled ??
                      Boolean(option.isDefault && field.value)
                    }
                    value={option.value}
                  >
                    {option.label}
                  </option>
                );
              })}
            </Select>
          );
        }
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
      {children?.[1]}
      <Button {...buttonProps} disabled={isDisabled}>
        {buttonLabel || "אישור"}
      </Button>
    </PrimitiveForm>
  );
}
