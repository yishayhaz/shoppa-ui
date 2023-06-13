import React from "react";
import { Outlet } from "react-router-dom";
import { Nav } from "./common/nav/inedx";
import { Drawer } from "@shoppa-ui/primitives/drawer";
import { Header } from "./common/header";
import { useDevice } from "@shoppa-hooks/device";

export function Layout() {
  const device = useDevice();
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <>
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <main
        style={{
          paddingBlock: 50,
          display: "grid",
          gridTemplateColumns: "auto 1fr",
        }}
      >
        <Drawer
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          maxWidth={300}
          strategy={device.isTabletOrMobile ? "absolute" : "relative"}
        >
          <Nav />
        </Drawer>

        <div
          style={{
            paddingInline: 50,
            overflow: "auto",
          }}
        >
          <Outlet />
        </div>
      </main>
    </>
  );
}
