import { Grid, IconButton, Link, Typography } from "@mui/material";
import React from 'react'
import { forwardRef, useContext,useRef,useEffect } from "react";
import { TraderContext } from "../TraderView/context";
import TraderView from "../TraderView/index";
import { ProductProps } from "./types";
import SelectedProductDataContext from "../../pages/Trading/context";
import useStyles from "./styles";
import IosShareIcon from "@mui/icons-material/IosShare";
const Product = forwardRef<any, ProductProps>((props, ref: any) => {
  const { data, isDraggable, ...otherProps } = props;
  const classes = useStyles();

  const contextSign = useContext(TraderContext);
  const parentContext = useContext(SelectedProductDataContext);

  // console.log("contextSign",contextSign)

  // if(contextSign.isCurrentUser !== null || contextSign.isCurrentUser === true){
  //   console.log("contextSign",contextSign.isCurrentUser)
  // }
  // console.log(contextSign?.userName.includes('You'))

  // if (contextSign?.userName.includes("You")) {
  //   console.log("contextSign?.userName", contextSign?.userName);
  //   console.log(
  //     "contextSign?.trade.selectedProducts",
  //     contextSign?.trade.selectedProducts
  //   );
  // }
  // const getPerviousSelectProducts = {contextSign?.trade.selectedProducts};
  // // const resultArray = Object.keys(getPerviousSelectProducts)

  // Object.entries(contextSign?.trade.selectedProducts).forEach(([key, value]) =>
  //   console.log(key, value)
  // );
  // console.log("contextSign?.trade.selectedProducts",contextSign?.trade.selectedProducts)
 
  const getDouble = (productData: {
    image: string;
    name: string;
    url: string;
    id: string;
    contractAddress: string;
    collectionName: string;
    tokenId: string;
  }) => {
    const doubleClickData = {
      image: productData.image,
      name: productData.name,
      url: productData.url,
      id: productData.id,
      contractAddress: productData.contractAddress,
      collectionName: productData.collectionName,
      tokenId: productData.tokenId,
    };
    console.log("this is the selectProductChange", {
      ...parentContext?.selectProductChange,
      doubleClickData,
    });
    // const newarry={...parentContext?.selectProductChange}
    console.log("this is parts products", parentContext?.selectProductChange);
    parentContext?.setSelectProductChange(doubleClickData);
    console.log(
      "this is parentContext?.selectProductChange after double click",
      parentContext?.selectProductChange
    );

    // parentContext?.setSelectProductChange({...parentContext?.selectProductChange,doubleClickData})
    // const updatedArray={...contextSign?.trade.selectedProducts,doubleClickData}
    // console.log()

    // const updateArray={...contextSign?.trade.selectedProducts,doubleClickData}

    // console.log("updateArray",updateArray);
  };
//code for double click


//useEffect(()=>{
//document.getElementsByTagName("div")[0].addEventListener("dblclick",()=>{
  //getDouble(data);
 // console.log(data);
//})
//},[])



  return (
    <>
      <div
        // className={classes.root}
        ref={ref}
        {...otherProps}
        
          onDoubleClick={()=>getDouble(data)}
        
      >
        <Grid container>
      
          <Grid item xs={12}>
            <div className={classes.icon}>
              <img src={data.image} alt={data.name} />
              <Link href={data.url} target="_blank">
                <IconButton className={classes.openSeaButton}>
                  <IosShareIcon />
                </IconButton>
              </Link>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption">{data.name}</Typography>
          </Grid>
        </Grid>
      </div>
    </>
  );
});

export default Product;
