// import { createContext } from "react";

// interface TraderProductProps{
//     image: string;
//     name: string;
//     url: string;
//     id: string;
//     contractAddress: string;
//     collectionName: string;
//     tokenId: string;
// }

// export type TraderProductPropsType = TraderProductProps[];

// type TraderProductPropsContextType = {
//     selectProductChange: TraderProductPropsType;
//     setSelectProductChange:(selProduct: TraderProductPropsType) => void;
//   };

// const SelectedProductDataContext=createContext<TraderProductPropsContextType  | null>(null);
// export default SelectedProductDataContext



















import { createContext } from "react";

export interface TraderProductProps{
    image: string;
    name: string;
    url: string;
    id: string;
    contractAddress: string;
    collectionName: string;
    tokenId: string;
    
}

export type TraderProductPropsType = TraderProductProps[];

type TraderProductPropsContextType = {
    selectProductChange: TraderProductPropsType;
    setSelectProductChange:(selProduct: TraderProductProps) => void;
  };

const SelectedProductDataContext=createContext<TraderProductPropsContextType  | null>(null);
export default SelectedProductDataContext