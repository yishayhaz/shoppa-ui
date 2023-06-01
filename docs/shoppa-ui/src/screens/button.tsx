import { BaseButton } from "@shoppa-ui/primitives/base-button";
import { Button } from "@shoppa-ui/widgets/button";
import { IconButton } from "@shoppa-ui/widgets/icon-button";

export function ButtonScreen() {
  return (
    <div className="d-flex gap-30 flex-column align-items-stretch">
      <h1>This is the documentation for button</h1>
      <div className="d-flex flex-column gap-6 align-items-start">
        <h2>Base Button</h2>
        <BaseButton>Hello World</BaseButton>
      </div>
      <div className="d-flex flex-column gap-6 align-items-start">
        <h2>Button</h2>
        <Button>Hey I'm Primary</Button>
        <Button variant="secondary">Hey I'm Secondary</Button>
        <Button variant="success">Hey I'm Success</Button>
        <Button variant="danger">Hey I'm Danger</Button>
        <Button variant="warning">Hey I'm Warning</Button>
        <Button disabled>Hey I'm Disabled</Button>
      </div>
      <div className="d-flex flex-column gap-6 align-items-start">
        <h2>Button As Links</h2>
        <Button asLink>Hey I'm Primary</Button>
        <Button asLink variant="secondary">
          Hey I'm Secondary
        </Button>
        <Button asLink variant="success">
          Hey I'm Success
        </Button>
        <Button asLink variant="danger">
          Hey I'm Danger
        </Button>
        <Button asLink variant="warning">
          Hey I'm Warning
        </Button>
        <Button asLink disabled>
          Hey I'm Disabled
        </Button>
      </div>
      <div className="d-flex flex-column gap-6 align-items-start">
        <h2>Icon Button</h2>
        <div className="d-flex gap-6">
          <IconButton label="" variant="primary">
            ✨
          </IconButton>
          <IconButton label="" variant="secondary">
            ✨
          </IconButton>
          <IconButton label="" variant="success">
            ✨
          </IconButton>
          <IconButton label="" variant="danger">
            ✨
          </IconButton>
          <IconButton label="" variant="warning">
            ✨
          </IconButton>
          <IconButton label="" disabled variant="primary">
            ✨
          </IconButton>
        </div>
      </div>
      <div className="d-flex flex-column gap-6 align-items-start">
        <h2>Icon Button As Squares</h2>
        <div className="d-flex gap-6">
          <IconButton square label="" variant="primary">
            ✨
          </IconButton>
          <IconButton square label="" variant="secondary">
            ✨
          </IconButton>
          <IconButton square label="" variant="success">
            ✨
          </IconButton>
          <IconButton square label="" variant="danger">
            ✨
          </IconButton>
          <IconButton square label="" variant="warning">
            ✨
          </IconButton>
          <IconButton square label="" disabled variant="primary">
            ✨
          </IconButton>
        </div>
      </div>
      <div className="d-flex flex-column gap-6 align-items-start">
        <h2>Icon Button Inverted</h2>
        <div className="d-flex gap-6">
          <IconButton invert label="" variant="primary">
            A
          </IconButton>
          <IconButton invert label="" variant="secondary">
            A
          </IconButton>
          <IconButton invert label="" variant="success">
            A
          </IconButton>
          <IconButton invert label="" variant="danger">
            A
          </IconButton>
          <IconButton invert label="" variant="warning">
            A
          </IconButton>
          <IconButton invert label="" disabled variant="primary">
            A
          </IconButton>
        </div>
      </div>
    </div>
  );
}
