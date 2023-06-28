import { ApiFile, BaseModel, RefField } from "../common";
import { MVariant } from "./variant";

export type MProduct = BaseModel & {
  name: string;
  assets: ApiFile[];
  keywords: string[];
  brand: ProductBrand;
  analytics?: ProductAnalytics;
  store: MProductStore;
  warranty: string | null; // in months
  status: MProductStatus;
};

export type MProductPopulated = MProduct & {
  description: string;
  feature_bullet_points: string[];
  categories: MProductCategory[];
  variants: MVariant[];
  items: MProductItem[];
};

export type MProductPreview = BaseModel & {
  name: string;
  store: MProductStore;
  brand: ProductBrand;
  assets: ApiFile[];
  analytics?: ProductAnalytics;
  keywords: string[];
  categories: MProductCategory[];
};

export type MProductItem = BaseModel & {
  in_storage: number;
  price: number;
  name?: string;
  variants: MProductItemVariant[];
  assets_refs: RefField[];
  sku: RefField;
  info: string | null;
  status: MProductItemStatus;
};

export enum MProductStatus {
  Active = "active",
  Draft = "draft",
  Deleted = "deleted",
  Banned = "banned",
  InActive = "inactive",
  Pending = "pending",
}

export enum MProductItemStatus {
  Active = "active",
  InActive = "inactive",
  Deleted = "deleted",
}

export type ProductBrand = null | {
  _id: RefField;
  name: string;
};

export type ProductAnalytics = {
  views: number;
  rating: number;
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
  names: string[];
  _ids: RefField[];
};
