import React from "react";
import { Spinner, SpinnerProps } from ".";

export type LoadingScreenProps = {
  spinnerProps?: SpinnerProps;
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
} & React.HTMLAttributes<HTMLDivElement>;

export function LoadingScreen({
  spinnerProps,
  width = "100%",
  height = "100%",
  className,
  style,
  ...rest
}: LoadingScreenProps) {
  const _width = typeof width === "number" ? `${width}px` : width;
  const _height = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      {...rest}
      className={`d-flex ${className}`}
      style={{
        width: _width,
        height: _height,
        ...style,
      }}
    >
      <Spinner {...spinnerProps} />
    </div>
  );
}
