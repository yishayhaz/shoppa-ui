import { useState } from "react";
import { UseApiResult, useApi } from "./api";

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

export type UsePaginationOptions = {
  page?: number;
  amount?: number;
};

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
  defaults: UsePaginationOptions
): UsePaginationResult<T, K> => {
  const [page, _setPage] = useState<number>(defaults.page ?? 1);
  const [amount, _setAmount] = useState<number>(defaults.amount ?? 20);

  const api = useApi(func);

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
