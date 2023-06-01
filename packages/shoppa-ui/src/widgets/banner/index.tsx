import React from "react";
import styles from "./style.module.scss";

export type BannerProps = {
  src: string;
  alt: string;
  title?: string;
  children: React.ReactElement;
  priority?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export function Banner({
  children,
  src,
  alt,
  title = alt,
  className,
  priority = true,
  ...rest
}: BannerProps) {
  return (
    <div {...rest} className={`${styles.banner} ${className || ""}`}>
      <div className={styles.banner__content}>{children}</div>
    </div>
  );
}
