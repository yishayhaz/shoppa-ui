import { Select } from "@shoppa-ui/widgets/select";

export function SelectScreen() {
  return (
    <div>
      <h1>This is the documentation for the Select component.</h1>
      <br />
      <Select value="">
        <option value="1">1</option>
        <option value="2">2</option>
      </Select>
      <br />
      <Select label="Choose 1" title="You must." isValid={false}>
        <option value="1">1</option>
        <option value="2">2</option>
      </Select>
    </div>
  );
}
