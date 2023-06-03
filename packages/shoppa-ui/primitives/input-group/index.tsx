import React from "react";
import styles from "./style.module.scss";
import { BaseButton } from "../base-button";
import { Spinner } from "../../widgets/spinner";

export type InputGroupProps = {
  icon?: React.ReactNode;
  btnIcon?: React.ReactNode;
  btnIconLabel?: string;
  label?: string;
  title?: string;
  id?: string;
  className?: string;
  disabled?: boolean;
  isValid?: InputIsValid;
  children?: React.ReactNode;
  required?: boolean;
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export type InputIsValid = true | false | null;

export function InputGroup({
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
  id,
  children,
  ...rest
}: InputGroupProps) {
  const _btnIconLabel = btnIconLabel || label;

  return (
    <div
      className={`${styles.inputGroup} ${className || ""}`}
      {...(typeof isValid === "boolean" && { "data-valid": isValid })}
    >
      <label className={styles.inputGroup__label} htmlFor={id} hidden={!label}>
        {rest.required && "* "}
        {label}
      </label>
      <div
        className={styles.inputGroup__wrraper}
        {...(disabled && { "aria-disabled": true })}
      >
        {children}
        {btnIcon && (
          <BaseButton
            className={styles.inputGroup__icon}
            aria-label={_btnIconLabel}
            onClick={onClick}
            type="button"
            {...(disabled && { disabled })}
          >
            {isLoading && <Spinner size="sm" variant="neutral" />}
            {!isLoading && btnIcon}
          </BaseButton>
        )}
        {icon && <div className={styles.inputGroup__icon}>{icon}</div>}
      </div>
      {title && <span className={styles.inputGroup__title}>{title}</span>}
    </div>
  );
}
