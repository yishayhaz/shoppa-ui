import { ApiFile, BaseModel, RefField } from "../common";
import { MOrder } from "./order";
import { MStore } from "./store";

export type MInvoice = BaseModel & {
  type: EInvoiceType;
  number: string;
  order: MOrder & RefField;
  store: MStore & RefField;
  copy: ApiFile;
  original: ApiFile;
  mail_sent: boolean;
};

export enum EInvoiceType {
  Reciept = "reciept",
  Refund = "refund",
}
