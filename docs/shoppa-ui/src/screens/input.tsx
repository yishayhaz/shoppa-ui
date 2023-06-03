import React from "react";
import { Input } from "@shoppa-ui/widgets/input";

export function InputScreen() {
  return (
    <div className="d-flex gap-30 flex-column align-items-stretch">
      <h1>This is documentation for input</h1>
      <div className="d-flex gap-10 flex-column">
        <Input label="Ayo" placeholder="Am I cool or what?" />
        <Input
          placeholder="Am I cool or what?"
          isValid={false}
          title="You must do as I say!"
        />
        <Input
          placeholder="Am I cool or what?"
          isValid
          title="You are doing good."
        />
      </div>
      <div className="d-flex gap-10 flex-column align-items-start">
        <h2>With Icon</h2>
        <Input placeholder="Am I cool or what?" icon={"🏁"} />
        <Input placeholder="Am I cool or what?" isValid={false} icon={"❌"} />
        <Input placeholder="Am I cool or what?" isValid icon={"✅"} />
      </div>
      <div className="d-flex gap-10 flex-column align-items-start">
        <h2>With btnIcon</h2>
        <Input placeholder="Am I cool or what?" btnIcon={"🏁"} />
        <Input
          placeholder="Am I cool or what?"
          isValid={false}
          btnIcon={"❌"}
        />
        <Input placeholder="Am I cool or what?" isValid btnIcon={"✅"} />
      </div>
      <div className="d-flex gap-10 flex-column align-items-start">
        <h2>Disabled</h2>
        <Input placeholder="Am I cool or what?" btnIcon={"🏁"} disabled />
        <Input
          disabled
          placeholder="Am I cool or what?"
          isValid={false}
          btnIcon={"❌"}
        />
        <Input
          placeholder="Am I cool or what?"
          isValid
          btnIcon={"✅"}
          disabled
        />
      </div>
    </div>
  );
}
