import React from "react";
import { InputGroup, InputGroupProps } from "../../primitives/input-group";

export type InputProps = Omit<
  InputGroupProps,
  "icon" | "btnIcon" | "btnIconLabel" | "isLoading" | "onClick"
> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    resize?: React.CSSProperties["resize"];
  };

export function Textarea({
  label,
  title,
  className,
  isValid,
  disabled,
  required,
  id,
  resize,
  ...rest
}: InputProps) {
  return (
    <InputGroup
      label={label}
      title={title}
      className={className}
      isValid={isValid}
      disabled={disabled}
      required={required}
      id={id}
    >
      <textarea
        style={{
          resize: resize || "vertical",
        }}
        {...rest}
        {...(disabled && { disabled })}
        {...(required && { required })}
        {...(title && { title })}
        id={id}
      />
    </InputGroup>
  );
}
