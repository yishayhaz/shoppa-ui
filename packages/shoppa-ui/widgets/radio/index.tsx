import React from "react";

export type RadioProps = {
  label?: string | React.ReactNode;
  variant?: RadioVariant;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

export type RadioVariant =
  | "primary"
  | "neutral"
  | "success"
  | "danger"
  | "warning";

export function Radio({ label, id, variant, ...rest }: RadioProps) {
  const pAccent = React.useMemo(() => {
    const _variant = variant === "neutral" ? "s-neutral-900" : variant;
    return `rgba(var(--${_variant}, var(--primary)))`;
  }, [variant]);

  return (
    <div className="d-flex justify-content-start gap-10 w-100">
      <input
        {...rest}
        type="radio"
        id={id}
        style={{
          accentColor: pAccent,
        }}
      />
      {Boolean(label) && (
        <label htmlFor={id} className="fs-xs">
          {label}
        </label>
      )}
    </div>
  );
}
