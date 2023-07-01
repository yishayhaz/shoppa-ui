import { useFilters } from "@shoppa-hooks/filters";
import { useLocation } from "react-router-dom";

export function FiltersScreen() {
  const location = useLocation();
  const filters = useFilters({ name: "string", age: "number" }, [location]);

  return (
    <div>
      <h1>This is the documentation for the Filters</h1>
    </div>
  );
}
