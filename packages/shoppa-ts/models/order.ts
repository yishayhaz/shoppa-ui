import { Address, BaseModel, RefField } from "../common";
import { MStore } from "./store";
import { MStoreUser } from "./store-user";
import { MUser } from "./user";

export type MOrder<
  PAddress = false,
  PUser = false,
  PNotes = false,
  PNoteWriter = false,
  PStore = false,
  PProduct = false
> = BaseModel & {
  total: number;
  user: PUser extends true ? MUser : RefField;
  address: PAddress extends true ? Address : RefField;
  info: MOrderInfo;
  notes: PNotes extends true ? MOrderNote[] : RefField[];
  parts: MOrderPart<PStore, PProduct, PNoteWriter>[];
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
  Canceled = "canceled", // entire order is canceled
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
