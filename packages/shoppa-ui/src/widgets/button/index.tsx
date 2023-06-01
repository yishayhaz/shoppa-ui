import React from "react";
import styles from "./style.module.scss";
import { BaseButton, BaseButtonProps } from "../../primitives/base-button";

export type ButtonProps = BaseButtonProps & {
  variant?: ButtonVariants;
  autoWidth?: boolean;
  asLink?: boolean;
};

export type ButtonVariants =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "link";

export const Button = ({
  className,
  variant = "primary",
  children,
  autoWidth,
  asLink,
  ...rest
}: ButtonProps) => {
  return (
    <BaseButton
      {...rest}
      data-variant={variant}
      {...(autoWidth && { "data-auto-width": true })}
      {...(asLink && { "data-link": true })}
      className={`${className || ""} ${styles.button}`}
    >
      {children}
    </BaseButton>
  );
};
