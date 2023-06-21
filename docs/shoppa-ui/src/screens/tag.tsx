import React from "react";
import { Tag } from "@shoppa-ui/widgets/tag";

export function TagScreen() {
  return (
    <div>
      <h1>This is the documentation for the tag component.</h1>
      <br />
      <div className="d-flex flex-column gap-10 flex-start">
        {(["primary", "success", "danger", "warning"] as const).map((v) => (
          <Tag variant={v} title="Hello" />
        ))}
      </div>
    </div>
  );
}
