import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  // Navbar
  toolbar: {
    height: theme.spacing(11),
  },
  navbarLogo: {
    width: 150,
  },

  // Header
  header: {
    minHeight: `calc(100vh - ${theme.spacing(11)})`,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 85,

    "&, & span": {
      lineHeight: "65px",
    },
  },
  headerDescription: {
    fontSize: 25,
  },
  wrapper:{
    display: "flex",
    color: "#fff",
  fontSize: "60px",
  fontWeight: 400,
  marginLeft: "15px",
  height: "90px",
  lineHeight: "90px",
  overflow: "hidden",
  },
  animatedText:{
    fontSize: "60px",
  fontWeight: 400,
  },
  accordionParentStyle:{
    border:"0px !important",
    margin:"1.75rem 0px",
  },
  accordionStyle:{
    borderRadius:"200px !important",
    margin:"5px",
    border:"0px !important"
  }
}));

export default useStyles;
