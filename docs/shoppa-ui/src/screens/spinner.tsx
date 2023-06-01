import React from "react";
import { Spinner } from "@shoppa-ui/widgets/spinner";

export function SpinnerScreen() {
  return (
    <div className="d-flex flex-column flex-start gap-20">
      <h1>This is the documentation for the spinner</h1>
      <h2>Small</h2>
      <Spinner size="sm" />
      <h2>Medium</h2>
      <Spinner size="md" />
      <h2>Large</h2>
      <Spinner size="lg" />
      <h2>Colors</h2>
      <div className="d-flex gap-10">
        <Spinner variant="primary" />
        <Spinner variant="success" />
        <Spinner variant="danger" />
        <Spinner variant="warning" />
      </div>
    </div>
  );
}
