import React from "react";
import styles from "./style.module.scss";

export type BannerProps = {
  src: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function Banner({ src, className, style, ...rest }: BannerProps) {
  return (
    <div
      {...rest}
      className={`${styles.banner} ${className || ""}`}
      style={
        {
          "--p-src": `url(${src})`,
          ...style,
        } as React.CSSProperties
      }
    />
  );
}
