import { BaseButton } from "@shoppa-ui/primitives/base-button";
import { Button } from "@shoppa-ui/widgets/button";
import { IconButton } from "@shoppa-ui/widgets/icon-button";
import { api } from "../api";
import { BiPlus } from "react-icons/bi";

export function ButtonScreen() {
  const handleAPI = async () => {
    try {
      const res = await api.get("/test");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="d-flex gap-30 flex-column align-items-stretch">
      <h1>This is the documentation for button</h1>
      <div className="d-flex flex-column gap-6 align-items-start">
        <h2>Base Button</h2>
        <BaseButton>Hello World</BaseButton>
      </div>
      <div className="d-flex flex-column gap-6 align-items-start">
        <h2>Button</h2>
        <Button onClick={handleAPI}>Hey I'm Primary</Button>
        <Button variant="neutral">Hey I'm neutral</Button>
        <Button variant="success">Hey I'm Success</Button>
        <Button variant="danger">Hey I'm Danger</Button>
        <Button variant="warning">Hey I'm Warning</Button>
        <Button variant="link">Hey I'm Link</Button>
        <Button disabled>Hey I'm Disabled</Button>
      </div>
      <div className="d-flex flex-column gap-6 align-items-start">
        <h2>Icon Button</h2>
        <div className="d-flex gap-6">
          <IconButton label="" variant="primary">
            <BiPlus />
          </IconButton>
          <IconButton label="" variant="neutral">
            <BiPlus />
          </IconButton>
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
