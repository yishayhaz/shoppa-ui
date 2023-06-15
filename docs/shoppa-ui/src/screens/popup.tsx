import React, { useState } from "react";
import { Popup } from "@shoppa-ui/primitives/popup";
import { Button } from "@shoppa-ui/widgets/button";
import { Dialog } from "@shoppa-ui/widgets/dialog";
import { IoIosAlert } from "react-icons/io";
import { BiTrash } from "react-icons/bi";

export function PopupScreen() {
  const [show, setShow] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      {show && (
        <Popup show onHide={() => setShow(false)}>
          <div style={{ width: 400, height: 400 }}>
            Popup
            <button>Hey</button>
          </div>
        </Popup>
      )}
      {showDialog && (
        <Dialog
          show
          onHide={() => setShowDialog(false)}
          text={"Are you sure you want to delete this?"}
          icon={<IoIosAlert />}
          isDanger
        />
      )}
      <div>
        <h1>This is the documentation for the Popup</h1>
        <br />
        <h2>Plain Popup</h2>
        <Button
          autoWidth
          onClick={() => {
            setShow(true);
          }}
        >
          Open Popup
        </Button>
        <br />
        <h2>Dialog Popup</h2>
        <Button
          autoWidth
          variant="danger"
          className="gap-10"
          onClick={() => {
            setShowDialog(true);
          }}
        >
          <BiTrash /> Delete Something
        </Button>
      </div>
    </>
  );
}
