import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Divider,
  Dialog,
  Grid,
  Box
} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { Icon } from '@iconify/react';
import React, { Fragment, useEffect, useState } from "react";
import { styled } from "@mui/styles";
import { ReactComponent as Ethereum } from "../../assets/svg/ethereum-eth-logo.svg";
import { ReactComponent as NFTlogo } from "../../assets/svg/nft-and-laptop-13036.svg";

import { SendingStatus, TradeDetails } from "../../pages/Trading/types";
import UserConfirmation from "../UserConfirmation";
import { TradeConfirmationProps } from "./types";

//import myStyles from './styles';
const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paperWidthSm": {
    width: "100%",
  },
}));

const TradeConfirmation: React.FC<TradeConfirmationProps> = (props) => {
  const { tradesDetails, open, ...otherProps } = props;
  const [isOpen, setIsOpen] = useState(false);
  const isDone = Object.values(tradesDetails).every(
    (trader) =>
      trader.trade.confirmation.sendingMoneyStatus === SendingStatus.SENT &&
      (trader.trade.selectedProducts.length === 0 ||
        trader.trade.confirmation.sendingItemsStatus === SendingStatus.SENT)
  );

  /**
   * Close dialog
   */
  const closeDialog = () => setIsOpen(false);
  /**
   * Open dialog
   */
  useEffect(() => {
    if (open) setIsOpen(true);
  }, [open]);

  if (!isOpen) return null;
//const classes=myStyles();
  return (
    <CustomDialog
      // onClose={closeDialog}
      maxWidth="md"
      fullWidth
      open
  sx={{borderRadius:"20px!important",backgroundColor:"transparent!important"}}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between">
        <Icon icon="emojione-monotone:handshake" color="#575757" width="80" height="80"  />
        <Typography variant="h2" component="p" align="center" fontWeight="bold" sx={{color:"#575757", fontSize:"50px",fontFamily:"Verdana,sans-serif!important",textTransform:"normal"}}>
          Trade confirmed
        </Typography>
        
        <Icon icon="emojione-monotone:handshake" color="#575757" width="80" height="80"  />
        </Box>
      </DialogTitle>
      <DialogContent sx={{borderRadius:"20px!important",backgroundColor:"transparent!important"}}>
        <Grid container spacing={2} sx={{borderRadius:"20px!important",backgroundColor:"transparent!important"}}>
          
          {Object.values(tradesDetails).map((trader, index) =>
              <Fragment key={index}>
                <Grid item xs={6}>
                  <UserConfirmation isCurrentuser={trader.id===props.userId?true:false} trader={trader} {...otherProps} />
                </Grid>
              </Fragment>
            
          )}
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6"  fontWeight="bold" component="p" sx={{color:"#575757",fontFamily:"Verdana,sans-serif!important",textTransform:"normal"}}>
                  Status:
                  </Typography>
                  <Typography variant="h6" fontSize="15px" fontWeight="bold" sx={{color:"#575757",fontFamily:"Verdana,sans-serif!important",textTransform:"normal"}}> {isDone ? <span>&nbsp;&nbsp;Sending Tokens to Desitination</span> : <span>&nbsp;&nbsp;Waiting for both Traders to Send-In</span>}
                  </Typography>
              </Grid>
              
              <br/>
              <Box display="flex" pt={2} margin="auto" justifyContent="space-between">
                      
              {[
                { label: "Send ETH to", key: "sendingMoneyStatus" },
                { label: "Send NFTs to", key: "sendingItemsStatus" },
              ].map(({ label, key }) =>
                Object.values(tradesDetails).map((trader,index) => {
                  const status =
                    trader.trade.confirmation[
                      key as keyof TradeDetails["confirmation"]
                    ];
                  const productsCount = trader.trade.selectedProducts.length;

                  return (
                    <Grid item xs={12}>
                      <Box display="flex" >
                      <Box display="flex" flexDirection="column" margin="auto" justifyContent="center">
                      {label=="Send ETH to"?      <Grid xs={12} pt={0} padding="0px!important">
                  <Icon icon="mdi:ethereum" color="green"  style={{width:100, height:100}}/>
                </Grid>
           : <Grid xs={12} >
           <Icon icon="mdi:content-save-cog-outline" width={100} height={100} color={index===1 && label=="Send NFTs to"? "#575757":"#A0964A"} />
         </Grid>}
                      {productsCount === 0 && key === "sendingItemsStatus" ? (
                        <Typography color="error" sx={{fontFamily:"Verdana,sans-serif!important",textTransform:"normal"}}>
                          Not initiated
                        </Typography>
                      ) : status === SendingStatus.SENDING ? (
                        <Typography color="orange" sx={{fontFamily:"Verdana,sans-serif!important",textTransform:"normal"}}>
                          Sending...
                        </Typography>
                      ) : status === SendingStatus.SENT ? (
                        <Typography color="yellowGreen" sx={{fontFamily:"Verdana,sans-serif!important",textTransform:"normal"}}>
                          Sent
                        </Typography>
                      ) : status === SendingStatus.FAILED ? (
                        <Typography color="error" sx={{fontFamily:"Verdana,sans-serif!important",textTransform:"normal"}}>
                          Failed to send
                        </Typography>
                      ) : status === SendingStatus.NONE ? (
                        <Typography textAlign="center">__</Typography>
                      ) : null}
                      </Box>
{index===1 && label=="Send NFTs to"? "":
                      <Box display="flex" pt={0} sx={{alignSelf:"center" ,alignContent:"flex-start",justifyContent:'flex-start'}}>
                      <MoreHorizIcon  fontSize="medium"/>
                      <MoreHorizIcon fontSize="medium"/>
                      <MoreHorizIcon fontSize="medium"/>
                      </Box>
             }
                      </Box>
                    </Grid>
                  );
                })
              )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions></DialogActions>
    </CustomDialog>
  );
};

export default TradeConfirmation;
