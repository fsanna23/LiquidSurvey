import React, { useEffect, useState, useContext, Fragment } from "react";
import RandomGallery from "./RandomGallery";
import content_type from "../contentTypes";
// Material
import { Input, Select, MenuItem } from "@material-ui/core";
// Context
import {
  RandomNumbersContext,
  NewSurveyDispatcherContext,
  action_types,
} from "./NewSurveyContext";
// Style
import { textStyle } from "./editorStyles";
const useStyles = textStyle;

function Text({ sectionIndex, contentIndex, data }) {
  const classes = useStyles();

  const [randomNumbers, setRandomNumbers] = useState([]);
  const appRandomNumbers = useContext(RandomNumbersContext);
  const dispatch = useContext(NewSurveyDispatcherContext);
  const { title, description, randomStatus, randomName } = data;

  /* Every time a random number changes,
    I need to know if I can still display it. */
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
    const newRandomNames = previousPlaceholders();
    setRandomNumbers(newRandomNames);
  }, [appRandomNumbers]);

  const onChangeTitle = (e) => {
    const updates = {
      title: e.target.value,
    };
    const payload = {
      sectionIndex: sectionIndex,
      contentIndex: contentIndex,
      updates,
    };
    dispatch({
      type: action_types.UPDATE_CONTENT,
      payload,
    });
  };

  const onChangeDescription = (e) => {
    const updates = {
      description: e.target.value,
    };
    const payload = {
      sectionIndex: sectionIndex,
      contentIndex: contentIndex,
      updates,
    };
    dispatch({
      type: action_types.UPDATE_CONTENT,
      payload,
    });
  };

  const onChangeRandomName = (e) => {
    const updates = {
      randomName: e.target.value,
    };
    const payload = {
      sectionIndex: sectionIndex,
      contentIndex: contentIndex,
      updates,
    };
    dispatch({
      type: action_types.UPDATE_CONTENT,
      payload,
    });
  };

  const renderRandomizeSelection = () => {
    const checkValue = () => {
      let check = false;
      if (appRandomNumbers.length !== 0) {
        randomNumbers.forEach((name) => {
          if (randomName === name) check = true;
        });
      }
      return check;
    };

    return (
      <Fragment>
        {randomNumbers.length !== 0 ? (
          <Select
            value={checkValue() === true ? randomName : ""}
            className={classes.randomNameSelector}
            onChange={onChangeRandomName}
            defaultValue=""
          >
            {randomNumbers.map((rn) => (
              <MenuItem key={"selectvalue" + rn} value={rn}>
                {rn}
              </MenuItem>
            ))}
          </Select>
        ) : null}
        <RandomGallery randomType={content_type.TEXT} />
      </Fragment>
    );
  };

  const renderDefault = () => {
    return (
      <Input
        placeholder="Description"
        inputProps={{ "aria-label": "description" }}
        className={classes.textDescription}
        value={description}
        onChange={onChangeDescription}
      />
    );
  };

  return (
    <Fragment>
      <Input
        placeholder="Title"
        inputProps={{ "aria-label": "title" }}
        className={classes.textTitle}
        value={title}
        onChange={onChangeTitle}
      />
      {randomStatus ? renderRandomizeSelection() : renderDefault()}
    </Fragment>
  );
}

export default Text;
