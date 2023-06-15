export const prettyUrl = (url: string, encode?: boolean) => {
  const res = url.replaceAll(" ", "+").toLowerCase();

  return encode ? encodeURI(res) : res;
};

export const convertUrl = (url: string) => {
  return decodeURI(url.replaceAll(" ", "+").toLowerCase());
};

export const parseUrl = (url: string) => {
  return url.replaceAll("-", " ").toLowerCase();
};

export const isUrlMatch = (url: string, str: string) => {
  return prettyUrl(str) === decodeURI(url);
};

export namespace UrlUtils {
  export const urlify = prettyUrl;
  export const parse = parseUrl;
  export const convert = convertUrl;
  export const isMatch = isUrlMatch;
}
