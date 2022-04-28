import { Instagram, Telegram, Twitter, WhatsApp } from "@mui/icons-material";
import {
  InputAdornment,
  Typography,
  IconButton,
  TextField,
  Container,
  Button,
  Grid,
  Link,
  List,
  ListItemButton,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/system";
import React from "react";

const MainFooter = styled("div")(({ theme }) => ({
  padding: theme.spacing(6, 0),
  backgroundColor: grey[800],
}));

const FooterRights = styled("div")(({ theme }) => ({
  borderTop: `2px solid #fff`,
  backgroundColor: grey[900],
  alignItems: "center",
  height: "100px",
  display: "flex",
}));

const Footer: React.FC<any> = (props) => {
  const animation = {
    "data-aos-mirror": "true",
    "data-aos-once": "true",
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <MainFooter>
          <Container maxWidth="xl">
            <Grid container spacing={3}>
              {/* Menu 1 */}
              <Grid item xs={12} md={4}>
                <Grid
                  data-aos-easing="ease-in-back"
                  data-aos="fade-zoom-in"
                  spacing={3}
                  container
                  {...animation}
                >
                  <Grid item>
                    <img
                      src="https://via.placeholder.com/300x80/09f/fff.png"
                      alt="Logo"
                    />
                  </Grid>
                  <Grid item data-aos="fade-left" {...animation}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Unde ex itaque quasi iure odio saepe quidem numquam quam
                    delectus minus!
                  </Grid>
                  <Grid item data-aos="fade-left" {...animation}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Perferendis, quos?
                  </Grid>
                  <Grid item data-aos="fade-left" {...animation}>
                    <Grid container spacing={3}>
                      {[Twitter, WhatsApp, Instagram, Telegram].map(
                        (Icon, index) => (
                          <Grid item key={index}>
                            <IconButton href="/">
                              <Icon />
                            </IconButton>
                          </Grid>
                        )
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {/* Menu 2 and 3 */}
              {[0, 0].map((_, index) => (
                <Grid
                  item
                  xs={12}
                  md
                  lg={2}
                  key={index}
                  data-aos="fade-left"
                  {...animation}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant="h6">Menu title</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <List>
                        {Array(5)
                          .fill({})
                          .map((_, index) => (
                            <Link
                              href="https://google.com"
                              target="_blank"
                              key={index}
                            >
                              <ListItemButton>
                                Menu {index + 1} item {index + 1}
                              </ListItemButton>
                            </Link>
                          ))}
                      </List>
                    </Grid>
                  </Grid>
                </Grid>
              ))}

              {/* Menu 4 newsletters */}
              <Grid item xs={12} md={4} data-aos="fade-left" {...animation}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h6">Menu title</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ut, dolores aspernatur possimus mollitia necessitatibus
                      veniam!
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button variant="contained" color="secondary">
                              Submit
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </MainFooter>
      </Grid>

      {/* Rights footer */}
      <Grid item xs={12}>
        <FooterRights>
          <Container maxWidth="xl">
            <Typography>© 2021 example.com - All rights reserved.</Typography>
          </Container>
        </FooterRights>
      </Grid>
    </Grid>
  );
};

export default Footer;
