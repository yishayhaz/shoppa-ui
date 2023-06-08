import { useState } from "react";
import { UseApiResult, useApi } from "./api";

export type UsePaginationResult<T, K extends any[]> = UseApiResult<T, K> &
  UsePaginationFuncProps & {
    setPage: (page: number, ...args: K) => void;
    setCount: (count: number, ...args: K) => void;
  };

export type UsePaginationFuncProps = {
  page: number;
  count: number;
};

export type UsePaginationFunction<T, K extends any[]> = (
  arg0: UsePaginationFuncProps,
  ...args: K
) => Promise<T>;

export const usePagination = <T, K extends any[]>(
  func: UsePaginationFunction<T, K>
): UsePaginationResult<T, K> => {
  const [page, _setPage] = useState<number>(1);
  const [count, _setCount] = useState<number>(10);

  const api = useApi(func);

  const setPage = (page: number, ...args: K) => {
    _setPage(page);
    api.fire(
      {
        page,
        count,
      },
      ...args
    );
  };

  const setCount = (count: number, ...args: K) => {
    _setCount(count);
    api.fire(
      {
        page,
        count,
      },
      ...args
    );
  };

  return {
    ...api,
    page,
    count,
    setPage,
    setCount,
  };
};
