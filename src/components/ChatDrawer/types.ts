import { User } from "../../pages/Trading/types";

export interface ChatDrawerProps {
  currentUser: User;
}

export interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
  };
  content: string;
}
