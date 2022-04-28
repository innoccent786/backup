export interface ProductType {
  image: string;
  name: string;
  url: string;
  id: string;
  contractAddress: string;
  collectionName: string;
  tokenId: string;
};

export interface ProductProps {
  isDraggable: boolean;
  data: ProductType;
}
