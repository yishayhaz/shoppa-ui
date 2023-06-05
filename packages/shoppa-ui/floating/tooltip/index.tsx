import { useFloating, useFloatingHover } from "../core/hook";
import { BaseFloating } from "../core";
import React from "react";
import styles from "./style.module.scss";

export type TooltipProps = {
  children: React.ReactNode;
  label: string | React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function Tooltip({ children, label, className, ...rest }: TooltipProps) {
  const { refs, isVisible, setIsVisible } = useFloating({
    placement: "bottom",
    allowedPlacements: ["bottom", "top"],
    offset: 0,
  });
  useFloatingHover(refs.containerRef, setIsVisible);

  return (
    <div
      ref={refs.containerRef}
      {...rest}
      className={`${styles.tooltip} ${className || ""}`}
    >
      {children}
      {isVisible && (
        <BaseFloating
          className={styles.floating}
          floatingRef={refs.floatingRef}
          width="max-content"
        >
          <div>{label}</div>
        </BaseFloating>
      )}
    </div>
  );
}
