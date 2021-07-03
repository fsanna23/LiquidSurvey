import React from "react";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { appBarStyle } from "./editor/editorStyles";

const useStyles = appBarStyle;

function NavBar(props) {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={() => {
            props.setDrawer(true);
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          LiquidSurvey
        </Typography>
        {/*<Button color="inherit">Login</Button>*/}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
