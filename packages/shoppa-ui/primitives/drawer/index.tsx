import React, { useCallback, useEffect } from "react";
import styles from "./style.module.scss";

export type DrawerProps = React.HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  strategy?: "absolute" | "relative";
  maxWidth?: React.CSSProperties["maxWidth"];
  minWidth?: React.CSSProperties["minWidth"];
};

export function Drawer({
  isOpen,
  setIsOpen,
  strategy = "relative",
  className,
  minWidth = "0px",
  maxWidth = "100%",
  style,
  ...rest
}: DrawerProps) {
  const _maxWidth = typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth;
  const _minWidth = typeof minWidth === "number" ? `${minWidth}px` : minWidth;

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (!isOpen || strategy === "relative" || !setIsOpen) return;

      const target = e.target as HTMLElement;
      const drawer = document.querySelector(`.${styles.drawer}`) as HTMLElement;

      if (
        drawer.contains(target) ||
        target.matches("[data-drawer-target=true]")
      )
        return;

      setIsOpen(false);
    },
    [isOpen, setIsOpen, strategy]
  );

  useEffect(() => {
    if (strategy === "relative" || !setIsOpen) return;

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick, strategy, setIsOpen]);

  return (
    <div
      className={`${styles.drawer} ${className ?? ""}`}
      aria-expanded={isOpen}
      data-strategy={strategy}
      style={
        {
          "--p-max-width": _maxWidth,
          "--p-min-width": _minWidth,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    />
  );
}
