// status
// files: reciepts, refunds, cancelles.
// 1 address
// 1 user info (email, phone, id, cvv, transaction_uid)
// items, total, notes (for each store)

import { Address, BaseModel, RefField, StringifiedDate } from "../common";
import { MProduct, MProductItem } from "./product";
import { MStore } from "./store";
import { MStoreUser } from "./store-user";
import { MUser } from "./user";

export type MOrder = {
  total: number;
  total_after_refund: number;
  refunds: MOrderRefund[];
  transaction: MOrderTransaction;
  parts: MOrderPart[];
  info: MOrderInfo;
  user: MUser & RefField;
  address: Address;
};

export type MOrderTransaction = {
  created_at: StringifiedDate;
  token: string;
  cc_last4: string;
  cc_length: number;
};

export type MOrderRefund = {
  created_at: StringifiedDate;
  store_id: RefField;
  item_id: RefField;
  amount: number;
  message: string;
} & {
  created_at: StringifiedDate;
  store_id: RefField;
  amount: number;
  message: string;
};

export type MOrderInfo = {
  email?: string;
  phone_number?: string;
};

export type MOrderPart = BaseModel & {
  status: OrderStatus;
  store: MStore & RefField;
  products: MOrderProduct[];
  delivery: number;
  total: number;
  total_after_refund: number;
  notes: MOrderPartNote[];
  receipt?: RefField & "file model";
  utm?: string;
};

export enum OrderStatus {
  Pending = "pending",
  InProcess = "in_process",
  Shipping = "shipping",
  Delivered = "delivered",
  Refunded = "refunded", // entire order is refunded
}

export type MOrderProduct = {
  product: RefField & MProduct;
  item: RefField & MProductItem;
  quantity: number;
  price: number;
};

export type MOrderPartNote = BaseModel & {
  writer: MStoreUser & RefField;
  text: string;
};
