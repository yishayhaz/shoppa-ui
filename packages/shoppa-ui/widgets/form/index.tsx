/*
  ! Doesn't support Combobox
  ! Doesn't preserve type onSubmit
*/

import React, { useEffect, useMemo } from "react";
import {
  Form as PrimitiveForm,
  FormProps as PrimitiveFormProps,
} from "../../primitives/form";
import { Input, InputProps } from "../input";
import { Textarea, TextareaProps } from "../textarea";
import { Button, ButtonProps } from "../button";
import { Select, SelectProps } from "../select";
import { AnyObject } from "shoppa-ts";
import { deepClone } from "shoppa-utils/deepClone";

export type FormProps = {
  onSubmit: FormOnSubmit;
  fields: FormFields;
  setFields: React.Dispatch<React.SetStateAction<FormFields>>;
  errors?: FormErrors;
  setErrors?: React.Dispatch<React.SetStateAction<FormErrors>>;
  buttonLabel?: string;
  buttonProps?: Omit<ButtonProps, "link" | "onClick" | "disabled">;
  children?: [React.ReactNode, React.ReactNode];
  initialValues?: FormInitialValues;
  /*
    ! initialValues MUST be a useMemo
  */
  isDisabled?: (internalDisabled: boolean) => boolean | undefined | null;
} & Omit<PrimitiveFormProps, "onSubmit">;

export type FormErrors = { [key: string]: string };

export type FormOnSubmit = (
  data: { [key: string]: FormFieldValue },
  fields: FormFields,
  e: React.FormEvent<HTMLFormElement>
) => void;

export type FormFieldValue =
  | string
  | number
  | readonly string[]
  | undefined
  | null;

export type FormFields = { [key: string]: FormField };

export type FormInitialValues = {
  [key: string]: string | number | undefined | null;
};

export type FormField = {
  as: "input" | "textarea" | "select";
  validation?: FormValidation[];
  nullWhenEmpty?: boolean; // only meant for string fields!
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
  initialValues,
  isDisabled,
  errors,
  setErrors,
  ...rest
}: FormProps) {
  const handleIsValid = (name: string) => {
    const field = fields[name];

    if (!field) return null;

    if (errors && errors[name]) {
      return {
        isValid: false,
        title: errors[name],
      };
    }

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
    const name = e.target.name;
    let value: FormFieldValue = e.target.value;

    const newFields = { ...fields };
    const field = newFields[name];

    if (!field) return;

    if (field.field.type === "number" && value) {
      value = Number(value);
    }

    field.field.value = value;

    setFields(newFields);

    if (errors && errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors?.(newErrors);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (_isDisabled) return;

    const data: AnyObject = {};

    for (const [name, field] of Object.entries(fields)) {
      let value: FormFieldValue = field.field.value;

      // only send changed values
      if (initialValues && initialValues[name] === value) continue;

      if (field.nullWhenEmpty && !value) value = null;

      data[name] = value;
    }

    return onSubmit(data, fields, e);
  };

  useEffect(() => {
    if (!initialValues) return;

    // Sync fields with initialValues
    const newFields = deepClone(fields);

    for (const [name, field] of Object.entries(newFields)) {
      if (name in initialValues) {
        field.field.value = initialValues[name];
      }
    }

    setFields(newFields);
  }, [initialValues]);

  const _isDisabled = useMemo(() => {
    let nothingChanged = Boolean(initialValues);

    for (const [name, field] of Object.entries(fields)) {
      const validation = handleIsValid(name);

      if (initialValues && field.field.value !== initialValues[name]) {
        nothingChanged = false;
      }

      const didNotPassValidation =
        validation !== null && validation.isValid === false;

      const hasValue = field.field.value !== "" && "value" in field.field;

      const isRequiredAndEmpty = field.field.required && !hasValue;

      const shouldDisable = didNotPassValidation || isRequiredAndEmpty;

      if (shouldDisable) return isDisabled?.(true) ?? true;
    }

    // if nothing changed, disable submit
    return isDisabled?.(nothingChanged) ?? nothingChanged;
  }, [fields, initialValues, isDisabled]);

  return (
    <PrimitiveForm onSubmit={handleSubmit} {...rest}>
      {children?.[0]}
      {Object.entries(fields).map(([name, { as, field }], idx) => {
        if (as === "select") {
          console.log(name, handleIsValid(name), errors);
          return (
            <Select
              key={idx}
              name={name}
              value={""}
              {...(field as SelectProps)}
              {...handleIsValid(name)}
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
              {...handleIsValid(name)}
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
            {...handleIsValid(name)}
            onChange={handleChange}
          />
        );
      })}
      {children?.[1]}
      <Button {...buttonProps} disabled={_isDisabled}>
        {buttonLabel || "אישור"}
      </Button>
    </PrimitiveForm>
  );
}
