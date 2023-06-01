import { Drawer } from "@shoppa-ui/primitives/drawer";
import { Button } from "@shoppa-ui/widgets/button";
import { useState } from "react";

export function DrawerScreen() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(!isOpen)}>Toggle Drawer</Button>
      <div className="d-flex justify-content-start">
        <Drawer isOpen={isOpen} style={{ background: "red" }}>
          <span>Hello World</span>
        </Drawer>
        <div>screen</div>
      </div>
    </div>
  );
}
