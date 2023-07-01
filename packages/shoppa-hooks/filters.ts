import { useEffect, useState } from "react";
import { getSearchParams } from "shoppa-utils/params";

export type Filters = { [key: string]: Filter };

export type Filter = "string" | "number" | "boolean" | "date";

export const useFilters = (filters: Filters, dep: any[]) => {
  const [searchParams, setSearchParams] = useState(
    {} as { [key: string]: string }
  );

  const handleFilters = () => {
    const searchParams = getSearchParams(...Object.keys(filters));

    for (const [key, value] of Object.entries(searchParams)) {
      const filter = filters[key];
      if (filter === "string") {
        // ...
      } else if (filter === "number") {
        // ...
      } else if (filter === "boolean") {
        // ...
      } else if (filter === "date") {
        // ...
      }
    }
  };

  useEffect(() => {
    handleFilters();
  }, dep);

  return null;
};
