import { BaseModel } from "../common";

export type MVariant = BaseModel & {
  name: string;
  type: MVariantType;
  values: MVariantValue[];
};

export type MVariantType = "color" | string;

export type MVariantValue = BaseModel & {
  value: string;
  label: string;
};
