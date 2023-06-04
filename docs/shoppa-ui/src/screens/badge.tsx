import React from "react";
import { Badge } from "@shoppa-ui/widgets/badge";
import { BiPlus } from "react-icons/bi";

export function BadgeScreen() {
  return (
    <div className="d-flex flex-column flex-start gap-10">
      <h1>
        This is the documentation for the <code>Badge</code> component.
      </h1>
      <div className="d-flex flex-start gap-10">
        {(["primary", "success", "danger", "warning", "neutral"] as const).map(
          (variant, idx) => (
            <Badge key={idx} variant={variant} size="sm">
              {variant}
            </Badge>
          )
        )}
      </div>
      <div className="d-flex flex-start gap-10">
        {(["primary", "success", "danger", "warning", "neutral"] as const).map(
          (variant, idx) => (
            <Badge key={idx} variant={variant}>
              {(idx + 9) ** 2}
            </Badge>
          )
        )}
      </div>
      <div className="d-flex flex-start gap-10">
        {(["primary", "success", "danger", "warning", "neutral"] as const).map(
          (variant, idx) => (
            <Badge key={idx} variant={variant} size="lg">
              {variant}
            </Badge>
          )
        )}
      </div>
    </div>
  );
}
