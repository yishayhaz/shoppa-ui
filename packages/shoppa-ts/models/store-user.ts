import { BaseModel, RefField } from "../common";

export type MStoreUser = BaseModel & {
  store: RefField;
  name: string;
  email: string;
  phone_number: string;
  role: string;
  two_factor_auth: boolean;
  registration_completed: boolean;
  registration_completed_at: string;
};
