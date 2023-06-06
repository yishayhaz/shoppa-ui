import styles from "./style.module.scss";
import { BaseButton, BaseButtonProps } from "../../primitives/base-button";
import { Spinner, SpinnerProps } from "../spinner";

export type ButtonProps = BaseButtonProps & {
  variant?: ButtonVariants;
  autoWidth?: boolean;
  isLoading?: boolean;
  spinnerProps?: Omit<SpinnerProps, "size">;
};

export type ButtonVariants =
  | "primary"
  | "neutral"
  | "success"
  | "danger"
  | "warning"
  | "link";

export const Button = ({
  className,
  variant = "primary",
  children,
  autoWidth,
  isLoading,
  spinnerProps,
  ...rest
}: ButtonProps) => {
  return (
    <BaseButton
      {...rest}
      data-variant={variant === "link" ? "neutral" : variant}
      {...(autoWidth && { "data-auto-width": true })}
      {...(variant === "link" && { "data-link": true })}
      className={`${className || ""} ${styles.button}`}
    >
      {isLoading ? <Spinner size="inline" {...spinnerProps} /> : children}
    </BaseButton>
  );
};
