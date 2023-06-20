import { BaseButton } from "@shoppa-ui/primitives/base-button";
import { Button } from "@shoppa-ui/widgets/button";
import { IconButton } from "@shoppa-ui/widgets/icon-button";
import { api } from "../api";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useApi } from "@shoppa-hooks/api";
import { LuEye } from "react-icons/lu";
import { Tooltip } from "@shoppa-ui/floating/tooltip";

export function ButtonScreen() {
  const absoluteFire = useApi(() => api.get("/variants"));
  console.log(absoluteFire);

  return (
    <div className="d-flex gap-30 flex-column align-items-stretch">
      <h1>This is the documentation for button</h1>
      <div className="d-flex flex-column gap-6 align-items-start">
        <h2>Base Button</h2>
        <BaseButton>Hello World</BaseButton>
      </div>
      <div className="d-flex flex-column gap-6 align-items-start">
        <h2>Button</h2>
        <Button
          onClick={() => absoluteFire.fire()}
          isLoading={absoluteFire.isLoading}
        >
          Hey I'm Primary
        </Button>
        <Button variant="neutral">Hey I'm neutral</Button>
        <Button variant="success" isLoading spinnerProps={{ variant: "light" }}>
          Hey I'm Success
        </Button>
        <Button variant="danger">Hey I'm Danger</Button>
        <Button variant="warning">Hey I'm Warning</Button>
        <Button
          link={{
            href: "/docs/button",
            Component: Link,
            reloadDocument: true,
          }}
          variant="link"
        >
          Hey I'm Link
        </Button>
        <Button disabled>Hey I'm Disabled</Button>
      </div>
      <div className="d-flex flex-column gap-6 align-items-start">
        <h2>Icon Button</h2>
        <div className="d-flex gap-6">
          <IconButton label="" variant="primary">
            <BiPlus />
          </IconButton>
          <div style={{ color: "white" }}>
            <Tooltip label="im a link">
              <IconButton
                label=""
                variant="neutral"
                link={{ href: "/hello" }}
                className="reset-link"
              >
                <LuEye />
              </IconButton>
            </Tooltip>
          </div>
          <IconButton label="" variant="success">
            <BiPlus />
          </IconButton>
          <IconButton label="" variant="danger">
            <BiPlus />
          </IconButton>
          <IconButton label="" variant="warning">
            <BiPlus />
          </IconButton>
          <IconButton label="" disabled variant="primary">
            <BiPlus />
          </IconButton>
          <IconButton label="" variant="link">
            <BiPlus />
          </IconButton>
        </div>
      </div>
      <div className="d-flex flex-column gap-6 align-items-start">
        <h2>Icon Button As Squares</h2>
        <div className="d-flex gap-6">
          <IconButton square label="" variant="primary">
            <BiPlus />
          </IconButton>
          <IconButton square label="" variant="neutral">
            <BiPlus />
          </IconButton>
          <IconButton square label="" variant="success">
            <BiPlus />
          </IconButton>
          <IconButton square label="" variant="danger">
            <BiPlus />
          </IconButton>
          <IconButton square label="" variant="warning">
            <BiPlus />
          </IconButton>
          <IconButton square label="" disabled variant="primary">
            <BiPlus />
          </IconButton>
          <IconButton square label="" variant="link">
            <BiPlus />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
