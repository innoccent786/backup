import { darken, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor:
      theme.palette.mode === "dark"
        ? darken(theme.palette.grey[900], 0.3)
        : theme.palette.grey[200],
    padding: theme.spacing(2),
    overflowX: "hidden",
    overflowY: "auto",
    flexWrap: "wrap",
    display: "flex",
    borderRadius: 1,
    height: 250,
    // maxHeight: 350,
  },
  rootProduct: {
    width: `calc(calc(100% - ${theme.spacing(2 * 5)}) / 6)`,
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
    userSelect: "none",

    // "&:nth-child(6n)": {
    //   marginRight: 0
    // }
  },
}));

export default useStyles;
