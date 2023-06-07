import React from "react";
import { Pagination } from "@shoppa-ui/widgets/pagination";

export function PaginationScren() {
  const [page, setPage] = React.useState(1);

  return (
    <div>
      <h1>
        This is a the documentation for the <>Pagination</> component.
      </h1>
      <Pagination
        page={page}
        count={100}
        active={page}
        onChange={(page) => {
          setPage(page);
        }}
      />
    </div>
  );
}
