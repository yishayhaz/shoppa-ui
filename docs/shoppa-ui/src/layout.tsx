import React from "react";
import { Outlet } from "react-router-dom";
import { Nav } from "./nav";

export function Layout() {
  return (
    <main className="d-flex align-items-start" style={{ paddingBlock: 50 }}>
      <Nav />
      <div style={{ paddingInline: 50 }} className="flex-1">
        <Outlet />
      </div>
    </main>
  );
}
