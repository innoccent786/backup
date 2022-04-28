import { darken, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor:
      theme.palette.mode === "dark"
        ? darken(theme.palette.grey[900], 0.3)
        : theme.palette.grey[200],
    padding: theme.spacing(2),
    overflow: "auto",
    borderRadius: 1,
    minHeight: 250,
    maxHeight: 350,
  },
}));

export default useStyles;
