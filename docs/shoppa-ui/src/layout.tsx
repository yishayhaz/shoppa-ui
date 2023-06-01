import React from "react";
import { Outlet } from "react-router-dom";
import { Nav } from "./common/nav/inedx";
import { Drawer } from "@shoppa-ui/primitives/drawer";
import { Header } from "./common/header";

export function Layout() {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <>
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="d-flex align-items-start" style={{ paddingBlock: 50 }}>
        <Drawer
          isOpen={isOpen}
          maxWidth={300}
          style={{
            position: "sticky",
            top: "80px",
          }}
        >
          <Nav />
        </Drawer>
        <div style={{ paddingInline: 50 }} className="flex-1">
          <Outlet />
        </div>
      </main>
    </>
  );
}
