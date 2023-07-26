// status
// files: reciepts, refunds, cancelles.
// 1 address
// 1 user info (email, phone, id, cvv, transaction_uid)
// items, total, notes (for each store)

import { Address, BaseModel, RefField } from "../common";
import { MStore } from "./store";
import { MStoreUser } from "./store-user";
import { MUser } from "./user";

export type MOrder = {
  total: number;
  total_after_refund: number;
  parts: MOrderPart[];
  info: MOrderInfo;
  user: MUser & RefField;
  address: Address & RefField;
};

export type MOrderInfo = {
  email?: string;
  phone_number?: string;
};

export type MOrderPart<
  PStore = false,
  PProduct = false,
  PNoteWriter = false
> = BaseModel & {
  status: OrderStatus;
  store: PStore extends true ? MStore : RefField;
  products: MOrderProduct<PProduct>[];
  total: number;
  notes: MOrderPartNote<PNoteWriter>[];
  receipt?: string;
  utm?: string;
  track_id?: string;
};

export enum OrderStatus {
  Pending = "pending",
  InProcess = "in_process",
  Shipping = "shipping",
  Delivered = "delivered",
  Refunded = "refunded", // entire order is refunded
}

export type MOrderProduct<PProduct = false> = {
  product: PProduct extends true ? PProduct : RefField;
  item: RefField;
  quantity: number;
  price: number;
};

export type MOrderNote = BaseModel & {
  text: string;
};

export type MOrderPartNote<PopulateWriter = false> = BaseModel & {
  writer: PopulateWriter extends true ? MStoreUser : RefField;
  text: string;
};
