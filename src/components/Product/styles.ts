import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: `calc(calc(100% - ${theme.spacing(2 * 5)}) / 6)`,
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
    userSelect: "none",

    // "&:nth-child(6n)": {
    //   marginRight: 0
    // }
  },

  icon: {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[300],
    position: "relative",
    paddingTop: "100%",
    // overflow: "hidden",
    userSelect: "none",
    height: "100%",
    width: "100%",

    "& img": {
      position: "absolute",
      userSelect: "none",
      maxHeight: "100%",
      maxWidth: "100%",
      left: 0,
      top: 0,
    },
  },

  openSeaButton: {
    transform: 'translate(50%, 50%) rotate(41deg)',
    position: 'absolute !important' as any,
    top: '-28px',
    right: '14px',
    "& svg": {
      height: 24,
      width: 24,
      color:'white'
    },
  },
  hideTarde:{
    display:"none !important"
  }
}));

export default useStyles;
