import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "#root": {
          overflow: "hidden",
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "none",
        color: "white",
      },
    },
  },
});

export default theme;
