const SHOPPA_ASSETS_URL = "https://assets.shoppa.co.il/";

export const wau = (path: string, isDefault?: boolean) => {
  if (path.startsWith("http")) {
    return path;
  }

  let url = SHOPPA_ASSETS_URL;

  if (isDefault) {
    url += "defaults/";
  }

  if (path.startsWith("/")) {
    url += path.slice(1);
  } else {
    url += path;
  }

  return url;
};
