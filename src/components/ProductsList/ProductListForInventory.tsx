import { Draggable, Droppable } from "react-beautiful-dnd";
import React, { useContext, useState,useEffect } from "react";

import { TraderContext } from "../TraderView/context";
import { ProductListForInventoryProps } from "./types";
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

const ProductListForInventory: React.FC<ProductListForInventoryProps> = (
  props
) => {
  const { products, id, sendDataToParent } = props;
  const [onDoubleDrap, setOnDoubleDrap] = useState(false);
  const [getSelectproduct, setGetSelectproduct] = useState<string>("");
  const data = useContext(TraderContext);
  const classes = useStyles();

  // const sendDataToParent = (productData: {
  //   image: string;
  //   name: string;
  //   url: string;
  //   id: string;
  //   contractAddress: string;
  //   collectionName: string;
  //   tokenId: string;
  // }) => {
  //   setGetSelectproduct(productData)

  // };

  function getDataFromProduct(productData:SelectProduct) {
    console.log("this is product data ", productData);
    setOnDoubleDrap(true);
    
      sendDataToParent("hey")
    
    // setGetSelectproduct(productData);
    
  }

  useEffect(() => {
    setGetSelectproduct("Maham");
  },[products])
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
              {(products || []).map((product, index) => (
                <Draggable
                  draggableId={`${id}_${product.id}`}
                  key={product.id}
                  index={index}
                  isDragDisabled={!data?.canDragProducts}
                >
                  {(provided) => (
                    <div
                      className={classes.rootProduct}
                      // onClick={() => getDataFromProduct(product)}
                      onClick={() => sendDataToParent("hey")}
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

export default ProductListForInventory;

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

//   console.log("get slected ",getSelectproduct)
//   const productFromMap=(productData: {
//     image: string;
//     name: string;
//     url: string;
//     id: string;
//     contractAddress: string;
//     collectionName: string;
//     tokenId: string;
//   })=>{
// console.log(productData)
//   }
