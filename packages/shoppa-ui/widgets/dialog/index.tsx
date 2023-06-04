import React from "react";
import { Popup, PopopProps } from "../../primitives/popup";
import { Button } from "../button";
import styles from "./styles.module.scss";

export type DialogProps = {
  icon?: React.ReactNode;
  text: React.ReactNode;
  isDanger?: boolean;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
} & PopopProps;

export function Dialog({
  icon,
  text,
  isDanger,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  ...rest
}: DialogProps) {
  return (
    <Popup outerCloseBtn {...rest} className={styles.dialog}>
      <div
        className={styles.dialog__content}
        {...(isDanger && { "data-danger": true })}
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
            variant={isDanger ? "danger" : "primary"}
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
