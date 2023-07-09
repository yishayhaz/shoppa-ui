const SHOPPA_ASSETS_URL = "assets.shoppa.co.il";

export class Wau {
  url: string;

  constructor(url = SHOPPA_ASSETS_URL) {
    this.url = `https://${url}/`;
  }

  write(path: string, isDefault?: boolean) {
    if (path.startsWith("http")) {
      return path;
    }

    let url = this.url;

    if (isDefault) {
      url += "defaults/";
    }

    if (path.startsWith("/")) {
      url += path.slice(1);
    } else {
      url += path;
    }

    return url;
  }
}
