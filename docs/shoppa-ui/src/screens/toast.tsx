import React, { useState } from "react";
import { toast } from "@shoppa-ui/toast";
import { Button } from "@shoppa-ui/widgets/button";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoIosWarning } from "react-icons/io";
import { Input } from "@shoppa-ui/widgets/input";
import { Select } from "@shoppa-ui/widgets/select";

export function ToastScreen() {
  const [msg, setMsg] = useState<string>("This is a success toast");
  const [type, setType] = useState<"primary" | "danger" | "warning">();

  return (
    <div>
      <h1>This is the documentation for the Toast component</h1>
      <p>
        Toast requires you to add a div under <>{"<body>"}</> like so:{" "}
        <>{"<div id='shoppa-toast'></div>"}</>
      </p>
      <br />
      <div className="d-flex flex-column gap-12 content-max-width">
        <Input value={msg} onChange={(e) => setMsg(e.target.value)} />
        <Select value={type} onChange={(e) => setType(e.target.value as any)}>
          <option value="primary">Primary</option>
          <option value="danger">Danger</option>
          <option value="warning">Warning</option>
        </Select>
        <Button
          onClick={() => {
            toast(
              type ?? "danger",
              msg,
              type === "primary" ? (
                <BsFillCheckCircleFill />
              ) : type === "danger" ? (
                <AiFillCloseCircle />
              ) : (
                <IoIosWarning />
              )
            );
          }}
        >
          Trigger Toast
        </Button>
      </div>
    </div>
  );
}
