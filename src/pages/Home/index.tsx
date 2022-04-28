import { Container, Grid } from "@mui/material";
import { memo, useEffect } from "react";
import * as AOS from "aos";
import "aos/dist/aos.css";

import CallToAction from "./components/CallToAction";
import Testimonials from "./components/Testimonials";
import Services from "./components/Services";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Team from "./components/Team";
import AccordionBox from './components/AccordionBox';
import VideoSection from './components/VideoSection'
import {useSnackbar} from "notistack";
const Home = () => {
  const {enqueueSnackbar} = useSnackbar();
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  /**
         * Show notifications
         */
   useEffect(() => {
    enqueueSnackbar("Trade confirmed", {
        variant: "success",
    });
    enqueueSnackbar("Trade not confirmed", {
        variant: "warning",
    });
    enqueueSnackbar("Unexpected error", {
        variant: "error",
    });
}, [enqueueSnackbar]);

  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ marginBottom: 8 }}>
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12}>
            <VideoSection />
          </Grid>
          <Grid item xs={12}>
            <About />
          </Grid>
          <Grid item xs={12}>
            <Services />
          </Grid>
          <Grid item xs={12}>
            <Features />
          </Grid>
          <Grid item xs={12}>
            <Team />
          </Grid>
          <Grid item xs={12}>
            <Testimonials />
          </Grid>
          <Grid item xs={12}>
            <AccordionBox />
          </Grid>
          <Grid item xs={12}>
            <CallToAction />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default memo(Home);
