import React from "react";
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
import { useHistory, Link } from "react-router-dom";

// App Context
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../stateReducer";

const useStyles = mainPageStyle;

function MainPage() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  // App Context
  const [{ surveys, selectedSurvey }, dispatch] = useStateValue();

  // Router
  // const history = useHistory();

  /* Menu anchor functions */

  const onSurveyMenuOpen = (event, survey) => {
    console.log("Opening menu for survey: ", survey);
    dispatch({ type: actionTypes.SELECT_SURVEY, survey: survey });
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    dispatch({ type: actionTypes.SELECT_SURVEY, survey: null });
    setAnchorEl(null);
  };

  /* Click functions */

  const onCreateSurvey = () => {
    /* Remove selected survey from state (if it stays
      the app will think it's editing something) */
    dispatch({ type: actionTypes.SELECT_SURVEY, survey: null });
    // history.push("/createSurvey");
  };

  const onViewSurvey = (survey) => {
    dispatch({ type: actionTypes.SELECT_SURVEY, survey });
    // history.push("/viewSurvey");
  };

  const onEditSurvey = (survey) => {
    dispatch({ type: actionTypes.SELECT_SURVEY, survey });
    // history.push("/createSurvey");
  };

  const onDeleteSurvey = () => {
    console.log("Deleting survey: ", selectedSurvey);
    setAnchorEl(null);
    dispatch({ type: actionTypes.DELETE_SURVEY, id: selectedSurvey.id });
    fetch("http://localhost:9000/deleteSurvey", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedSurvey),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== "saved") {
          console.error("FAILED TO DELETE THE SURVEY");
        } else {
          console.log("DELETED!!!!");
        }
      });
  };

  /* Render functions */

  const displaySurveys = (surveysPar) => {
    return surveysPar.map((survey) => {
      return (
        <Grid item key={survey.title}>
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
            {displaySurveys(surveys)}
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
