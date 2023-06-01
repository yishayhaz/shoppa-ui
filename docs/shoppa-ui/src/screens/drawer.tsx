import { Drawer } from "@shoppa-ui/primitives/drawer";
import { Button } from "@shoppa-ui/widgets/button";
import { IconButton } from "@shoppa-ui/widgets/icon-button";
import { useState } from "react";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";

export function DrawerScreen() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="d-flex flex-start gap-10 flex-column">
      <IconButton label="Toggle Drawer" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <HiArrowSmLeft /> : <HiArrowSmRight />}
      </IconButton>
      <div className="d-flex flex-start gap-20">
        <Drawer
          isOpen={isOpen}
          style={{ background: "red", height: "200px" }}
          maxWidth={200}
        >
          <span>Hello World</span>
        </Drawer>
        <div>...rest of screen</div>
      </div>
    </div>
  );
}
