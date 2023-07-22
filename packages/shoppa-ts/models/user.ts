import { Address, BaseModel, StringifiedDate } from "../common";
import { MCart } from "./cart";

export type MUser = BaseModel & {
  status: UserStatus;
  name: string | null;
  email: string | null;
  phone_number: string | null;
  gender: Gender | null;
  date_of_birth: string | null;
  addresses: Address[];
  last_login: StringifiedDate;
  credit_cards: [];
  cart: MCart;
  is_verified: boolean;
};

export enum Gender {
  Male = "male",
  Female = "female",
}

export enum UserStatus {
  Active = "active",
  Banned = "banned",
  Guest = "guest",
  Deleted = "deleted",
}
