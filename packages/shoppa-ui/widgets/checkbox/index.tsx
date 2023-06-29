import React from "react";
import styles from "./style.module.scss";

export type CheckboxProps = {
  onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;

  label?: string | React.ReactNode;
  variant?: CheckboxVariant;

  id?: string;
  name?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export type CheckboxVariant =
  | "primary"
  | "neutral"
  | "success"
  | "danger"
  | "warning"
  | "dark";

export function Checkbox({
  label,
  name,
  onChange,
  checked,
  variant = "primary",
  className,
  ...rest
}: CheckboxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked, e);
    }
  };

  const pAccent = React.useMemo(() => {
    const _variant = variant === "neutral" ? "s-neutral-900" : variant;

    return `rgba(var(--${_variant}, var(--primary)))`;
  }, [variant]);

  return (
    <div
      className={`${styles.checkbox} ${className || ""}`}
      data-variant={variant}
      style={
        {
          "--p-accent": pAccent,
        } as React.CSSProperties
      }
    >
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={handleChange}
        {...rest}
      />
      <svg
        className={styles.icon}
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 16 16"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"></path>
      </svg>
      {Boolean(label) && <label htmlFor={rest.id}>{label}</label>}
    </div>
  );
}
