import { Textarea } from "@shoppa-ui/widgets/textarea";

export function TextareaScreen() {
  return (
    <div className="d-flex flex-column flex-start gap-20">
      <h1>This is the documentation for the textarea</h1>
      <Textarea placeholder="Hey hello" label="Your Message" />
      <Textarea
        isValid={false}
        disabled
        placeholder="Hey hello"
        label="Your Message"
        title="215/200"
      />
      <Textarea isValid title="You're doing fine." />
    </div>
  );
}
