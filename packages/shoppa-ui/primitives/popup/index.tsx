import React, { useEffect, useRef } from "react";
import styles from "./style.module.scss";
import { BaseButton } from "../base-button";

export type PopupProps = {
  show: boolean;
  onHide: () => void;

  children?: React.ReactNode;

  width?: string | number;
  height?: string | number;
  className?: string;

  outerCloseBtn?: boolean;
  noCloseBtn?: boolean;
  closeButtonClassName?: string;

  noPadding?: boolean;
  noAnimation?: boolean;
  noOutline?: boolean;
  closeDelay?: number;

  style?: React.CSSProperties;
};

const DEFAULT_CLOSING_DELAY = 200;

export function Popup({
  children,
  show,
  onHide,
  outerCloseBtn,
  closeButtonClassName,
  noCloseBtn,
  noPadding,
  noOutline,
  noAnimation,
  width,
  height,
  closeDelay = DEFAULT_CLOSING_DELAY,
  ...rest
}: PopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  const startClosing = React.useCallback(() => {
    if (!popupRef.current) return;

    popupRef.current.setAttribute("aria-expanded", "false");

    const t = setTimeout(() => {
      onHide();

      if (!popupRef.current) return;

      popupRef.current.hidden = true;
      popupRef.current.setAttribute("aria-expanded", "true");
    }, closeDelay);

    return () => {
      clearTimeout(t);
    };
  }, [closeDelay, onHide]);

  const close = () => {
    document.body.style.overflow = "unset";
  };

  const open = () => {
    if (!popupRef.current) return;

    document.body.style.overflow = "hidden";
    popupRef.current.hidden = false;

    (popupRef.current.children[0] as HTMLElement).focus();
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      startClosing();
    }
  };

  useEffect(() => {
    if (show) {
      open();
    } else {
      startClosing();
    }

    return close;
  }, [show, startClosing]);

  if (!show) return null;
  return (
    <div
      {...rest}
      onClick={handleContainerClick}
      className={`${styles.popup} ${rest.className || ""}  ${
        noAnimation ? "" : styles.animate
      }`}
      aria-expanded="true"
      ref={popupRef}
    >
      <div
        className={`${styles.popup__card} ${
          noPadding ? "" : styles.popup__cardPadding
        }  ${noOutline ? "" : styles.popup__cardOutline}`}
        style={{ width, height, ...rest.style }}
      >
        {noCloseBtn ? null : (
          <BaseButton
            className={`${styles.popup__card__close} ${
              closeButtonClassName || ""
            }`}
            data-outside={outerCloseBtn}
            onClick={startClosing}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
            </svg>
          </BaseButton>
        )}

        {children}
      </div>
    </div>
  );
}
