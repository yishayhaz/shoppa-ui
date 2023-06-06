import React from "react";
import styles from "./style.module.scss";

export type BadgeProps = {
  /** The content of the badge. */
  title: string | number;
  /** The color of the badge. */
  variant?: BadgeVariants;
  /** Add custom className to the badge */
  className?: string;
  /** The size of the badge. */
  size?: BadgeSizes;
  /** The roundness of the badge. */
  roundness?: BadgeRoudness;
};

export type BadgeSizes = "sm" | "md" | "lg";

export type BadgeRoudness = "sm" | "md" | "lg";

export type BadgeVariants =
  | "primary"
  | "neutral"
  | "success"
  | "danger"
  | "warning";

export function Badge({
  title,
  size = "md",
  className,
  roundness = "md",
  variant = "primary",
}: BadgeProps) {
  return (
    <div
      className={`${styles.badge} ${className || ""} ${
        roundness === "md" ? "rounded" : `rounded-${roundness}`
      }`}
      data-size={size}
      data-variant={variant}
    >
      <span>{title}</span>
    </div>
  );
}
