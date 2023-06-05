import React from "react";

export type BaseFloatingProps = {
  width?: React.CSSProperties["width"];
  position?: "fixed" | "absolute";
  floatingRef: React.MutableRefObject<HTMLDivElement | null>;
} & React.HTMLAttributes<HTMLDivElement>;

export function BaseFloating({
  width,
  position = "fixed",
  children,
  floatingRef,
  style,
  ...rest
}: BaseFloatingProps) {
  return (
    <div style={{ ...style, width, position }} ref={floatingRef} {...rest}>
      {children}
    </div>
  );
}
