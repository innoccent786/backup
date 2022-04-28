import {
  ListItemButton,
  ListItemText,
  IconButton,
  Container,
  Collapse,
  Popover,
  Toolbar,
  Hidden,
  Drawer,
  AppBar,
  Button,
  Badge,
  Grid,
  List,
  Link,
} from "@mui/material";
import {
  KeyboardArrowDown,
  ExpandLess,
  ExpandMore,
  Menu,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import React, { Fragment } from "react";
import { styled } from "@mui/system";

import useStyles from "../styles";

declare global {
  interface Window {
    ethereum: any;
    ethers: any;
  }
}
const TraderIds: React.FC<any> = ({ label}) => {
    return (
      <>
        <div className="partner-label" >
          <p> <span style={{color:"green"}}>&#9679;</span> Trade: tradeid{label}</p>
        </div>
      </>
    );
  };

const allTrader = [
  {
    label: <TraderIds label={'1234567'} />,
    link: "1234567",
  },
  {
    label: <TraderIds label={'1234567'} />,
    link: "2225364",
  },
  { label: <TraderIds label={'1234567'} />, link: "7896554" },
  { label: <TraderIds label={'1234567'} />, link: "7896554" },
  { label: <TraderIds label={'1234567'} />, link: "7896554" },
  { label: <TraderIds label={'1234567'} />, link: "7896554" },
  { label: <TraderIds label={'1234567'} />, link: "7896554" },

  {
    label: <TraderIds label={'1234567'} />,
    link: "8796756",
  },
];
const links = [
  {
    label: "Example 1",
    url: "#",
    children: [
      { label: "Link 1", link: "#test" },
      { label: "Link 2", link: "#test2" },
    ],
  },
  {
    label: "Traders",
    url: "#",
    children: allTrader,
  },
  {
    label: "Example 3",
    url: "#",
    children: [
      { label: "Link 1", link: "#test5" },
      { label: "Link 2", link: "#test7" },
    ],
  },
  {
    label: "Example 4",
    url: "#test7",
    children: [
      { label: "Link 1", link: "#test7" },
      { label: "Link 2", link: "#test7" },
    ],
  },
  {
    label: "Example 5",
    url: "#wow",
    children: [],
  },
];

const DarkDrawer = styled(Drawer)(({ theme }) => ({
  ".MuiPaper-root": {
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    maxWidth: 300,
    width: "100%",
  },
}));



const Navbar: React.FC<any> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openMenu, setOpenMenu] = React.useState<number | null>(null);
  const [open, openSidebar] = React.useState<boolean>(false);
  const [popoverLinks, setPopoverLinks] = React.useState<
    {
      label: any;
      link: any;
    }[]
  >([]);
  const classes = useStyles();

  const openPopover =
    (children: { label: any; link: any }[]) => (event: any) => {
      setPopoverLinks(children);
      setAnchorEl(event.currentTarget);
    };

  const closePopover = () => setAnchorEl(null);

  const toggleSidebar = (open: boolean) => () => openSidebar(open);
  const toggleMenu = (menu: number) => () =>
    setOpenMenu(openMenu === menu ? null : menu);

  // @ts-ignore
  const userWallet = data.walletAddress;
  // @ts-ignore
  const n = data.n;
  const ethers = window.ethers;
  let buttonText = userWallet ? "Create Trade" : "Connect Wallet";

  const mainButtonClick = async () => {
    if (!userWallet) {
      try {
        await window.ethereum.send("eth_requestAccounts");
      } catch (e) {
        console.log(e); //todo die nachricht als error im frontend zeigen
        return;
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signMessage =
        "I hereby confirm, that this is my wallet or I am allowed to use it on this Website. Security Hash: " +
        n;
      const signature = await signer.signMessage(signMessage);
      const address = await signer.getAddress();

      const params = {
        walletAddress: address,
        signature: signature,
        message: signMessage,
      };

      const form = document.createElement("form");
      form.method = "post";
      form.action = "/login";

      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          const hiddenField = document.createElement("input");
          hiddenField.type = "hidden";
          hiddenField.name = key;
          // @ts-ignore
          hiddenField.value = params[key];

          form.appendChild(hiddenField);
        }
      }

      document.body.appendChild(form);
      form.submit();

      //window.location.reload();
    } else {
      window.location.href = "/trade/open/";
    }
  };

  return (
    <Fragment>
      <AppBar color="inherit" elevation={4}>
        <Container maxWidth="xl">
          <Toolbar disableGutters classes={{ root: classes.toolbar }}>
            <Grid container columnSpacing={2} alignItems="center">
              <Grid item xs="auto" sx={{ display: "flex" }}>
                <img
                  src="https://via.placeholder.com/300x80/09f/fff.png"
                  className={classes.navbarLogo}
                  alt="logo"
                />
              </Grid>
              <Hidden mdDown>
                <Grid item xs>
                  <Grid container columnSpacing={1} justifyContent="center">
                    {links.map((link, index) =>
                      link.children.length > 0 ? (
                        <Grid item key={index}>
                          <Button
                            endIcon={
                              link.children.length > 0 ? (
                                <KeyboardArrowDown />
                              ) : null
                            }
                            onClick={openPopover(link.children)}
                            disableElevation
                          >
                            {link.label}
                          </Button>
                        </Grid>
                      ) : (
                        <Grid item key={index}>
                          <Link
                            component={RouterLink}
                            underline="none"
                            to={link.url}
                          >
                            <Button>{link.label}</Button>
                          </Link>
                        </Grid>
                      )
                    )}

                    <Popover
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                      open={Boolean(anchorEl) && Boolean(popoverLinks.length)}
                      onClose={closePopover}
                      disableRestoreFocus
                      anchorEl={anchorEl}
                      id="links-popover"
                    >
                      <List
                      style={{
                        height:'250px',
                        width:'250px'
                      }} 
                      >
                        {popoverLinks.map(({ label, link }, index) => (
                          <Link
                            component={RouterLink}
                            underline="none"
                            to={link}
                          >
                            <ListItemButton key={index}>{label}</ListItemButton>
                          </Link>
                        ))}
                      </List>
                    </Popover>
                  </Grid>
                </Grid>
                <Grid item xs="auto">
                  <Button
                    variant="contained"
                    disableElevation
                    color="primary"
                    onClick={mainButtonClick}
                  >
                    {buttonText}
                  </Button>
                </Grid>
              </Hidden>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Placeholder */}
      <div className={classes.toolbar}></div>

      {/* Side menu */}
      <Hidden mdUp>
        <DarkDrawer open={open} onClose={toggleSidebar(false)}>
          <Grid container>
            <Grid item xs={12}>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
                component="nav"
              >
                {/*{links.map((link, index) => (*/}
                {/*    <Fragment key={index}>*/}
                {/*        <ListItemButton onClick={toggleMenu(index)}>*/}
                {/*            <ListItemText primary={link.label}/>*/}
                {/*            {link.children.length > 0 ? (*/}
                {/*                openMenu === index ? (*/}
                {/*                    <ExpandLess/>*/}
                {/*                ) : (*/}
                {/*                    <ExpandMore/>*/}
                {/*                )*/}
                {/*            ) : null}*/}
                {/*        </ListItemButton>*/}
                {/*        {link.children.length > 0 && (*/}
                {/*            <Collapse*/}
                {/*                in={openMenu === index}*/}
                {/*                timeout="auto"*/}
                {/*                unmountOnExit*/}
                {/*            >*/}
                {/*                <List component="div" disablePadding>*/}
                {/*                    {link.children.map((child, index) => (*/}
                {/*                        <ListItemButton sx={{pl: 4}}>*/}
                {/*                            <ListItemText primary={child.label}/>*/}
                {/*                        </ListItemButton>*/}
                {/*                    ))}*/}
                {/*                </List>*/}
                {/*            </Collapse>*/}
                {/*        )}*/}
                {/*    </Fragment>*/}
                {/*))}*/}
              </List>
            </Grid>
          </Grid>
        </DarkDrawer>
      </Hidden>
    </Fragment>
  );
};

Navbar.propTypes = {};

export default Navbar;
