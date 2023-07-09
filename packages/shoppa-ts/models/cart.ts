import { RefField } from "../common";

export type MCart = {
  items: TCartItem[];
  total: number;
  last_updated: string;
};

export type TCartItem = {
  added_at: string;
  product: RefField;
  item_id: RefField;
  quantity: number;
};
