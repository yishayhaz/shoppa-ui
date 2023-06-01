import React from "react";
import styles from "./style.module.scss";

export type DrawerProps = React.HTMLAttributes<HTMLDivElement> & {
  isOpen?: boolean;
};

export function Drawer({ isOpen, className, children, ...rest }: DrawerProps) {
  return (
    <div
      className={`${styles.drawer} ${className ?? ""}`}
      data-open={isOpen}
      {...rest}
    >
      {children}
    </div>
  );
}
