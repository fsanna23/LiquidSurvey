import React, { useState, useEffect } from "react";
// Material
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
// Classes
import { mainPageStyle } from "./components/editor/editorStyles";
// Router
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// Components
import MainPage from "./components/MainPage";
import NewSurvey from "./components/editor/NewSurvey";
import View from "./components/view/View";
import NavBar from "./components/NavBar";
// Drawer Icons
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import DescriptionIcon from "@material-ui/icons/Description";
/* Context per fare lo share dello state tra le pagine */
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./stateReducer";

const useStyles = mainPageStyle;

function App() {
  const classes = useStyles();
  const [showDrawer, setShowDrawer] = useState(false);
  // Context
  const [, dispatch] = useStateValue();

  useEffect(() => {
    const getSurveysFromServer = () => {
      fetch("http://localhost:9000/getSurveys")
        .then((response) => response.json())
        .then((data) =>
          dispatch({ type: actionTypes.SET_SURVEYS, surveys: data })
        );
    };
    getSurveysFromServer();
  }, [dispatch]);

  const switchDrawer = (value) => {
    setShowDrawer(value);
  };

  const renderDrawer = () => {
    return (
      <div className={classes.drawer}>
        <List>
          <Link to="/">
            <ListItem
              button
              onClick={() => {
                switchDrawer(false);
              }}
            >
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="Surveys" />
            </ListItem>
          </Link>
          <Link to="/">
            <ListItem
              button
              onClick={() => {
                switchDrawer(false);
              }}
            >
              <ListItemIcon>
                <TrendingUpIcon />
              </ListItemIcon>
              <ListItemText primary="Statistics" />
            </ListItem>
          </Link>
        </List>
      </div>
    );
  };

  return (
    <Router>
      <div className="app">
        <NavBar setDrawer={switchDrawer} />
        <Switch>
          <Route path="/createSurvey">
            <NewSurvey />
          </Route>
          <Route path="/viewSurvey">
            <View />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
        <Drawer
          anchor="left"
          open={showDrawer}
          onClose={() => {
            switchDrawer(false);
          }}
        >
          {renderDrawer()}
        </Drawer>
      </div>
    </Router>
  );
}

export default App;
