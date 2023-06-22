import { useState } from "react";
import { UseApiOptions, UseApiResult, useApi } from "./api";

export type UsePaginationResult<T, K extends any[]> = Omit<
  UseApiResult<T, K>,
  "fire"
> &
  UsePaginationArgs & {
    setPage: (page: number) => (...args: K) => void;
    setAmount: (count: number) => (...args: K) => void;
    fire: (...args: K) => void;
    calcPages: (total: number) => number;
  };

export type UsePaginationOptions<T, K extends any[]> = {
  page?: number;
  amount?: number;
} & UseApiOptions<T, [UsePaginationArgs, ...K]>;

export type UsePaginationArgs = {
  page: number;
  amount: number;
};

export type UsePaginationFunction<T, K extends any[]> = (
  aginationArgs: UsePaginationArgs,
  ...args: K
) => Promise<T>;

export const usePagination = <T, K extends any[]>(
  func: UsePaginationFunction<T, K>,
  options?: UsePaginationOptions<T, K>
): UsePaginationResult<T, K> => {
  const [page, _setPage] = useState<number>(options?.page ?? 1);
  const [amount, _setAmount] = useState<number>(options?.amount ?? 20);

  const api = useApi(func, {
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const setPage = (page: number) => {
    _setPage(page);

    return (...args: K) => {
      api.fire(
        {
          page,
          amount,
        },
        ...args
      );
    };
  };

  const setAmount = (amount: number) => {
    _setAmount(amount);

    return (...args: K) => {
      api.fire(
        {
          page,
          amount,
        },
        ...args
      );
    };
  };

  const fire = (...args: K) => {
    api.fire(
      {
        page,
        amount,
      },
      ...args
    );
  };

  return {
    ...api,
    fire,
    page,
    calcPages: (total: number) => Math.ceil(total / amount),
    amount,
    setPage,
    setAmount,
  };
};
