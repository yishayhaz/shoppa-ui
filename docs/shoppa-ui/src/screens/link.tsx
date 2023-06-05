import React from "react";
import { Link } from "@shoppa-ui/primitives/link";
import { Link as RouterLink } from "react-router-dom";

export function LinkScreen() {
  return (
    <div>
      <RouterLink to="" />
      <Link Component={RouterLink} to="/">
        Link
      </Link>
    </div>
  );
}
