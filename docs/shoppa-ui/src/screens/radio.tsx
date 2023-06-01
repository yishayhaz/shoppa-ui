import React from "react";
import { Radio } from "@shoppa-ui/widgets/radio";

export function RadioScreen() {
  return (
    <div>
      <h1>This is the documentation for the Radio</h1>
      {(["primary", "success", "danger", "warning", "neutral"] as const).map(
        (variant) => (
          <Radio
            key={variant}
            name="variant"
            id={variant}
            label={variant}
            variant={variant}
          />
        )
      )}
    </div>
  );
}
