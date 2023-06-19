import { BaseModel, RefField } from "../common";

export type MCategory = BaseModel & {
  name: string;
  ancestors: RefField[];
  children: RefField[];
  parent: RefField;
  allowed_variants: RefField[];
};
