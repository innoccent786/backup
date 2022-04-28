import {
  ListItemIcon,
  ListItemText,
  Typography,
  ListItem,
  Grid,
  Link,
  List,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Image } from "@mui/icons-material";
import { styled } from "@mui/system";
import React from "react";

import SectionHeader from "./SectionHeader";

const Feature = styled<any>("div")(({ theme, index }) => ({
  borderRadius: theme.spacing(3),
  backgroundImage:
    index === 1
      ? "linear-gradient(180deg, #5491E5 0%, #3477D3 100%)"
      : index === 2
      ? "linear-gradient(180deg, #7A54C8 0%, #6443A7 100%)"
      : index === 3
      ? "linear-gradient(180deg, #4D545F 0%, #687281 100%)"
      : "linear-gradient(180deg, #B74444 0%, #542828 100%)",
  padding: theme.spacing(13, 3),

  "& .icon": {
    borderRadius: theme.spacing(2),
    margin: "0 auto",
    display: "block",
  },
}));

const Features: React.FC<any> = (props) => {
  const animation = {
    "data-aos-mirror": "true",
    "data-aos-once": "true",
  };

  return (
    <Grid container spacing={10} alignItems="flex-end">
      <Grid item xs={12} data-aos="fade-up" {...animation}>
        <SectionHeader align="center">
          <span>Lorem ipsum dolor sit amet consectetur adipisicing.</span>
          <h2>Lorem ipsum dolor sit amet consectetur.</h2>
        </SectionHeader>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          {Array(4)
            .fill({})
            .map((_, i) => (
              <Grid
                data-aos={
                  i === 0 ? "fade-right" : i < 3 ? "fade-up" : "fade-left"
                }
                {...animation}
                key={i}
                item
                xs
              >
                <Feature index={i + 1}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <img
                        src="https://via.placeholder.com/80x80/fff/000.png"
                        className="icon"
                        alt="example"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h4" align="center" component="p">
                        Example
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <List>
                        {Array(7)
                          .fill({})
                          .map((_, i) => (
                            <Link component={RouterLink} to="#test" key={i}>
                              <ListItem button>
                                <ListItemIcon>
                                  <Image />
                                </ListItemIcon>
                                <ListItemText primary="Single-line item" />
                              </ListItem>
                            </Link>
                          ))}
                      </List>
                    </Grid>
                  </Grid>
                </Feature>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Features;
