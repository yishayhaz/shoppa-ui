import React, { useState } from "react";
import { Popover } from "@shoppa-ui/floating/popover";
import { IconButton } from "@shoppa-ui/widgets/icon-button";
import { Button } from "@shoppa-ui/widgets/button";
import { BiTrash } from "react-icons/bi";
import { Dialog } from "@shoppa-ui/widgets/dialog";

export function PopoverScreen() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Dialog
        text={"Are you sure you want to delete?"}
        show={isOpen}
        onHide={() => setIsOpen(false)}
        isDanger
        cancelText="Cancel"
        confirmText="Delete"
      />
      <div>
        <h1>This is the documentation for the Popover component.</h1>

        <Popover label="">
          <div>
            <IconButton label="heart">❤️</IconButton>
          </div>
          <div className="d-flex gap-10 flex-column">
            <Button>Click me!</Button>
            <Button>Click me!</Button>
            <Button variant="danger" onClick={() => setIsOpen(true)}>
              <BiTrash /> Delete me!
            </Button>
          </div>
        </Popover>
      </div>
    </>
  );
}
