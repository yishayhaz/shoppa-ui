import { RefField } from "../common";

export type MCart = {
  items: CartItem[];
  total: number;
  last_updated: string;
};

export type CartItem = {
  added_at: string;
  product: RefField;
  item_id: RefField;
  quantity: number;
};
