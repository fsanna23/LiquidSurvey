import React, { useState, useEffect, useContext, Fragment } from "react";

// Material
import { FormControlLabel, Switch, Divider } from "@material-ui/core";

// Context
import {
  NewSurveyDispatcherContext,
  RandomNumbersContext,
  action_types,
} from "./NewSurveyContext";

// Style
import { contentActionsStyle } from "./editorStyles";
const useStyles = contentActionsStyle;

function RandomContentActions({ sectionIndex, contentIndex, randomStatus }) {
  const classes = useStyles();
  const dispatch = useContext(NewSurveyDispatcherContext);
  const appRandomNumbers = useContext(RandomNumbersContext);
  const [randomNumbers, setRandomNumbers] = useState([]);

  /* UseEffect to get eligible random numbers */
  useEffect(() => {
    const previousPlaceholders = () => {
      let previousPhArray = [];
      appRandomNumbers.forEach((randomNumber) => {
        if (randomNumber.sectionIndex < sectionIndex) {
          previousPhArray.push(randomNumber.name);
        }
        if (randomNumber.sectionIndex === sectionIndex) {
          if (randomNumber.contentIndex < contentIndex) {
            previousPhArray.push(randomNumber.name);
          }
        }
      });
      return previousPhArray;
    };
    /* Get randomNumbers only if the content type is a randomizable one */
    const newRandomNames = previousPlaceholders();
    console.log("The new random names from useEffect is: ", newRandomNames);
    setRandomNumbers(newRandomNames);
  }, [appRandomNumbers]);

  const onChangeRandomStatus = () => {
    const updates = { randomStatus: !randomStatus };
    const payload = {
      sectionIndex: sectionIndex,
      contentIndex: contentIndex,
      updates,
    };
    dispatch({ type: action_types.UPDATE_CONTENT, payload });
  };

  if (randomNumbers.length !== 0) {
    return (
      <Fragment>
        <FormControlLabel
          control={
            <Switch
              checked={randomStatus !== undefined ? randomStatus : false}
              onChange={() => {
                onChangeRandomStatus();
              }}
              color="primary"
            />
          }
          label="Randomize"
          labelPlacement="start"
        />
        <Divider
          orientation="vertical"
          flexItem
          className={classes.cardActionsDivider}
        />
      </Fragment>
    );
  }
  return null;
}

export default React.memo(RandomContentActions);
// export default RandomContentActions;
