import React from "react";
import styles from "./style.module.scss";

export type BaseCardProps = React.HTMLAttributes<HTMLDivElement>;

export function BaseCard({ className, ...rest }: BaseCardProps) {
  return <div className={`${className} ${styles.baseCard}`} {...rest} />;
}
