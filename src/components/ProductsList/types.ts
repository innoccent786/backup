import { ProductType } from "../Product/types";

export interface ProductsListProps {
  products?: ProductType[];
  id: string;
}


export interface ProductListForInventoryProps {
  products?: ProductType[];
  id: string;
  sendDataToParent:(arg: string) => void;
}