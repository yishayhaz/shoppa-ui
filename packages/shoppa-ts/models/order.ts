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

export type MOrderNote = BaseModel & {
  text: string;
};

export type MOrderPartNote<PopulateWriter = false> = BaseModel & {
  writer: PopulateWriter extends true ? MStoreUser : RefField;
  text: string;
};

export type MOrderInfo = {
  email?: string;
  phone?: string;
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
  PendingStore = "pending:store",
  PendingUser = "pending:user",
  PendingUserCancel = "pending:user_cancel",
  PendingStoreCancel = "pending:store_cancel",
  PendingUserRefund = "pending:user_refund",
  PendingStoreRefund = "pending:store_refund",
  InProcessWarehouse = "in_process:warehouse",
  InProcessShipping = "in_process:shipping",
  FailedUserCancel = "failed:user_cancel",
  FailedStoreCancel = "failed:store_cancel",
  FailedTransaction = "failed:transaction",
  FailedStoreReject = "failed:store-reject",
  ArrivedPending = "arrived:pending",
  ArrivedSuccess = "arrived:success",
}

export type MOrderProduct<PProduct = false> = {
  product: PProduct extends true ? PProduct : RefField;
  item: RefField;
  quantity: number;
  price: number;
};
