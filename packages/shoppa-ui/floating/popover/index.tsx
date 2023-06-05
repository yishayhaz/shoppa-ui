import { useFloating, useFloatingFocus, useFloatingHover } from "../core/hook";
import React from "react";
import styles from "./style.module.scss";
import { BaseFloating } from "../core";

export type PopoverProps = {
  children: [React.ReactElement, React.ReactElement];
  label: string | React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function Popover({ children, label, ...rest }: PopoverProps) {
  const { refs, isVisible, setIsVisible } = useFloating({
    placement: "bottom",
    allowedPlacements: ["bottom", "top"],
    offset: 0,
  });
  useFloatingFocus(refs.containerRef, setIsVisible);
  useFloatingHover(refs.containerRef, setIsVisible);

  return (
    <div ref={refs.containerRef} className="d-inline-block">
      {children[0]}
      {isVisible && (
        <BaseFloating className={styles.popover} floatingRef={refs.floatingRef}>
          <div {...rest}>{children[1]}</div>
        </BaseFloating>
      )}
    </div>
  );
}
