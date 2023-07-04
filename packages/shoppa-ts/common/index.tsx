export type StringifiedDate = string;

export type RefField = string;

export type BaseModel = {
  _id: RefField;
  created_at: StringifiedDate;
  updated_at: StringifiedDate;
};

export type ApiFile = {
  _id: RefField;
  created_at: StringifiedDate;
  updated_at: StringifiedDate;
  file_name: string;
  path: string;
  size: number;
  public: boolean;
  hidden: boolean;

  // todo
  mime_type: string;
  file_type: string;
};

export type Address = BaseModel & {
  free_text?: string;
  city: string;
  street: string;
  street_number: string;
  entrance?: string;
  floor?: string;
  apartment?: string;
  zip_code: string;
};

export type Paginated<TData> = {
  data: TData;
  total: number;
};

export enum SortDirection {
  Ascending = 1,
  Descending = -1,
}

export enum PaginationAmount {
  min = 1,
  normal = 20,
  max = 100,
}
