import React from "react";
import styles from "./style.module.scss";

export type BaseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function BaseButton({ className, children, ...rest }: BaseButtonProps) {
  return (
    <button className={`${styles.baseButton} ${className || ""}`} {...rest}>
      {children}
    </button>
  );
}
