import React from "react";

export type FormProps = React.HTMLAttributes<HTMLFormElement>;

export function Form({ onSubmit, ...rest }: FormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(e);
      }}
      {...rest}
    />
  );
}
