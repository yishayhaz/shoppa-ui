import React from "react";
import styles from "./style.module.scss";

export type DrawerProps = React.HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  maxWidth?: React.CSSProperties["maxWidth"];
  minWidth?: React.CSSProperties["minWidth"];
};

export function Drawer({
  isOpen,
  className,
  minWidth = "0px",
  maxWidth = "100%",
  style,
  ...rest
}: DrawerProps) {
  const _maxWidth = typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth;
  const _minWidth = typeof minWidth === "number" ? `${minWidth}px` : minWidth;

  return (
    <div
      className={`${styles.drawer} ${className ?? ""}`}
      aria-expanded={isOpen}
      style={
        {
          "--p-max-width": _maxWidth,
          "--p-min-width": _minWidth,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    />
  );
}
