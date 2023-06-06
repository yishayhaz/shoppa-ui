import { Tooltip } from "@shoppa-ui/floating/tooltip";
import { Badge } from "@shoppa-ui/widgets/badge";

export function TooltipScreen() {
  return (
    <div>
      <h1>This is the documentation for the Tooltip component.</h1>
      <br />
      <Tooltip label="Nice to meet you!">
        <Badge title="Hover Me" />
      </Tooltip>
    </div>
  );
}
