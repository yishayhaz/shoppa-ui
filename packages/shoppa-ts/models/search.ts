import { RefField } from "../common";

export type ProductSearchItem = {
  item_id: RefField;
  _id: RefField;
  name: string;
  views: number;
};

export type StoreSearchItem = {
  _id: RefField;
  name: string;
};
