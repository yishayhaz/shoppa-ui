import { ApiFile, BaseModel } from "../common";

export enum StoreDefaults {
  MIN_QUERY_LEN = 4,
}

export type MStore = BaseModel & {
  name: string;
  slogan: string;
  description: string;
  logo: ApiFile | null;
  banner: ApiFile | null;
  locations: StoreLocation[];
  legal_information: StoreLegalInformation;
  contact: StoreContact;
  analytics: StoreAnalytics;
  min_order: number;
};

export type MStorePreview = BaseModel & {
  name: string;
  description: string;
  slogan: string;
  banner: ApiFile | null;
  logo: ApiFile | null;
};

export type StoreLegalInformation = {
  name: string;
  legal_id: string;
  business_type: BusinessTypes;
};

export enum BusinessTypes {
  ExemptDealer = "exempt_dealer", // עוסק פטור
  AuthorizedDealer = "authorized_dealer", // עוסק מורשה
  Ltd = "ltd", // חברה בע"מ
  Public = "public", // חברה ציבורית
  NonProfit = "non_profit", // מלכ"ר - עמותה
}

export type StoreContact = {
  email: string;
  phone: string;
};

export type StoreLocation = {
  _id: string;
  free_text: string;
  city: string;
  street: string;
  street_number: string;
  phone: string;
};

export type StoreAnalytics = {
  views: number;
  sales: number;
  orders: StoreAnalyticsOrders;
  rating: StoreAnalyticsRating;
};

export type StoreAnalyticsOrders = {
  pending: number;
  in_progress: number;
  arrived: number;
  failed: number;
};

export type StoreAnalyticsRating = {
  votes: number;
  average: number;
};
