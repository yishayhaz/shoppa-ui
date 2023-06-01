import React from "react";
import { BaseButton, BaseButtonProps } from "../../primitives/base-button";
import styles from "./style.module.scss";

export type IconButtonProps = BaseButtonProps & {
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  label: string;
  invert?: boolean;
};

export type IconButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning";

export type IconButtonSize = "sm" | "md" | "lg";

export function IconButton({
  children,
  className,
  label,
  size = "md",
  variant = "primary",
  invert = false,
  ...rest
}: IconButtonProps) {
  return (
    <BaseButton
      {...rest}
      className={`${styles.iconButton} ${className || ""}`}
      aria-label={label}
      data-variant={variant}
      data-size={size}
      data-invert={invert}
    >
      {children}
    </BaseButton>
  );
}
