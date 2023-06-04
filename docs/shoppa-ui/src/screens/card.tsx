import React from "react";
import { BaseCard } from "@shoppa-ui/primitives/base-card";
import { Card } from "@shoppa-ui/widgets/card";
import { Button } from "@shoppa-ui/widgets/button";

export function CardScreen() {
  return (
    <div className="d-flex flex-column flex-start gap-10">
      <h1>This is the documentation for the Card</h1>
      <h2>Base Card</h2>
      <BaseCard>Hello World</BaseCard>
      <h2>Card</h2>
      <Card roundness="lg">
        <h1>Hello World</h1>
        <p>Hey I'm a cool card</p>
        <Button>Yo!</Button>
      </Card>
    </div>
  );
}
