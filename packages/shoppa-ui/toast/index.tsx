import React from "react";
import ReactDOMServer from "react-dom/server";
import styles from "./style.module.scss";
import { IconButton } from "../widgets/icon-button";

export type ToastHTML = string | React.ReactElement;

let timeout: ReturnType<typeof setTimeout>;

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
  icon?: React.ReactElement,
  t = 3000
) => {
  const __p_color = `rgba(var(--s-neutral-${type == "warning" ? "9" : "1"}00))`;
  const __p_bg = `rgba(var(--${type}))`;

  icon ??= icons[type];

  _inject(
    <div
      className={styles.toast}
      style={
        {
          "--p-color": __p_color,
          "--p-bg": __p_bg,
          "--p-delay": `${t - Math.min(500, t / 10)}ms`,
          "--p-time": `${Math.min(500, t / 10)}ms`,
        } as React.CSSProperties
      }
    >
      {icon && <div>{icon}</div>}
      <p>{message}</p>
      <IconButton
        label="dismiss"
        size="sm"
        variant="link"
        className="toast__close"
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
      </IconButton>
    </div>
  );

  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(_removeToast, t);
};

const icons = {
  primary: (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  ),
  danger: (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.493 2 11.953 2zM12 20c-4.411 0-8-3.589-8-8s3.567-8 7.953-8C16.391 4 20 7.589 20 12s-3.589 8-8 8z"></path>
      <path d="M11 7h2v7h-2zm0 8h2v2h-2z"></path>
    </svg>
  ),
  warning: (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Warning">
        <g>
          <g>
            <path d="M12.5,8.752a.5.5,0,0,0-1,0h0v6a.5.5,0,0,0,1,0Z"></path>
            <circle cx="11.999" cy="16.736" r="0.5"></circle>
          </g>
          <path d="M18.642,20.934H5.385A2.5,2.5,0,0,1,3.163,17.29L9.792,4.421a2.5,2.5,0,0,1,4.444,0L20.865,17.29a2.5,2.5,0,0,1-2.223,3.644ZM12.014,4.065a1.478,1.478,0,0,0-1.334.814L4.052,17.748a1.5,1.5,0,0,0,1.333,2.186H18.642a1.5,1.5,0,0,0,1.334-2.186L13.348,4.879A1.478,1.478,0,0,0,12.014,4.065Z"></path>
        </g>
      </g>
    </svg>
  ),
};
