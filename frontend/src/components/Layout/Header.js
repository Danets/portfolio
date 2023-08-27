import { useState, useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HouseIcon from "@mui/icons-material/House";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import TaskIcon from "@mui/icons-material/Task";
import PostAddIcon from "@mui/icons-material/PostAdd";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../../App";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import styles from "./Header.module.css";
import Navigation from "./Navigation";
import CartButton from "./CartButton";
import UserMenu from "./UserMenu";
import sushiImg from "../../assets/sushi.jpg";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Header = ({ onOpenModal }) => {
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <div className={styles.wrapper}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                <MenuIcon />
              </IconButton>
              <Navigation />
              <CartButton onOpenModal={onOpenModal} />
              <IconButton
                sx={{ ml: 1 }}
                onClick={colorMode.toggleColorMode}
                color="inherit"
              >
                {theme.palette.mode === "dark" ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
              {userInfo && <UserMenu />}
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <CloseIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {[
              { title: "Home", to: "/" },
              { title: "Food", to: "/food" },
              { title: "Tasks", to: "/tasks" },
              { title: "Posts", to: "/posts" },
            ].map((link, index) => (
              <ListItem key={index} disablePadding>
                <NavLink className={styles.link} key={index} to={link.to} exact={link.exact}>
                  <ListItemIcon>
                    {index === 0 ? <HouseIcon /> : ""}
                    {index === 1 ? <FoodBankIcon /> : ""}
                    {index === 2 ? <TaskIcon /> : ""}
                    {index === 3 ? <PostAddIcon /> : ""}
                  </ListItemIcon>
                  {link.title}
                </NavLink>
              </ListItem>
            ))}
          </List>
          <Divider />
          {!userInfo && (
            <List>
              {[
                { title: "Login", to: "/signin" },
                { title: "Signup", to: "/signup" },
              ].map((link, index) => (
                <ListItem key={index} disablePadding>
                  <NavLink className={styles.link} key={index} to={link.to} exact={link.exact}>
                    <ListItemIcon>
                      {index === 0 ? <LoginIcon /> : ""}
                      {index === 1 ? <HowToRegIcon /> : ""}
                    </ListItemIcon>
                    {link.title}
                  </NavLink>
                </ListItem>
              ))}
            </List>
          )}
          {userInfo && <UserMenu />}
        </Drawer>
      </Box>
      <div className={styles["main-image"]}>
        <img src={sushiImg} alt="Sushi" />
      </div>
    </>
  );
};

export default Header;
