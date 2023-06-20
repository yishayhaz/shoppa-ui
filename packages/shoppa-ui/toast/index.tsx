import React from "react";
import ReactDOMServer from "react-dom/server";
import { BaseButton } from "../primitives/base-button";
import styles from "./style.module.scss";

export type ToastHTML = string | React.ReactElement;

let timeout: NodeJS.Timeout;

const _removeToast = () => {
  const ref = document.querySelector("body > #shoppa-toast");
  if (!ref) return;
  ref.innerHTML = "";
};

const _inject = (html: ToastHTML) => {
  const ref = document.querySelector("body > #shoppa-toast");

  if (!ref) {
    console.error(
      '❗ In order to use the toast component, you must add <div id="shoppa-toast" /> tag under the body 🚀'
    );
    return;
  }

  if (React.isValidElement(html)) {
    html = ReactDOMServer.renderToStaticMarkup(html);
  } else if (typeof html !== "string" || !html) {
    console.error(
      "❗ Invalid toast content.\ncontent must be a string or a react element 🚀"
    );
    return;
  }

  ref.innerHTML = html;

  ref.querySelector("button")?.removeEventListener("click", _removeToast);
  ref.querySelector("button")?.addEventListener("click", _removeToast);
};

export const toast = (
  type: "primary" | "danger" | "warning",
  message: string,
  icon: React.ReactElement = <></>,
  t = 3000
) => {
  const __p_color = `rgba(var(--${type}))`;

  if (timeout) {
    clearTimeout(timeout);
  }

  _inject(
    <div
      className={styles.toast}
      style={
        {
          "--p-color": __p_color,
          "--p-delay": `${t - Math.min(500, t / 10)}ms`,
          "--p-time": `${Math.min(500, t / 10)}ms`,
        } as React.CSSProperties
      }
    >
      {icon && <div>{icon}</div>}
      <p>{message}</p>
      <BaseButton className="toast__close">
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
    </div>
  );

  timeout = setTimeout(_removeToast, t);
};
