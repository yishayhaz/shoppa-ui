import { ApiFile, BaseModel, RefField } from "../common";
import { MVariant } from "./variant";

export type MProduct = BaseModel & {
  name: string;
  images: ApiFile[];
  keywords: string[];
  price: number;
  brand: ProductBrand;
  analytics?: ProductAnalytics;
  store: MProductStore;
};

export type MProductPopulated = MProduct & {
  description: string;
  categories: MProductCategory[];
  variants: MVariant[];
  items: MProductItem[];
};

export type MProductItem = BaseModel & {
  in_storage: number;
  price: number;
  name?: string;
  variants: MProductItemVariant[];
};

export type ProductBrand = string | null;

export type ProductAnalytics = {
  views: number;
};

export type MProductItemVariant = {
  value_id: RefField;
  variant_id: RefField;
};

export type MProductStore = {
  name: string;
  _id: RefField;
};

export type MProductCategory = {
  name: string;
  _id: RefField;
};
