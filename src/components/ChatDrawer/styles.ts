import { grey } from "@mui/material/colors";
import { darken, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  chatButton: {
    zIndex: theme.zIndex.drawer + 101,
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    position: 'fixed !important' as any,
  },

  chatPaper: {
    padding: theme.spacing(2, 2, 0, 2),
    height: "100%",
    width: 500,
  },

  container: {
    backgroundColor: darken(grey[800], 0.3),
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    overflow: "auto",
    height: "100%",
  },
  chatMessage:{
    wordBreak:"break-all"
  }
}));

export default useStyles;
