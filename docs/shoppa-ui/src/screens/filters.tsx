import { useFilters } from "@shoppa-hooks/filters";
import { Input } from "@shoppa-ui/widgets/input";
import { Radio } from "@shoppa-ui/widgets/radio";

export function FiltersScreen() {
  const filters = useFilters({
    name: "string",
    age: "number",
    from: "date",
    to: "date",
    include: "boolean",
  });

  return (
    <div>
      <h1>This is the documentation for the Filters</h1>
      <br />
      <pre>
        <code>{JSON.stringify(filters.searchParams, null, 2)}</code>
      </pre>
      <div className="d-flex gap-6">
        <Input
          name="name"
          value={filters.asValues.name ?? ""}
          onChange={(e) => filters.onChange("name", e.target.value)}
        />
        <Input
          name="age"
          value={filters.asValues.age ?? ""}
          onChange={(e) => filters.onChange("age", e.target.value)}
        />
        <Input
          name="from"
          value={filters.asValues.from ?? ""}
          onChange={(e) => filters.onChange("from", e.target.value)}
          type="date"
          max={filters.asValues.to ?? ""}
        />
        <Input
          name="to"
          value={filters.asValues.to ?? ""}
          onChange={(e) => filters.onChange("to", e.target.value)}
          min={filters.asValues.from ?? ""}
          type="date"
        />
      </div>
      <br />
      <hr />
      <br />
      <div>
        <Radio
          label="yes"
          value="true"
          name="include"
          onChange={(e) => filters.onChange("include", e.target.value)}
        />
        <Radio
          label="no"
          value="false"
          name="include"
          onChange={(e) => filters.onChange("include", e.target.value)}
        />
        <Radio
          label="ignore"
          value=""
          name="include"
          onChange={(e) => filters.onChange("include", e.target.value)}
        />
      </div>
    </div>
  );
}
