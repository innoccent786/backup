import { Grid, Typography,Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React from "react";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { SendingStatus } from "../../pages/Trading/types";
import { UserConfirmationProps } from "./types";
import useStyles from './styles'
const UserConfirmation: React.FC<UserConfirmationProps> = (props) => {
  const { trader, onSendMoney, onSendItems } = props;
  const { sendingItemsStatus, sendingMoneyStatus } = trader.trade.confirmation;
  const hasProducts = trader.trade.selectedProducts.length > 0;
  const classes=useStyles();
  return (
  
    <Grid container spacing={2} className={props.isCurrentuser? classes.container1:""}>
      {/* Trader username */}
      <Grid item xs={12} >
      <Typography
            color={props.isCurrentuser ? "yellowGreen" : "#9879c2"}
            
            component="span"
            variant="h6"
            sx={{fontFamily:"Verdana,sans-serif!important",textTransform:"normal"}}
          >
            <b>{props.isCurrentuser? "You" : "Your Buddy"}</b>
<br/>
            <span style={{fontSize:'16px',fontFamily:"Verdana,sans-serif!important"}}>{props.isCurrentuser?<span>&nbsp;</span>:trader.name}</span>
          </Typography>
      </Grid>

      {/* Sending money status */}
      <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between">
          <Box>
          <Typography variant="h6"  fontWeight={900} component="p" sx={{fontFamily:"Verdana,sans-serif!important",textTransform:"normal",color:"#575757"}}>
            Etherum sended:
          </Typography> 
          {sendingMoneyStatus === SendingStatus.SENT ?  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          &nbsp;&nbsp;&nbsp;  <CheckIcon  fontSize="medium"  style={{ color:"green",fontWeight:"bold" }} />
            <Typography variant="h6" sx={{fontFamily:"Verdana,sans-serif!important",textTransform:"normal"}} alignSelf="center" fontSize="16px" fontWeight="bold" color="green" component="p">
           Accepted
          </Typography> 
                            </Box>
 : sendingMoneyStatus === SendingStatus.SENDING?
 <Box sx={{ display: 'flex' }}>
 &nbsp;&nbsp;&nbsp;<HourglassTopIcon  fontSize="medium"  style={{ color:"yellow",fontWeight:"bold" }}/>
 <Typography variant="h6" alignSelf="center" sx={{fontFamily:"Verdana,sans-serif!important",textTransform:"normal"}} fontSize="16px" fontWeight="bold" color="yellow" component="p">
 On the way
</Typography> 
                 </Box> :
 <Box sx={{ display: 'flex' }}>
            &nbsp;&nbsp;&nbsp;   <ClearIcon  fontSize="medium"  style={{ color:"red",fontWeight:"bold" }}/>
            <Typography variant="h6" alignSelf="center" sx={{fontFamily:"Verdana,sans-serif!important",textTransform:"normal"}} fontSize="16px" fontWeight="bold" color="red" component="p">
            Not started #6077
          </Typography> 
                            </Box>
 }
          </Box>
          {props.isCurrentuser? sendingMoneyStatus !== SendingStatus.SENT && (
        
        <Grid item xs={4} justifyContent="flex-end" justifyItems="flex-end" >
          <Box display="flex" justifyContent="flex-end" pr={2}>
          <LoadingButton
            loading={sendingMoneyStatus === SendingStatus.SENDING}
            onClick={onSendMoney(trader.id)}
            variant="outlined"
            size="small"
          sx={{fontFamily:"Verdana,sans-serif!important",textTransform:"captalize",borderRadius:"16px",padding:"0px 30px",backgroundColor:"#7590d3",color:"white"}}
          >
            
            Send
          </LoadingButton>
          </Box>
        </Grid>
        
      ):""}
</Box>
      </Grid>
      {/* Sending items status */}
      <Grid item xs={12}>
        <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h6" fontWeight="bold" component="p" sx={{color:"#575757",fontFamily:"Verdana,sans-serif!important",textTransform:"normal"}}>
            Nfts sended:
          </Typography> 
          {sendingItemsStatus === SendingStatus.SENT || !hasProducts
            ?   <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            &nbsp;&nbsp;&nbsp;<CheckIcon  fontSize="medium"  style={{ color:"green",fontWeight:"bold" }}/>
            <Typography variant="h6" alignSelf="center" fontWeight="bold" fontSize="16px" color="green" component="p" sx={{fontFamily:"Verdana,sans-serif!important",textTransform:"normal"}}>
                  Accepted
          </Typography> 
                            </Box>            : sendingMoneyStatus === SendingStatus.SENDING?
 <Box sx={{ display: 'flex' }}>
 &nbsp;&nbsp;&nbsp;
 <HourglassTopIcon  fontSize="medium"  style={{ color:"yellow",fontWeight:"bold" }}/>
 <Typography variant="h6" alignSelf="center" sx={{fontFamily:"Verdana,sans-serif!important",textTransform:"normal"}} fontWeight="bold" color="yellow" fontSize="16px" component="p">
 On the way
</Typography> 
                 </Box> :
            <Box sx={{ display: 'flex' }}>
          &nbsp;&nbsp;&nbsp;
            <ClearIcon fontSize="medium"  style={{ color:"red",fontWeight:"bold" }}/>
            <Typography variant="h6" alignSelf="center" sx={{fontFamily:"Verdana,sans-serif!important",textTransform:"normal"}} fontWeight="bold" fontSize="16px" color="red" component="p">
            Not started #6077
          </Typography> 
          </Box>
            }
          </Box>

          {props.isCurrentuser? sendingItemsStatus !== SendingStatus.SENT && hasProducts && (
        <Grid item xs={4}>
          <Box display="flex" justifyContent="flex-end" pr={2}>
          <LoadingButton
            loading={sendingItemsStatus === SendingStatus.SENDING}
            onClick={onSendItems(trader.id)}
            variant="outlined"
           
            size="small"
            sx={{fontFamily:"Verdana,sans-serif!important",textTransform:"captalize",borderRadius:"16px", padding:"0px 30px",backgroundColor:"#7590d3", color:"white"}}
          >

            Send
          </LoadingButton>
          </Box>
        </Grid>
      ):""}
      </Box>        
      </Grid>

    </Grid>
  );
};

export default UserConfirmation;
