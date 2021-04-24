import React, { useEffect, useState, useReducer } from "react";
// Material
import { Box, Button, Grid, TextField, Container } from "@material-ui/core";
// Styles
import { newSurveyStyle } from "./editorStyles";
import Page from "./Page";

// NewSurvey Context
import {
  NewSurveyDispatcherContext,
  SectionLengthContext,
  RandomNumbersContext,
  reducer,
  initialData,
  action_types,
} from "./NewSurveyContext";

import { Link } from "react-router-dom";

import content_type from "../contentTypes";

// App Context
import { actionTypes as appActionTypes } from "../../stateReducer";
import { useStateValue } from "../../StateProvider";

const useStyles = newSurveyStyle;

function NewSurvey() {
  const classes = useStyles();
  const [surveyData, setSurveyData] = useState({
    title: "",
    description: "",
  });
  // Survey context
  const [state, dispatch] = useReducer(reducer, initialData);
  // App Context
  const [{ selectedSurvey }, appDispatch] = useStateValue();

  /* If the selectedSurvey in the context is not null, then we are editing
  an already existing survey, else we are creating a new one.
  -> NOTE: check if selectedSurvey is needed as dependency */
  useEffect(() => {
    if (selectedSurvey) {
      console.log(
        "The selected survey in useEffect NewSurvye is: ",
        selectedSurvey
      );
      dispatch({ type: action_types.SET_SURVEY, survey: selectedSurvey });
      setSurveyData({
        title: selectedSurvey.title,
        description: selectedSurvey.description,
      });
    } else {
      console.log("No Selected Survey, setting initial data");
      dispatch({ type: action_types.SET_INITIAL_SURVEY });
    }
  }, [selectedSurvey]);

  useEffect(() => {
    console.log("USEEFFECT -> The new State is: ", state);
  }, [state]);

  /* Router functions (save and exit) */

  const onSaveSurvey = () => {
    const changeImages = (json) => {
      json.pages.forEach((page) => {
        page.contents.forEach((cont) => {
          if (cont.type === content_type.QUESTION) {
            if (
              cont.data.images &&
              Array.isArray(cont.data.images) &&
              cont.data.images.length !== 0
            ) {
              cont.data.images.map((img) => {
                return img.name;
              });
            }
          }
          if (cont.type === content_type.IMAGE) {
            if (!cont.data.randomStatus || cont.data.randomStatus === false) {
              cont.data.img = cont.data.img.name;
            }
          }
        });
      });
      return json;
    };

    console.log("The content is");
    console.log(state.sections);
    // let finalJSON = {
    //   title: surveyData.title,
    //   description: surveyData.description,
    //   pages: state.sections,
    // };
    // console.log(finalJSON);
    // props.addSurvey(changeImages(finalJSON));
    // props.setPage(pages.MAIN);

    let finalJSON = {
      title: surveyData.title,
      description: surveyData.description,
      pages: state.sections,
    };
    let finalSurvey = changeImages(finalJSON);

    if (selectedSurvey) {
      finalSurvey.id = selectedSurvey.id;
      appDispatch({ type: appActionTypes.EDIT_SURVEY, survey: finalSurvey });
      fetch("http://localhost:9000/editSurvey", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalSurvey),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status !== "saved") {
            console.error("FAILED TO DELETE THE SURVEY");
          }
        });
    } else {
      appDispatch({ type: appActionTypes.ADD_SURVEY, survey: finalSurvey });
      fetch("http://localhost:9000/insertSurvey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalSurvey),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status !== "saved") {
            console.error("FAILED TO INSERT THE SURVEY");
          }
        });
    }
  };

  const onSaveAsTemplate = () => {
    /* TODO: save as template */
  };

  const onBackToMainPage = () => {
    dispatch({ type: action_types.SET_INITIAL_SURVEY });
    appDispatch({ type: appActionTypes.SELECT_SURVEY, survey: null });
  };

  /* Survey data changin functions */

  const onChangeSurveyTitle = (e) => {
    setSurveyData({ ...surveyData, title: e.target.value });
  };

  const onChangeSurveyDescription = (e) => {
    setSurveyData({ ...surveyData, description: e.target.value });
  };

  console.log("Rendering NewSurvey.js");
  console.log("The NewSurvey state is: ", state.sections);

  return (
    <Box container="div" className={classes.root}>
      <Container maxWidth="sm" className={classes.titleDescContainer}>
        <Box component="div" className={classes.boxTitleDescContainer}>
          <TextField
            id="surveytitleinput"
            label="Title"
            fullWidth
            value={surveyData.title}
            onChange={onChangeSurveyTitle}
          />
        </Box>
        <Box component="div" className={classes.boxTitleDescContainer}>
          <TextField
            id="surveydescriptioninput"
            label="Description"
            fullWidth
            value={surveyData.description}
            onChange={onChangeSurveyDescription}
          />
        </Box>
      </Container>
      <NewSurveyDispatcherContext.Provider value={dispatch}>
        <SectionLengthContext.Provider value={state.sections?.length}>
          <RandomNumbersContext.Provider value={state.randomNumbers}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              id="cardscontainer"
              className={classes.cardContainer}
            >
              {state.sections?.map((section, sectionIndex) => {
                console.log(
                  "App mapping. the section index is: ",
                  sectionIndex
                );
                return (
                  <Page
                    section={section}
                    sectionIndex={sectionIndex}
                    key={section.pageId}
                  />
                );
              })}
            </Grid>
          </RandomNumbersContext.Provider>
        </SectionLengthContext.Provider>
      </NewSurveyDispatcherContext.Provider>
      <Grid
        container
        direction="row"
        justify="center"
        className={classes.bottomButtonsContainer}
      >
        <Grid item>
          <Link to="/">
            <Button
              variant="contained"
              color="primary"
              className={classes.bottomButton}
              onClick={onBackToMainPage}
            >
              Back to home page
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/">
            <Button
              variant="contained"
              color="primary"
              className={classes.bottomButton}
              onClick={onSaveSurvey}
            >
              Save survey
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/">
            <Button
              variant="contained"
              color="primary"
              className={classes.bottomButton}
              onClick={onSaveAsTemplate}
            >
              Save as template
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default NewSurvey;
