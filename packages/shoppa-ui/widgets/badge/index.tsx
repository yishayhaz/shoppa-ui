import React from "react";
import styles from "./style.module.scss";

export type BadgeProps = {
  variant?: BadgeVariants;
  className?: string;
  size?: BadgeSize;
} & React.HTMLAttributes<HTMLDivElement>;

export type BadgeVariants =
  | "primary"
  | "success"
  | "danger"
  | "warning"
  | "neutral";

export type BadgeSize = "sm" | "md" | "lg";

export function Badge({
  children,
  variant = "neutral",
  size = "md",
  className,
  ...rest
}: BadgeProps) {
  return (
    <div
      data-variant={variant}
      data-size={size}
      className={`${styles.badge} ${className || ""}`}
      {...rest}
    >
      <span>{children}</span>
    </div>
  );
}
