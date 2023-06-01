import React from "react";
import styles from "./style.module.scss";
import { BaseButton, BaseButtonProps } from "../../primitives/base-button";

export type ButtonProps = BaseButtonProps & {
  variant?: ButtonVariants;
  autoWidth?: boolean;
};

export type ButtonVariants =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning";

export const Button = ({
  className,
  variant = "primary",
  children,
  autoWidth,
  ...rest
}: ButtonProps) => {
  return (
    <BaseButton
      {...rest}
      data-variant={variant}
      data-auto-width={autoWidth}
      className={`${className || ""} ${styles.button}`}
    >
      {children}
    </BaseButton>
  );
};
