import React, { useState } from "react";
import { Popup } from "@shoppa-ui/primitives/popup";
import { Button } from "@shoppa-ui/widgets/button";
import { Dialog } from "@shoppa-ui/widgets/dialog";
import { IoIosAlert } from "react-icons/io";
import { BiTrash } from "react-icons/bi";
import { Select } from "@shoppa-ui/widgets/select";

export function PopupScreen() {
  const [show, setShow] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogVariant, setDialogVariant] = useState<
    "primary" | "danger" | "warning" | "success" | "neutral"
  >("danger");

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
          variant={dialogVariant}
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
        <div className="d-flex justify-content-start gap-12">
          <div>
            <Select
              value={dialogVariant}
              onChange={(e) => setDialogVariant(e.target.value as any)}
            >
              <option value="primary">Primary</option>
              <option value="danger">Danger</option>
              <option value="warning">Warning</option>
              <option value="success">Success</option>
              <option value="neutral">Neutral</option>
            </Select>
          </div>
          <Button
            autoWidth
            variant={dialogVariant}
            className="gap-10"
            onClick={() => {
              setShowDialog(true);
            }}
          >
            <BiTrash /> Delete Something
          </Button>
        </div>
      </div>
    </>
  );
}
