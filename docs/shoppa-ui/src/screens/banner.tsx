import React from "react";
import { Banner } from "@shoppa-ui/widgets/banner";

export function BannerScreen() {
  return (
    <div>
      <h1>This is the doocumentation for the banner</h1>
      <Banner src={""} alt={""}>
        <div>Hello World</div>
      </Banner>
    </div>
  );
}
