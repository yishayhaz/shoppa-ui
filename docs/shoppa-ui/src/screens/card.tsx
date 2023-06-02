import React from "react";
import { BaseCard } from "@shoppa-ui/primitives/base-card";

export function CardScreen() {
  return (
    <div className="d-flex flex-column flex-start gap-10">
      <h1>This is the documentation for the Card</h1>
      <h2>Base Card</h2>
      <BaseCard>Hello World</BaseCard>
    </div>
  );
}
