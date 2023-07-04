import { Address, BaseModel } from "../common";
import { MCart } from "./cart";

export type MUser = BaseModel & {
  name: string;
  email: string;
  phone_number: string;
  gender: Gender;
  date_of_birth: string;
  addresses: Address[];
  cart: MCart;
};

export enum Gender {
  Male = "male",
  Female = "female",
}
