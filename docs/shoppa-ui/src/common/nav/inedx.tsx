import React from "react";
import { Link } from "react-router-dom";

const LINKS = [
  { to: "/docs/alert", label: "Alert" },
  { to: "/docs/button", label: "Button" },
  { to: "/docs/collapse", label: "Collapse" },
  { to: "/docs/drawer", label: "Drawer" },
  { to: "/docs/input", label: "Input" },
  { to: "/docs/spinner", label: "Spinner" },
];

export function Nav() {
  return (
    <nav>
      <ul className="d-flex flex-column">
        {LINKS.map((link, idx) => (
          <li key={idx}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
