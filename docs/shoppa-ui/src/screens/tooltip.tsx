import React from "react";
import { Tooltip } from "@shoppa-ui/floating/tooltip";
import { IconButton } from "@shoppa-ui/widgets/icon-button";
import { Badge } from "@shoppa-ui/widgets/badge";

export function TooltipScreen() {
  return (
    <div>
      <h1>This is the documentation for the Tooltip component.</h1>
      <br />
      <Tooltip label="Nice to meet you!">
        <Badge>hover</Badge>
      </Tooltip>
    </div>
  );
}
