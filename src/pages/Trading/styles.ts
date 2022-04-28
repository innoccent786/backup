import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  feeInput:{
      outline:"none !important",
      
      "&>fieldset": {
        border:"0px !important",
        borderWidth:"0px !important",
        outline:"none !important",
      }
  },
  
}));

export default useStyles;
