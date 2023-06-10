import { Link } from "@shoppa-ui/primitives/link";
import { Link as RouterLink } from "react-router-dom";

export function LinkScreen() {
  return (
    <div>
      <h1>This is the documentation for the Link component.</h1>
      <p>
        the link component allows you to get styled links and supports whatever
        framework you are using.
        <br />
        You can pass a <code>Component</code> prop to the link to change the
      </p>
      <br />

      <Link Component={RouterLink} to="/">
        Link
      </Link>
    </div>
  );
}
