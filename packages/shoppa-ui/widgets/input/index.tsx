import React from "react";
import { InputGroup, InputGroupProps } from "../../primitives/input-group";

export type InputProps = InputGroupProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "onClick">;

export function Input({
  label,
  title,
  icon,
  btnIcon,
  btnIconLabel,
  className,
  isValid,
  isLoading,
  disabled,
  onClick,
  onKeyDown,
  required,
  id,
  ...rest
}: InputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) onKeyDown(e);

    if (e.key === "Enter" && btnIcon) {
      ((e.target as HTMLInputElement).nextSibling as HTMLButtonElement).click();
    }
  };

  return (
    <InputGroup
      icon={icon}
      btnIcon={btnIcon}
      btnIconLabel={btnIconLabel}
      label={label}
      title={title}
      id={id}
      isValid={isValid}
      disabled={disabled}
      className={className}
      required={required}
      isLoading={isLoading}
      onClick={onClick}
    >
      <input
        {...rest}
        {...(disabled && { disabled: true })}
        {...(required && { required: true })}
        {...(title && { title })}
        id={id}
        onKeyDown={handleKeyDown}
      />
    </InputGroup>
  );
}
