import { User } from "../../pages/Trading/types";

export interface UserConfirmationProps {
  trader: User;
  isCurrentuser:boolean;
  onSendMoney(userId: string): () => void;
  onSendItems(userId: string): () => void;
}
