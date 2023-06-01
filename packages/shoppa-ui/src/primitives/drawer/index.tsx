import React from "react";
import styles from "./style.module.scss";

export type DrawerProps = React.HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  maxWidth?: React.CSSProperties["maxWidth"];
};

export function Drawer({
  isOpen,
  className,
  maxWidth = "100%",
  style,
  ...rest
}: DrawerProps) {
  const _maxWidth = typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth;
  return (
    <div
      className={`${styles.drawer} ${className ?? ""}`}
      data-open={isOpen}
      style={{ "--p-max-width": _maxWidth, ...style } as React.CSSProperties}
      {...rest}
    />
  );
}
