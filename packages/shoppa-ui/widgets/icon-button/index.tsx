import { BaseButton, BaseButtonProps } from "../../primitives/base-button";
import styles from "./style.module.scss";

export type IconButtonProps = BaseButtonProps & {
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  label: string;
  square?: boolean;
};

export type IconButtonVariant =
  | "primary"
  | "neutral"
  | "success"
  | "danger"
  | "warning"
  | "link";

export type IconButtonSize = "sm" | "md" | "lg";

export function IconButton({
  children,
  className,
  label,
  size = "md",
  variant = "primary",
  square = false,
  ...rest
}: IconButtonProps) {
  return (
    <BaseButton
      type="button"
      {...rest}
      className={`${styles.iconButton} ${className || ""}`}
      {...(label && { "aria-label": label })}
      {...(square && { "data-square": true })}
      {...(variant === "link" && { "data-link": true })}
      data-size={size}
      data-variant={variant === "link" ? "neutral" : variant}
    >
      {children}
    </BaseButton>
  );
}
