import { Typography, Button, Grid } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";
import React, { useState, memo,useEffect ,useContext} from "react";

import { TradeStatus } from "../../pages/Trading/types";
import ProductsList from "../ProductsList";
import SelectedProductDataContext from "../../pages/Trading/context";
import ProductListForInventory from "../ProductsList/ProductListForInventory";
import { TraderViewProps } from "./types";
import { TraderContext } from "./context";
import Inventory from "../Inventory";

type DataProvider = {
  image: string;
  name: string;
  url: string;
  id: string;
  contractAddress: string;
  collectionName: string;
  tokenId: string;
};
const TraderView: React.FC<TraderViewProps> = (props) => {
  const [dataM, setDataM] = useState<string>();
  const { userName } = props;
  const animation = {
    "data-aos-mirror": "true",
    "data-aos-once": "true",
    "data-aos": "fade-left",
  };

  const changeTradeStatus = (status: TradeStatus) => () =>
    props.onTradeStatusChange(status);

  /**
   * On enter key press
   */
  const sendDataToParent = (data3: string): void => {
    setDataM(data3);
  };

  {console.log("these are selected products from traderview", [
    ...props.trade.selectedProducts,
  ])}
  console.log(dataM);


  return (
    <TraderContext.Provider value={props}>
     
      <Grid container spacing={3}>
        {/* User name */}
        <Grid item xs {...animation}>
          <Typography
            color={props.isCurrentUser ? "yellowGreen" : "#9879c2"}
            
            component="span"
            variant="h6"
          >
            <b>{props.isCurrentUser? "You" : "Your Buddy"}</b>
<br/>
            <span style={{fontSize:'16px',position:'absolute', top:'45px' ,left:"25px"}}>{props.isCurrentUser?" ":userName}</span>
          </Typography>
        </Grid>

        {/* Join trade button */}
        {props.canJoinTrade && (
          <Grid item xs="auto">
            {props.isCurrentUser && (
              <Button onClick={props.onJoinTrade} sx={{fontFamily:"Verdana,sans-serif!important",textTransform:"capatalize!important",borderRadius:22,fontWeight:1500,color:'white',backgroundColor:'#776ad2'}} variant="contained">
               Join 
              </Button>
            )}
          </Grid>
        )}

        <DragDropContext onDragEnd={props.onProductMove}>
          {/* Inventory */}
          <Grid item xs={12}>
            <Inventory/>
          </Grid>
          
          {/* Selected Products */}
          <Grid item xs={12}>
           

            <ProductsList
                //products={
                 // [
                  //  ...props.trade.selectedProducts,
                 // ]
               // }
                  products={props.trade.selectedProducts}
                
                id="selected"
                
              />

          </Grid>
        </DragDropContext>
      </Grid>
    </TraderContext.Provider>
  );
};

export default memo(TraderView);
