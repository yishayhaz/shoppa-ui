import React from "react";
import { BaseInput, BaseInputProps } from "../../primitives/base-input";

export type SelectProps = Omit<
  BaseInputProps,
  "icon" | "btnIcon" | "btnIconLabel" | "isLoading" | "onClick"
> &
  React.HTMLAttributes<HTMLSelectElement>;

export function Select({
  label,
  title,
  className,
  isValid,
  disabled,
  required,
  id,
  children,
  ...rest
}: SelectProps) {
  return (
    <BaseInput
      label={label}
      title={title}
      className={className}
      isValid={isValid}
      disabled={disabled}
      required={required}
      id={id}
    >
      <select
        id={id}
        required={required}
        disabled={disabled}
        style={{
          borderInlineEnd: "0.75rem solid transparent",
        }}
        {...rest}
      >
        {children}
      </select>
    </BaseInput>
  );
}
