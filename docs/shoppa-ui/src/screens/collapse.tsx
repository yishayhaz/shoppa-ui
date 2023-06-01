import React from "react";
import { Collapse } from "@shoppa-ui/primitives/collapse";
import { Button } from "@shoppa-ui/widgets/button";

export function CollapseScreen() {
  return (
    <div>
      <h1>This is documentation for Collapse</h1>
      <br />
      <Collapse>
        <div
          className="d-flex justify-content-start gap-20"
          style={{ border: "1px solid black" }}
        >
          <p>click me plz</p>
        </div>
        <div style={{ border: "1px solid black" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus enim
          animi placeat totam nihil. Commodi similique quisquam tempora esse?
          <br />
          Nostrum ducimus animi suscipit eaque quisquam modi delectus corporis
          debitis doloribus! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Possimus enim animi placeat totam nihil. Commodi similique
          quisquam tempora esse?
          <br />
          Nostrum ducimus animi suscipit eaque quisquam modi delectus corporis
          debitis doloribus! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Possimus enim animi placeat totam nihil. Commodi similique
          quisquam tempora esse?
          <br />
          Nostrum ducimus animi suscipit eaque quisquam modi delectus corporis
          debitis doloribus!
        </div>
      </Collapse>
    </div>
  );
}
