import React, { useMemo } from "react";
import { Popup, PopopProps } from "../../primitives/popup";
import { Button } from "../button";
import styles from "./styles.module.scss";

export type DialogProps = {
  icon?: React.ReactNode;
  text: React.ReactNode;
  variant?: DialogVariant;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
} & PopopProps;

export type DialogVariant =
  | "primary"
  | "danger"
  | "warning"
  | "success"
  | "neutral";

export function Dialog({
  icon,
  text,
  variant = "danger",
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  ...rest
}: DialogProps) {
  const _p_color = useMemo(() => {
    return `rgb(var(--${variant}))`;
  }, [variant]);

  return (
    <Popup outerCloseBtn {...rest} className={styles.dialog}>
      <div
        className={styles.dialog__content}
        style={
          {
            "--p-color": _p_color,
          } as React.CSSProperties
        }
      >
        {icon} <p>{text}</p>
        <div className="d-flex gap-6">
          <Button
            variant="link"
            onClick={() => {
              onCancel?.();
              rest.onHide?.();
            }}
          >
            {cancelText ?? "ביטול"}
          </Button>
          <Button
            variant={variant}
            onClick={() => {
              onConfirm?.();
              rest.onHide?.();
            }}
          >
            {confirmText ?? "אישור"}
          </Button>
        </div>
      </div>
    </Popup>
  );
}
