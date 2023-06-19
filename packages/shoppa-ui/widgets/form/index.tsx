/*
  ! Doesn't support Combobox
  ! Doesn't preserve type onSubmit
*/

import React, { useMemo } from "react";
import {
  Form as PrimitiveForm,
  FormProps as PrimitiveFormProps,
} from "../../primitives/form";
import { Input, InputProps } from "../input";
import { Textarea, TextareaProps } from "../textarea";
import { Button, ButtonProps } from "../button";
import { Select, SelectProps } from "../select";
import { AnyObject } from "shoppa-ts";

export type FormProps = {
  onSubmit: FormOnSubmit;
  fields: FormFields;
  setFields: React.Dispatch<React.SetStateAction<FormFields>>;
  buttonLabel?: string;
  buttonProps?: Omit<ButtonProps, "link" | "onClick" | "disabled">;
  children?: [React.ReactNode, React.ReactNode];
} & Omit<PrimitiveFormProps, "onSubmit">;

export type FormOnSubmit = (
  data: { [key: string]: string | number },
  fields: FormFields,
  e: React.FormEvent<HTMLFormElement>
) => void;

export type FormFields = { [key: string]: FormField };

export type FormField = {
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

    const newFields = { ...fields };
    const field = newFields[name];

    if (!field) return;

    field.field.value = value;

    setFields(newFields);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (isDisabled) return;

    const data: AnyObject = {};

    for (const [name, field] of Object.entries(fields)) {
      let value = field.field.value;

      if (
        field.as === "input" &&
        field.field.type === "number" &&
        Number(value)
      ) {
        value = Number(value);
      }

      data[name] = value;
    }

    return onSubmit(data, fields, e);
  };

  const isDisabled = useMemo(() => {
    for (const [_, field] of Object.entries(fields)) {
      const validation = handleIsValid(field);

      if (validation !== null && validation.isValid === false) return true;
      if (field.field.required && !field.field.value) return true;
    }

    return false;
  }, [fields]);

  return (
    <PrimitiveForm onSubmit={handleSubmit} {...rest}>
      {children?.[0]}
      {Object.entries(fields).map(([name, { as, field }], idx) => {
        if (as === "select") {
          field as FormFieldSelect;
          return (
            <Select
              key={idx}
              name={name}
              value={""}
              {...(field as SelectProps)}
              {...handleIsValid(fields[name])}
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
              key={idx}
              name={name}
              value={""}
              {...(field as InputProps)}
              {...handleIsValid(fields[name])}
              onChange={handleChange}
            />
          );
        }
        return (
          <Textarea
            key={idx}
            name={name}
            value={""}
            {...(field as TextareaProps)}
            {...handleIsValid(fields[name])}
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
