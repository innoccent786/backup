import { pink } from "@mui/material/colors";
import { styled } from "@mui/system";

const SectionHeader = styled<any>("div")(({ theme, ...props }: any) => ({
  position: "relative",
  maxWidth: 500,
  margin: props.align === "center" ? "0 auto" : "none",
  display: "block",

  span: {
    color: pink[500],
    letterSpacing: 2,
  },

  h2: {
    paddingBottom: theme.spacing(3),
    fontWeight: "bolder",
    fontSize: "2rem",
    margin: 0,
  },

  "&:after": {
    content: '""',
    display: "block",
    width: 100,
    height: 5,
    background: `linear-gradient(to right, transparent, ${pink[500]})`,
    position: "absolute",
    bottom: 0,
    left: props.align === "left" ? "0%" : "50%",
    transform: props.align === "left" ? "translateX(0%)" : "translateX(-50%)",
  },
}));

export default SectionHeader;
