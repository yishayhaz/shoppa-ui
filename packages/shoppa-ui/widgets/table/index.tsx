import React from "react";
import styles from "./style.module.scss";
import { BaseButton } from "../../primitives/base-button";

export type TableProps = React.HTMLAttributes<HTMLTableElement>;

export function Table({ className, ...rest }: TableProps) {
  return (
    <div className={`${styles.table__wrraper} ${className || ""}`}>
      <table cellPadding={0} cellSpacing={0} {...rest} />
    </div>
  );
}

export type HeadCellProps = {
  sortDir: 1 | -1 | 0;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
} & Omit<React.HTMLAttributes<HTMLTableCellElement>, "onClick">;

export function HeadCell({
  className,
  children,
  sortDir,
  onClick,
  ...rest
}: HeadCellProps) {
  return (
    <th
      className={`${styles.table__headCell} ${className || ""}`}
      {...rest}
      {...(sortDir && {
        "aria-sort": sortDir === 1 ? "ascending" : "descending",
      })}
    >
      <BaseButton onClick={onClick}>
        {children}
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          version="1.2"
          baseProfile="tiny"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.707 13.293c-.391-.391-1.023-.391-1.414 0l-2.293 2.293v-7.586c0-.552-.447-1-1-1s-1 .448-1 1v7.586l-2.293-2.293c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l4.707 4.707 4.707-4.707c.391-.391.391-1.023 0-1.414z"></path>
        </svg>
      </BaseButton>
    </th>
  );
}
