export const debounce = <TArgs extends any[], TReturn>(
  func: (...args: TArgs) => TReturn,
  wait: number
) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: TArgs) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
