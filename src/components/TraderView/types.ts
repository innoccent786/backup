import { DropResult } from "react-beautiful-dnd";

import { TradeDetails } from "../../pages/Trading/types";
import { ProductType } from "../Product/types";

export interface TraderViewProps {
  canDragProducts: boolean;
  products: ProductType[];
  isCurrentUser: boolean;
  canJoinTrade: boolean;
  dealClosed: boolean;
  trade: TradeDetails;
  traderId: string;
  userName: string;
  // imageUrl: string;
  onProductMove: (data: DropResult) => void;
  onCheckPayFees: (data: React.ChangeEvent<HTMLInputElement>) => void;
  // onPriceChange: (data: React.KeyboardEvent<HTMLInputElement>) => void;
  onTradeStatusChange: (data: any) => void;
  onJoinTrade: () => void;
}


export interface TraderContextType {}
