export const getSearchParams = (...keys: string[]) => {
  const url = new URL(window.location.href);
  const params = url.searchParams;

  const searchParams: { [key: string]: string } = {};

  for (const key of keys) {
    const value = params.get(key);
    if (value) {
      searchParams[key] = value;
    }
  }

  return searchParams;
};
