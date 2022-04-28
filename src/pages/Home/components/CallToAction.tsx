import { Button, Grid, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";
import { styled } from "@mui/system";
import React from "react";

const CallToActionBox = styled("div")(({ theme }) => ({
  backgroundImage: `linear-gradient(180deg, ${pink[600]} 0%, ${pink[900]} 100%)`,
  backgroundColor: "transparent",
  borderRadius: theme.spacing(5),
  padding: theme.spacing(12),

  "& h1": {
    fontSize: theme.spacing(10),
    lineHeight: "100px",
    fontWeight: "bold",
  },
  "& h3": {
    fontWeight: "bold",
  },
  "& button": {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },

  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(5),
    "& h1": {
      // fontSize: theme.spacing(5),
      lineHeight: "100px",
    },
  },
}));

const CallToAction: React.FC<any> = (props) => {
  return (
    <CallToActionBox>
     
      <Grid container alignItems="center">
        <Grid item xs>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">Lorem ipsum dolor sit amet.</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h3">
                <span>Lorem ipsum dolor sit</span>
                <br />
                <span>Lorem, ipsum.</span>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs="auto">
          <Button variant="contained" size="large">
            Contact me
          </Button>
        </Grid>
      </Grid>
    </CallToActionBox>
  );
};

export default CallToAction;
