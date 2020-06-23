import React, { useState, useRef, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import { withRouter } from "react-router-dom";
import { Drawer } from "@material-ui/core";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatIcon from "@material-ui/icons/Chat";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  grow: {
    display: "flex",
    flexGrow: 1,
  },
  menuButton: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none",
      marginRight: theme.spacing(2),
    },
  },
  title: {
    display: "none",
    "&:hover": {
      cursor: "pointer",
    },
    lineHeight: "2",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      flexGrow: 1,
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: "flex",
    flexGrow: 2,
    justifyContent: "flex-start",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  input: {
    color: "inherit",
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create("width"),
    marginLeft: theme.spacing(1),
    width: "100%",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  iconButton: {
    color: "inherit",
    padding: 10,
  },
  menuList: {
    width: 250,
  },
  menuLink: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const Navigation = (props) => {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const searchInputRef = useRef();
  const ENTER_KEY = 13;
  const menuVisibilityStyle = {
    display: isLoggedIn || !sessionStorage.getItem("user") ? "flex" : "none",
  };

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      setIsLoggedIn(true);
    }
  }, [sessionStorage.getItem("user")]);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      props.history.push("/search/", { searchQuery: searchQuery });
      setSearchQuery("");
      searchInputRef.current.value = "";
    } else {
      alert("Please enter a search query");
    }
  };

  const goHome = () => {
    props.history.push("/");
  };

  const goToLogin = () => {
    props.history.push("/loginRegister");
  };

  const logoutUser = () => {
    sessionStorage.removeItem("user");
    setIsLoggedIn(false);
    setOpenSnackBar(true);
  };

  const keyPress = (event) => {
    if (event.keyCode === ENTER_KEY) {
      handleSearch();
    }
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  let messagingListItem = null;
  let notificationsListItem = null;

  if (isLoggedIn) {
    messagingListItem = (
      <ListItem button>
        <ListItemIcon>
          <ChatIcon />
        </ListItemIcon>
        <ListItemText>
          <Link to="/messaging" className={classes.menuLink}>
            Messaging
          </Link>
        </ListItemText>
      </ListItem>
    );
    notificationsListItem = (
      <ListItem button>
        <ListItemIcon>
          <NotificationsIcon />
        </ListItemIcon>
        <ListItemText>
          <Link to="/Notifications" className={classes.menuLink}>
            Notifications
          </Link>
        </ListItemText>
      </ListItem>
    );
  }

  return (
    <div className={classes.grow}>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <div className={classes.menuList} onClick={() => setDrawerOpen(false)}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>
                <Link to="/" className={classes.menuLink}>
                  Read-it
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText>
                <Link to="/forums" className={classes.menuLink}>
                  Forums
                </Link>
              </ListItemText>
            </ListItem>
            {messagingListItem}
            {notificationsListItem}
            <ListItem
              button
              onClick={() => (isLoggedIn ? logoutUser() : () => {})}
            >
              <ListItemIcon>
                <VerifiedUserIcon />
              </ListItemIcon>
              <ListItemText>
                {isLoggedIn ? (
                  "Logout"
                ) : (
                  <Link to="/loginRegister" className={classes.menuLink}>
                    Log-in/Register
                  </Link>
                )}
              </ListItemText>
            </ListItem>
          </List>
        </div>
      </Drawer>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.grow}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              style={menuVisibilityStyle}
              color="inherit"
              aria-label="open drawer"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.title}
              variant="h5"
              onClick={() => goHome()}
            >
              Read-it
            </Typography>
          </div>

          <div className={classes.search}>
            <InputBase
              className={classes.input}
              placeholder="Search"
              inputProps={{
                "aria-label": "search google maps",
                onKeyDown: (e) => keyPress(e),
              }}
              onChange={(event) => setSearchQuery(event.target.value)}
              inputRef={searchInputRef}
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
              onClick={() => handleSearch()}
            >
              <SearchIcon />
            </IconButton>
          </div>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button
              color="inherit"
              onClick={() => (isLoggedIn ? logoutUser() : goToLogin())}
            >
              {isLoggedIn ? "Logout" : "Log-in/Register"}
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackBar}
          severity="success"
        >
          You are now logged out!
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default withRouter(Navigation);
