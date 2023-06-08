import React from "react";
import { Pagination } from "@shoppa-ui/widgets/pagination";
import { usePagination } from "@shoppa-hooks/pagination";

export function PaginationScren() {
  const api = usePagination(async (...args) => {
    console.log(args);
    return { data: [], count: 0 };
  });

  api.


  return (
    <div>
      <h1>
        This is a the documentation for the <>Pagination</> component.
      </h1>
      <Pagination
        page={api.page}
        count={100}
        active={api.}
        onChange={(page) => {
          setPage(page);
        }}
      />
    </div>
  );
}
