import React from "react";
import { BaseButton } from "@shoppa-ui/primitives/base-button";
import { Button } from "@shoppa-ui/widgets/button";
import { IconButton } from "@shoppa-ui/widgets/icon-button";

export function ButtonScreen() {
  return (
    <div>
      <BaseButton>Hello World</BaseButton>
      <Button variant="danger">Hello World!</Button>
      <IconButton label="Hello World!">E</IconButton>
    </div>
  );
}
