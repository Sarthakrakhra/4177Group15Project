import React, { useState, useRef } from "react";
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

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    display: "block",
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
}));

const Navigation = (props) => {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef();

  const handleSearch = () => {
    props.history.push("/search/", { searchQuery: searchQuery });
    setSearchQuery("");
    searchInputRef.current.value = "";
  };

  const goHome = () => {
    props.history.push("/");
  };

  const goToLogin = () => {
    props.history.push("/loginRegister");
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.grow}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
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
              inputProps={{ "aria-label": "search google maps" }}
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
            <Button color="inherit" onClick={() => goToLogin()}>
              Login/Register
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Navigation);
