import React from "react";
import { Outlet } from "react-router-dom";
import { Nav } from "./common/nav/inedx";
import { Drawer } from "@shoppa-ui/primitives/drawer";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { IconButton } from "@shoppa-ui/widgets/icon-button";
import { Header } from "./common/header";

export function Layout() {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <>
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="d-flex align-items-start" style={{ paddingBlock: 50 }}>
        <Drawer isOpen={isOpen} maxWidth={200}>
          <Nav />
        </Drawer>
        <div style={{ paddingInline: 50 }} className="flex-1">
          <Outlet />
        </div>
      </main>
    </>
  );
}
