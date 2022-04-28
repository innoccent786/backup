import { Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/system";
import React from "react";

import SectionHeader from "./SectionHeader";

const Testimonial = styled("div")(({ theme }) => ({
  borderRadius: theme.spacing(5),
  backgroundColor: grey[900],
  padding: theme.spacing(6),

  img: {
    borderRadius: theme.spacing(2),
    height: 100,
    width: 100,
  },
}));

const Testimonials: React.FC<any> = (props) => {
  const animation = {
    "data-aos-mirror": "true",
    "data-aos-once": "true",
  };

  return (
    <Grid container spacing={3} alignItems="flex-end">
      <Grid item xs={12} data-aos="fade-up" {...animation}>
        <SectionHeader align="center">
          <span>Lorem, ipsum.</span>
          <h2>Lorem ipsum dolor sit amet.</h2>
        </SectionHeader>
      </Grid>
      {[
        {
          name: "John Doe",
          job: "CEO",
          avatar: "https://source.unsplash.com/random",
          quote:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo itaque consectetur quae, voluptatibus sapiente illum ducimus dolore porro!",
        },
        {
          name: "Carla Doe",
          job: "CEO",
          avatar: "https://source.unsplash.com/random",
          quote:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo itaque consectetur quae, voluptatibus sapiente illum ducimus dolore porro! Magnam accusamus deleniti, eligendi quod doloribus enim quia ex mollitia assumenda, dignissimos maxime amet suscipit beatae reiciendis?",
        },
        {
          name: "Foo Doe",
          job: "CEO",
          avatar: "https://source.unsplash.com/random",
          quote:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo itaque consectetur quae, voluptatibus sapiente illum ducimus dolore porro!",
        },
      ].map((item, index) => (
        <Grid
          data-aos-delay={index === 1 ? 0 : 500}
          md={index === 1 ? 5 : true}
          data-aos="zoom-out"
          {...animation}
          key={index}
          xs={12}
          item
        >
          <Testimonial>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <img src={`${item.avatar}/${index}`} alt={item.name} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">{item.name}</Typography>
                <Typography variant="h6" color="secondary">
                  {item.job}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" component="span" fontWeight="normal">
                  {item.quote}
                </Typography>
              </Grid>
            </Grid>
          </Testimonial>
        </Grid>
      ))}
    </Grid>
  );
};

export default Testimonials;
