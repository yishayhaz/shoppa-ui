export type StringifiedDate = string;

export type RefField = string;

export type BaseModel = {
  _id: RefField;
  created_at: StringifiedDate;
  updated_at: StringifiedDate;
};
