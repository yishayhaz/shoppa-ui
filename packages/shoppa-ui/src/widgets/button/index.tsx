import React from "react";
import styles from "./style.module.scss";
import { BaseButton, BaseButtonProps } from "../../primitives/base-button";

export type ButtonProps = BaseButtonProps & {
  variant?: ButtonVariants;
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
  ...rest
}: ButtonProps) => {
  return (
    <BaseButton
      {...rest}
      data-variant={variant}
      className={`${className || ""} ${styles.button}`}
    >
      {children}
    </BaseButton>
  );
};
