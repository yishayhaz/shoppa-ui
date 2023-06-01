import React from "react";
import { Banner } from "@shoppa-ui/widgets/banner";

export function BannerScreen() {
  return (
    <div>
      <h1>This is the doocumentation for the banner</h1>
      <Banner src={"https://assets.shoppa.co.il/defaults/store-banner.svg"}>
        <div className="bg-danger">Hello World</div>
      </Banner>
    </div>
  );
}
