import React from "react";
import styles from "./style.module.scss";

export type TableProps = React.HTMLAttributes<HTMLTableElement>;

export function Table({ className, ...rest }: TableProps) {
  return (
    <div className={`${styles.table__wrraper} ${className || ""}`}>
      <table cellPadding={0} cellSpacing={0} {...rest} />
    </div>
  );
}
