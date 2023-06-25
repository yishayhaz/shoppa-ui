import React, { useMemo } from "react";
import styles from "./style.module.scss";

export type AlertProps<T> = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "title"
> & {
  variant?: AlertVariant;
  size?: AlertSize;
  children?: T extends React.ReactNode ? T : never;
  /**
   * Note: if you pass `children`, `title` and `description` will be ignored
   */
  title?: T extends string ? T : never;
  description?: T extends string ? T : never;
  icon?: React.ReactNode;
};

export type AlertVariant =
  | "neutral"
  | "primary"
  | "success"
  | "danger"
  | "warning";

export type AlertSize = "sm" | "md" | "lg";

export function Alert<T>({
  variant = "neutral",
  size = "md",
  icon,
  title,
  description,
  children,
  ...rest
}: AlertProps<T>) {
  const props = useMemo(() => {
    return {
      style: {
        ...rest.style,
        "--p-accent": `var(--${variant})`,
      },
      "data-size": size,
      className: `${styles.alert} ${rest.className || ""}`,
    };
  }, [variant, size, rest]);

  return (
    <div {...props}>
      {children ? (
        children
      ) : (
        <>
          <span className={styles.alert__title}>
            {icon} {title}
          </span>
          <p className={styles.alert__description}>{description}</p>
        </>
      )}
    </div>
  );
}
