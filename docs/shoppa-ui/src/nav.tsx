import React from "react";
import { Link } from "react-router-dom";

export function Nav() {
  return (
    <nav>
      <ul className="d-flex flex-column">
        <Link to="/docs/input">Input</Link>
        <Link to="/docs/button">Button</Link>
      </ul>
    </nav>
  );
}
