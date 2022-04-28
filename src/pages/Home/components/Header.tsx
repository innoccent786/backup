import { Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import RoundedImage from "./RoundedImage";
import useStyles from "../styles";
import ReactTypingEffect from "react-typing-effect";

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  "&, & span": {
    fontSize: theme.spacing(10),
    // ListItemneHeight: "100px",
  },

  [theme.breakpoints.down("md")]: {
    "&, & span": {
      fontSize: theme.spacing(6),
      // ListItemneHeight: "50px",
    },
  },
}));

const HeaderDescription = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(2.5),
  maxWidth: 600,
}));

const Header: React.FC<any> = (props) => {
  const classes = useStyles();
  const animation = {
    "data-aos-mirror": "true",
    "data-aos-once": "true",
  };

  return (
    <>
      <Grid container spacing={3} className={classes.header} marginTop="3rem">
        <Button variant="contained" size="large" fullWidth={true}>
          Create Trade
        </Button>

        <Grid item xs={12} md>
          <Grid container spacing={3}>
            <Grid item xs={12} data-aos="fade-down" {...animation}>
              <ReactTypingEffect
                speed={200}
                eraseDelay={100}
                typingDelay={0}
                eraseSpeed={200}
                className={classes.animatedText}
                text={["Discover", "Instantly buy", "Analyse"]}
              />

              <Typography> the best NFTs on the market</Typography>
            </Grid>
            <Grid item xs={12} data-aos="fade-down" {...animation}>
              <HeaderDescription>
                A Impulso Social é uma solução prática e segura para adquirir
                seguidores reais no Instagram, Facebook, Youtube, Tiktok e
                aumentar sua presença onListItemne nas principais redes sociais
                do momento. Experimente nosso teste de seguidores grátis do
                Instagram agora sem precisar digitar sua senha e veja como
                podemos aumentar seu engajamento comercial ou perfil pessoal.
              </HeaderDescription>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12} data-aos="fade-up" {...animation}>
              <Button variant="contained" size="large">
                Get Started
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md>
          <RoundedImage
            src="https://via.placeholder.com/600x600/09f/fff.png"
            style={{ maxWidth: "100%" }}
            data-aos="fade-left"
            {...animation}
            alt="header"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
