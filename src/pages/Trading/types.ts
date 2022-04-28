import { ProductType } from "../../components/Product/types";

export interface User {
  name: string;
  id: string;
  trade: TradeDetails;
  products: Array<ProductType>;
}

export interface TradeDetails {
  // selectedProducts: ProductType[];
  selectedProducts: Array<ProductType>;

  payOtherTraderFees: boolean;
  tradeStatus: TradeStatus;
  tradeId: string;
  price: number;
 // imageUrl:string
  confirmation: {
    sendingMoneyStatus: SendingStatus;
    sendingItemsStatus: SendingStatus | false;
  };
}

export enum SendingStatus {
  SENDING,
  SENT,
  FAILED,
  NONE,
}

export enum TradeStatus {
  COMPLETED = "completed",
  ACCEPTED = "accepted",
  NONE = "none",
}
