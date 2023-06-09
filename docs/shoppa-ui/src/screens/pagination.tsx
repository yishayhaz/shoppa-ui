import { Pagination } from "@shoppa-ui/widgets/pagination";
import {
  UsePaginationFuncProps,
  usePagination,
} from "@shoppa-hooks/pagination";

export function PaginationScren() {
  const api = usePagination(async (pagi: UsePaginationFuncProps) => {
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
