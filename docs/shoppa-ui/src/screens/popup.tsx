import React from "react";
import { Popup } from "@shoppa-ui/primitives/popup";
import { Button } from "@shoppa-ui/widgets/button";

export function PopupScreen() {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <Popup show={show} onHide={() => setShow(false)}>
        <div style={{ width: 400, height: 400 }}>
          Popup
          <button>Hey</button>
        </div>
      </Popup>
      <div>
        <h1>This is the documentation for the Popup</h1>
        <Button
          autoWidth
          onClick={() => {
            setShow(true);
          }}
        >
          Open Popup
        </Button>
      </div>
    </>
  );
}
