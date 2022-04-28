import { Draggable, Droppable } from "react-beautiful-dnd";
import React, { useContext, useState,useEffect } from "react";

import { TraderContext } from "../TraderView/context";
import { ProductsListProps } from "./types";
import useStyles from "./styles";
import Product from "../Product";

interface SelectProduct {
  image: string;
  name: string;
  url: string;
  id: string;
  contractAddress: string;
  collectionName: string;
  tokenId: string;
}

const ProductsList: React.FC<ProductsListProps> = (props) => {
  const { products, id } = props;

  const data = useContext(TraderContext);
  const classes = useStyles();


  return (
    <>
      <Droppable
        isDropDisabled={!data?.canDragProducts}
        direction="horizontal"
        droppableId={id}
      >
        {(provided) => (
          <div {...provided.droppableProps}>
            <div className={classes.root} ref={provided.innerRef}>
              {products?.map((product, index) => (
                <Draggable
                  draggableId={`${id}_${product.id}`}
                  key={product.id}
                  index={index}
                  isDragDisabled={!data?.canDragProducts}
                >
                  {(provided) => (
                    <div
                      className={classes.rootProduct}
                    >
                      <Product
                        isDraggable={Boolean(data?.isCurrentUser)}
                        data={product}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </>
  );
};

export default ProductsList;


// const sendDataToParent = (productData: {
  //   image: string;
  //   name: string;
  //   url: string;
  //   id: string;
  //   contractAddress: string;
  //   collectionName: string;
  //   tokenId: string;
  // }) => {
  //   setGetSelectproduct(productData);
  // };

  // console.log("get slected ", getSelectproduct);
  // const productFromMap = (productData: {
  //   image: string;
  //   name: string;
  //   url: string;
  //   id: string;
  //   contractAddress: string;
  //   collectionName: string;
  //   tokenId: string;
  // }) => {
  //   console.log(productData);
  // };

  //   const doubleClickData = {
  //     image:productData.image ? productData.image:"image",
  //     name:productData.image ? productData.image:"image",
  //     url:productData.image ? productData.image:"image",
  //     id:productData.image ? productData.image:"image",
  //     contractAddress:productData.image ? productData.image:"image",
  //     collectionName:productData.image ? productData.image:"image",
  //     tokenId:productData.image ? productData.image:"image",
  //   };
  //   // console.log(typeof sendDataTraderParent)
  //     // sendDataTraderParent(doubleClickData);
  //  if(sendDataTraderParent === undefined){
  //    console.log("this is undefined")
  //  }else{
  //   console.log("this is not undefined")
  //  }
  // function getDataFromProduct(productData: SelectProduct) {
  //   console.log("this is product data ", productData);
  // }

  // function getDataFromProduct(productData:SelectProduct) {