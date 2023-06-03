export const rsplit = (str: string, sep: string, maxsplit: number) => {
  str = reverse(str, sep);

  return [
    str.split(sep).slice(maxsplit).reverse().join(sep),
    ...str.split(sep, maxsplit),
  ];
};

export const reverse = (str: string, sep: string = "") =>
  str.split(sep).reverse().join(sep);
