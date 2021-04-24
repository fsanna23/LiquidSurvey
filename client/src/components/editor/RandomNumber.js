import React, { useEffect, useContext, Fragment } from "react";
import { Input, InputLabel, Typography, FormControl } from "@material-ui/core";
import { randomNumberStyle } from "./editorStyles";
import { NewSurveyDispatcherContext, action_types } from "./NewSurveyContext";

const useStyles = randomNumberStyle;

function RandomNumber({ sectionIndex, contentIndex, data }) {
  const dispatch = useContext(NewSurveyDispatcherContext);
  const { name, minRange, maxRange } = data;

  useEffect(() => {
    /* TODO use dispatcher to send initial values.
      INITIAL VALUES:
      name: "",
      minRange: 0,
      maxRange: 100 */
    if (name === "" || name === undefined) {
      const updates = {
        name: "",
        minRange: 0,
        maxRange: 100,
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
    }
  }, []);

  const classes = useStyles();

  const onChangeName = (e) => {
    /* Call dispatcher with update name: e.target.value */
    const updates = {
      name: e.target.value,
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

  const onChangeMinRange = (e) => {
    /* Call dispatcher with update minRange: e.target.value */
    const updates = {
      minRange: e.target.value,
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

  const onChangeMaxRange = (e) => {
    /* Call dispatcher with update maxRange: e.target.value */
    const updates = {
      maxRange: e.target.value,
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

  console.log("Rendering Random Number sx cx: ", sectionIndex, contentIndex);

  return (
    <Fragment>
      <Input
        placeholder="Name for your random number"
        inputProps={{ "aria-label": "random number name" }}
        className={classes.placeholderTitle}
        value={name !== undefined ? name : ""}
        onChange={onChangeName}
      />
      <Typography variant="body1" className={classes.rangeText}>
        Insert the values for the random generation range
      </Typography>
      <FormControl className={classes.rangeInput}>
        <InputLabel>Minimum range value</InputLabel>
        <Input
          type="number"
          value={minRange !== undefined ? minRange : 0}
          onChange={onChangeMinRange}
        />
      </FormControl>
      <FormControl className={classes.rangeInput}>
        <InputLabel>Maximum range value</InputLabel>
        <Input
          type="number"
          value={maxRange !== undefined ? maxRange : 100}
          onChange={onChangeMaxRange}
        />
      </FormControl>
    </Fragment>
  );
}

export default RandomNumber;
