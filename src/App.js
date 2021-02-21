import React, { useState, useContext } from "react";
import NavBar from "./components/editor/NavBar";
import MainPage from "./components/editor/MainPage";
import NewSurvey from "./components/editor/NewSurvey";
import View from "./components/view/View";
import pages from "./components/pages";
import Drawer from "@material-ui/core/Drawer";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { appStyle } from "./editorStyles";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import DescriptionIcon from "@material-ui/icons/Description";
import { mySimpleSurvey, mySurvey } from "./tmpSurveys";
import SelectedSurveyContext from "./SelectedSurveyContext";

const useStyles = appStyle;

// Initial surveys
const surveyz = [mySurvey, mySimpleSurvey];

function App() {
  const classes = useStyles();
  const [surveys, setSurveys] = useState(surveyz);
  const [page, setPage] = useState(pages.MAIN);
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState({});

  const switchDrawer = (value) => {
    setShowDrawer(value);
  };

  const addSurvey = (newSurvey) => {
    setSurveys([...surveys, newSurvey]);
  };

  const checkPage = () => {
    switch (page) {
      case pages.MAIN:
        return (
          <MainPage
            surveys={surveys}
            setPage={setPage}
            selectSurvey={setSelectedSurvey}
          />
        );
      case pages.NEWSURVEY:
        return <NewSurvey setPage={setPage} addSurvey={addSurvey} />;
      case pages.VIEWSURVEY:
        return (
          <SelectedSurveyContext.Provider value={selectedSurvey}>
            <View />
          </SelectedSurveyContext.Provider>
        );
    }
  };

  const renderDrawer = () => {
    const renderIcon = (index) => {
      switch (index) {
        case 0:
          return <DescriptionIcon />;
        case 1:
          return <TrendingUpIcon />;
      }
    };
    const onItemClick = (index) => {
      switch (index) {
        case 0:
          setPage(pages.MAIN);
          setShowDrawer(false);
          return;
        default:
          return;
      }
    };
    return (
      <div className={classes.drawer}>
        <List>
          {["Surveys", "Statistics"].map((text, index) => (
            <ListItem
              button
              key={text}
              onClick={() => {
                onItemClick(index);
              }}
            >
              <ListItemIcon>{renderIcon(index)}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  };

  return (
    <div>
      <NavBar setDrawer={switchDrawer} />
      {checkPage()}
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
  );
}

export default App;
