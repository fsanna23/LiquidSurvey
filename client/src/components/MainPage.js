import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import MoreIcon from "@material-ui/icons/MoreVert";
import { mainPageStyle } from "./editor/editorStyles";

// React Router
import { Link } from "react-router-dom";

// App Context
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../stateReducer";

const useStyles = mainPageStyle;

function MainPage() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  // App Context
  const [{ surveys, templates, selectedSurvey }, dispatch] = useStateValue();

  useEffect(() => {
    /*fetch("http://localhost:9000/getTemplates")
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: actionTypes.SET_TEMPLATES, templates: data });
      });
    fetch("http://localhost:9000/getSurveys")
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: actionTypes.SET_SURVEYS, surveys: data })
      );*/
  }, [templates]);

  /* Menu anchor functions */

  const onSurveyMenuOpen = (event, survey) => {
    console.log("Opening menu for survey: ", survey);
    dispatch({
      type: actionTypes.SELECT_SURVEY,
      survey: { survey: survey, useTemplate: false },
    });
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    dispatch({ type: actionTypes.SELECT_SURVEY, survey: null });
    setAnchorEl(null);
  };

  /* Click functions */

  const onCreateSurvey = () => {
    dispatch({
      type: actionTypes.SELECT_SURVEY,
      survey: { survey: null, useTemplate: false },
    });
  };

  const onUseTemplate = (survey) => {
    /*  This line creates a new object that contains all the values from the parameter
        obj. If I don't do this, both the new survey and the old one are changed. */
    const tempSurvey = JSON.parse(JSON.stringify(survey));
    dispatch({
      type: actionTypes.SELECT_SURVEY,
      survey: { survey: tempSurvey, useTemplate: true },
    });
  };

  const onViewSurvey = (survey) => {
    dispatch({
      type: actionTypes.SELECT_SURVEY,
      survey: { survey: survey, useTemplate: false },
    });
  };

  const onEditSurvey = (survey) => {
    /*  This line creates a new object that contains all the values from the parameter
        obj. If I don't do this, both the new survey and the old one are changed. */
    const tempSurvey = JSON.parse(JSON.stringify(survey));
    dispatch({
      type: actionTypes.SELECT_SURVEY,
      survey: { survey: tempSurvey, useTemplate: false },
    });
  };

  const onDeleteSurvey = () => {
    console.log("Deleting survey: ", selectedSurvey.survey);
    setAnchorEl(null);

    if (selectedSurvey.survey.isTemplate) {
      dispatch({
        type: actionTypes.DELETE_TEMPLATE,
        id: selectedSurvey.survey.id,
      });
      fetch("http://localhost:9000/deleteTemplate", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedSurvey.survey),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status !== "saved") {
            console.error("FAILED TO DELETE THE SURVEY");
          } else {
            console.log("DELETED!!!!");
          }
        });
    } else {
      dispatch({
        type: actionTypes.DELETE_SURVEY,
        id: selectedSurvey.survey.id,
      });
      fetch("http://localhost:9000/deleteSurvey", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedSurvey.survey),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status !== "saved") {
            console.error("FAILED TO DELETE THE SURVEY");
          } else {
            console.log("DELETED!!!!");
          }
        });
    }
  };

  console.log("The templates are: ", templates);

  /* Render functions */

  const displaySurveys = (surveysPar, isTemplate) => {
    return surveysPar.map((survey, index) => {
      return (
        <Grid
          item
          key={survey.id !== undefined ? survey.id : "survey-" + index}
        >
          <Card className={classes.cardRoot} variant="outlined">
            <CardContent className={classes.cardContent}>
              <Typography variant="h6" className={classes.cardTitle}>
                {survey.title}
              </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Link to="/createSurvey">
                <Button
                  variant="contained"
                  color="default"
                  size="small"
                  onClick={() => {
                    onEditSurvey(survey);
                  }}
                >
                  Edit
                </Button>
              </Link>
              {isTemplate === false ? (
                <Link to="/viewSurvey">
                  <Button
                    variant="contained"
                    color="default"
                    size="small"
                    onClick={() => {
                      onViewSurvey(survey);
                    }}
                  >
                    Open
                  </Button>
                </Link>
              ) : (
                <Link to="/createSurvey">
                  <Button
                    variant="contained"
                    color="default"
                    size="small"
                    onClick={() => {
                      onUseTemplate(survey);
                    }}
                  >
                    Use
                  </Button>
                </Link>
              )}

              <IconButton
                className={classes.moreButton}
                onClick={(e) => {
                  onSurveyMenuOpen(e, survey);
                }}
              >
                <MoreIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      );
    });
  };

  console.log("Rendering MainPage.js");

  return (
    <Box component="div" className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Typography variant="h4" className={classes.surveyTitle}>
          Your Surveys
        </Typography>
        <Grid item xs={10}>
          <Grid
            container
            direction="row"
            spacing={5}
            className={classes.cardDeck}
          >
            {displaySurveys(surveys, false)}
          </Grid>
        </Grid>
        <Link to="/createSurvey">
          <Button
            variant="contained"
            color="primary"
            className={classes.cardDeck}
            onClick={onCreateSurvey}
          >
            Create new survey
          </Button>
        </Link>
      </Grid>
      {/* Templates */}
      <Grid container direction="column" justify="center" alignItems="center">
        <Typography variant="h4" className={classes.surveyTitle}>
          Your Templates
        </Typography>
        <Grid item xs={10}>
          <Grid
            container
            direction="row"
            spacing={5}
            className={classes.cardDeck}
          >
            {displaySurveys(templates, true)}
          </Grid>
        </Grid>
      </Grid>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Rename</MenuItem>
        <MenuItem onClick={onDeleteSurvey}>Delete</MenuItem>
      </Menu>
    </Box>
  );
}

export default MainPage;
