import React from "react";
import styles from "./style.module.scss";

export type SpinnerProps = {
  size?: SpinnerSize;
  variant?: "neutral" | "primary" | "success" | "danger" | "warning";
};

export type SpinnerSize = "sm" | "md" | "lg";

const mapSizeToPx = {
  sm: "25px",
  md: "50px",
  lg: "75px",
};

export function Spinner({ size = "md", variant = "neutral" }: SpinnerProps) {
  return (
    <div
      className={styles.Spinner}
      data-variant={variant}
      style={
        {
          "--size": mapSizeToPx[size],
        } as React.CSSProperties
      }
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
