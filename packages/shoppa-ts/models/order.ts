// status
// files: reciepts, refunds, cancelles.
// 1 address
// 1 user info (email, phone, id, cvv, transaction_uid)
// items, total, notes (for each store)

import { Address, BaseModel, RefField, StringifiedDate } from "../common";
import { MProduct, MProductItem, MProductPreview } from "./product";
import { MStore } from "./store";
import { MStoreUser } from "./store-user";
import { MUser } from "./user";

export type MOrder = BaseModel & {
  refunds: MOrderRefund[];
  total: number;
  total_after_refunds: number;
  transaction: MOrderTransaction;
  parts: MOrderPart[];
  info: MOrderInfo;
  user: MUser & RefField;
  address: Address;
};

export type MOrderTransaction = {
  token: string;
  cc_last4: string;
  cc_length: number;
  cc_company: string;
};

export type MOrderRefund = BaseModel & {
  store_id: RefField;
  product: RefField & MProduct;
  item_id: RefField;
  amount: number;
  quantity: number;
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
  items: MOrderItem[];
  delivery: number;
  total: number;
  total_after_refunds: number;
  notes: MOrderPartNote[];
  receipt?: RefField & "file model";
  utm?: string;
};

export enum OrderStatus {
  Pending = "pending", // store hasn't viewed the order yet
  InProcess = "in_process", // store is preparing the order
  Shipping = "shipping", // order is on the way
  Arrived = "arrived", // order arrived to the user
}

export type MOrderItem = {
  product: RefField & MProductPreview;
  item: RefField & MProductItem;
  quantity: number;
  price: number;
};

export type MOrderPartNote = BaseModel & {
  writer: MStoreUser & RefField;
  text: string;
};
