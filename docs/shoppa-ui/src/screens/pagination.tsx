import { Pagination } from "@shoppa-ui/widgets/pagination";
import { UsePaginationArgs, usePagination } from "@shoppa-hooks/pagination";

export function PaginationScren() {
  const api = usePagination(async (pagi: UsePaginationArgs) => {
    return { data: [pagi], count: 0 };
  });

  return (
    <div>
      <h1>
        This is a the documentation for the <>Pagination</> component.
      </h1>
      <Pagination page={api.page} count={100} onChange={api.setPage} />
    </div>
  );
}
