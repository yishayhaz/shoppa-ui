import React from "react";
import { BaseButton } from "@shoppa-ui/primitives/base-button";
import { Button } from "@shoppa-ui/widgets/button";
import { IconButton } from "@shoppa-ui/widgets/icon-button";

export function ButtonScreen() {
  return (
    <div className="d-flex gap-30 flex-column align-items-stretch">
      <h1>This is the documentation for button</h1>
      <div className="d-flex flex-column gap-6 align-items-start">
        <h2>Base Button</h2>
        <BaseButton>Hello World</BaseButton>
      </div>
      <div className="d-flex flex-column gap-6 align-items-start">
        <h2>Button</h2>
        <Button>Hey I'm Primary</Button>
        <Button variant="secondary">Hey I'm Secondary</Button>
        <Button variant="success">Hey I'm Success</Button>
        <Button variant="danger">Hey I'm Danger</Button>
        <Button variant="warning">Hey I'm Warning</Button>
        <Button disabled>Hey I'm Disabled</Button>
      </div>
      <div className="d-flex flex-column gap-6 align-items-start">
        <h2>Icon Button</h2>
        <div className="d-flex gap-6">
          <IconButton label="" variant="primary">
            ✨
          </IconButton>
          <IconButton label="" variant="secondary">
            ✨
          </IconButton>
          <IconButton label="" variant="success">
            ✨
          </IconButton>
          <IconButton label="" variant="danger">
            ✨
          </IconButton>
          <IconButton label="" variant="warning">
            ✨
          </IconButton>
          <IconButton label="" disabled variant="primary">
            ✨
          </IconButton>
        </div>
      </div>
    </div>
  );
}
