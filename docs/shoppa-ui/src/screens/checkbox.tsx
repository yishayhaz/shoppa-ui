import React from "react";
import { Checkbox } from "@shoppa-ui/widgets/checkbox";

export function CheckboxScreen() {
  return (
    <div>
      <h1>This is the documentation for the Checkbox</h1>
      {(["primary", "success", "danger", "warning", "neutral"] as const).map(
        (variant) => (
          <Checkbox
            key={variant}
            id={variant}
            label={variant}
            variant={variant}
          />
        )
      )}
    </div>
  );
}
