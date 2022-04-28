import { Grid, Typography } from "@mui/material";
import { Check } from "@mui/icons-material";
import { styled } from "@mui/system";
import React from "react";

import SectionHeader from "./SectionHeader";
import { blue } from "@mui/material/colors";
import RoundedImage from "./RoundedImage";

const Feature = styled<any>("div")(({ theme, ...props }) => ({
  alignItems: "center",
  display: "flex",
  span: {
    fontWeight: "bold",
  },

  "& .icon": {
    borderRadius: theme.spacing(2),
    marginRight: theme.spacing(2),
    justifyContent: "center",
    alignItems: "center",
    background: blue[500],
    fontSize: "2rem",
    display: "flex",
    height: 70,
    width: 70,
  },
}));

const Team: React.FC<any> = (props) => {
  const animation = {
    "data-aos-mirror": "true",
    "data-aos-once": "true",
  };

  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} data-aos="fade-up" {...animation}>
            <SectionHeader align="left">
              <span>Lorem, ipsum.</span>
              <h2>Lorem ipsum dolor sit amet consectetur adipisicing.</h2>
            </SectionHeader>
          </Grid>
          <Grid item xs={12} data-aos="fade-up" {...animation}>
            <Typography
              sx={{ maxWidth: 500 }}
              fontWeight="normal"
              component="span"
              variant="h6"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae, ratione! Sapiente modi facere hic et porro perferendis
              cupiditate corrupti voluptatibus?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container columnSpacing={3} rowSpacing={5}>
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <Grid
                    data-aos-easing="ease-in-back"
                    data-aos-delay={i * 500}
                    data-aos="fade-zoom-in"
                    {...animation}
                    xs={12}
                    key={i}
                    sm={6}
                    item
                  >
                    <Feature>
                      <div className="icon">
                        <Check fontSize="inherit" />
                      </div>
                      <div>
                        <Typography component="span">
                          Lorem, ipsum dolor.
                        </Typography>
                      </div>
                    </Feature>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md="auto">
        <RoundedImage
          src="https://via.placeholder.com/600x600/09f/fff.png"
          alt="side"
        />
      </Grid>
    </Grid>
  );
};

export default Team;
