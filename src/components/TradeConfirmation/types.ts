import { User } from "../../pages/Trading/types";

export interface TradeConfirmationProps {
  tradesDetails: { [id: string]: User };
  userId:string;
  open: boolean;
  onSendMoney(userId: string): () => void;
  onSendItems(userId: string): () => void;
}
