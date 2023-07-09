import { Address, BaseModel } from "../common";
import { MCart } from "./cart";

export type MUser = BaseModel & {
  name: string;
  email: string;
  phone_number: string;
  gender: Gender;
  date_of_birth: string;
  addresses: Address[];
  last_login: string;
  credit_cards: [];
  cart: MCart;
  is_verified: boolean;
};

export enum Gender {
  Male = "male",
  Female = "female",
}

export enum UserType {
  Active = "active",
  Banned = "banned",
  guest = "guest",
}
