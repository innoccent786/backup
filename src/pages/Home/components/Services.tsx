import { Button, Grid, Typography } from "@mui/material";
import { Image } from "@mui/icons-material";
import { styled } from "@mui/system";
import React from "react";

import SectionHeader from "./SectionHeader";
import { blue } from "@mui/material/colors";

const ServiceBox = styled<any>("div")(({ theme, index }) => ({
  borderRadius: theme.spacing(3),
  padding: theme.spacing(5),
  justifyContent: "center",
  transition: "all .3s",
  alignItems: "center",
  background: "#fff",
  cursor: "pointer",
  display: "flex",
  color: "#000",
  maxHeight: 330,
  maxWidth: 330,
  height: "100%",
  width: "100%",

  ".icon": {
    borderRadius: theme.spacing(3),
    justifyContent: "center",
    transition: "all .3s",
    background: blue[500],
    alignItems: "center",
    margin: "0 auto",
    display: "flex",
    height: 140,
    width: 140,

    fontSize: "4rem",
    color: "#fff",
  },

  "&:hover": {
    background: blue[500],
    color: "#fff",

    ".icon": {
      background: "#fff",
      color: blue[500],
    },
  },
}));

const Services: React.FC<any> = (props) => {
  const animation = {
    "data-aos-mirror": "true",
    "data-aos-once": "true",
  };

  return (
    <Grid container spacing={15} alignItems="center">
      <Grid
        sx={(theme) => ({ [theme.breakpoints.down("md")]: { order: 2 } })}
        item
        xs
      >
        <Grid container spacing={3}>
          {Array(4)
            .fill({})
            .map((_, i) => (
              <Grid
                data-aos-delay={i * 500}
                data-aos-duration={2000}
                data-aos="fade-up"
                {...animation}
                key={i}
                xs={12}
                md={6}
                item
              >
                <ServiceBox>
                  <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12}>
                      <div className="icon">
                        <Image fontSize="inherit" />
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        color="inherit"
                        variant="h4"
                        component="p"
                        align="center"
                      >
                        Example
                      </Typography>
                    </Grid>
                  </Grid>
                </ServiceBox>
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={(theme) => ({ [theme.breakpoints.down("md")]: { order: 1 } })}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} data-aos="fade-down" {...animation}>
            <SectionHeader align="left">
              <span>Lorem, ipsum.</span>
              <h2>Lorem ipsum dolor sit amet consectetur adipisicing.</h2>
            </SectionHeader>
          </Grid>
          <Grid item xs={12} data-aos="fade-down" {...animation}>
            <Typography
              sx={{ maxWidth: 500 }}
              fontWeight="normal"
              component="p"
              variant="h6"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
              vitae debitis voluptas aut ipsam corrupti quisquam molestias sequi
              earum accusamus.
            </Typography>
          </Grid>
          <Grid item xs={12} data-aos="fade-up" {...animation}>
            <Button variant="contained" size="large" color="primary">
              Test now
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Services;
