import { debounce } from "@shoppa-utils/debounce";
import { useRef } from "react";

export const DEFAULT_DEBOUNCE_WAIT = 200;

export const useDebounce = <TArgs extends any[], TReturn>(
  func: (...args: TArgs) => TReturn,
  wait: number
) => {
  const debounced = useRef(debounce(func, wait));

  return debounced.current as (...args: TArgs) => TReturn;
};
