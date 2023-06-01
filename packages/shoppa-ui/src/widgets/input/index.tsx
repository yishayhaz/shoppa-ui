import React from "react";
import styles from "./style.module.scss";
import { BaseButton } from "../../primitives/base-button";

export type InputProps = {
  label?: string;
  icon?: React.ReactNode;
  btnIcon?: React.ReactNode;
  btnIconLabel?: string;
  isValid?: InputIsValid;
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onClick">;

export type InputIsValid = true | false | null;

export function Input({
  label,
  title,
  icon,
  btnIcon,
  btnIconLabel,
  className,
  isValid,
  isLoading,
  onClick,
  onKeyDown,
  id,
  ...rest
}: InputProps) {
  const _btnIconLabel = btnIconLabel || label;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) onKeyDown(e);

    if (e.key === "Enter" && btnIcon) {
      ((e.target as HTMLInputElement).nextSibling as HTMLButtonElement).click();
    }
  };

  return (
    <div
      className={`${styles.inputGroup} ${className || ""}`}
      {...(typeof isValid === "boolean" ? { "data-valid": isValid } : {})}
    >
      <label className={styles.inputGroup__label} htmlFor={id} hidden={!label}>
        {rest.required && "* "}
        {label}
      </label>
      <div className={styles.inputGroup__wrraper}>
        <input {...rest} id={id} onKeyDown={handleKeyDown} />
        {btnIcon && (
          <BaseButton
            className={styles.inputGroup__icon}
            aria-label={_btnIconLabel}
            onClick={onClick}
            type="button"
          >
            {/* {isLoading &&
              <Spinner size="16px" color="neutral" />
            } */}
            {!isLoading && btnIcon}
          </BaseButton>
        )}
        {icon && <div className={styles.inputGroup__icon}>{icon}</div>}
      </div>
      {title && <span className={styles.inputGroup__title}>{title}</span>}
    </div>
  );
}
