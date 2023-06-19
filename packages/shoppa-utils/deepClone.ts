import { AnyObject } from "shoppa-ts";

export function deepCopy(obj: AnyObject): AnyObject {
  if (Array.isArray(obj)) {
    return obj.map((item) => deepCopy(item));
  }
  if (Object(obj) === obj) {
    let newObj: AnyObject = {};
    Object.keys(obj).forEach((key) => (newObj[key] = deepCopy(obj[key])));
    return newObj;
  }
  return obj;
}
