import { MProduct } from "./product";

export type MCart = {
  _id: string;
  items: TCartItem[];
};

export type TCartItem = {
  _id: string;
  product_id: MProduct["_id"];
  quantity: number;
  variant: string;
};
