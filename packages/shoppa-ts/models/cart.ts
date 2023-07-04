import { RefField } from "../common";

export type MCart = {
  _id: RefField;
  items: TCartItem[];
  total: number;
};

export type TCartItem = {
  product: RefField;
  item_id: RefField;
  quantity: number;
};
