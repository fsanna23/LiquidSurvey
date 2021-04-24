import React, { useEffect, useContext } from "react";
import {
  Select,
  ListItemText,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { questionTypeSelectStyle } from "./editorStyles";
import questionTypes from "../questionTypes";
import QuestionTypeSelectMenuItem from "./QuestionTypeSelectMenuItem";
//Context
import {
  NewSurveyStateContext,
  NewSurveyDispatcherContext,
  action_types,
} from "./NewSurveyContext";

const useStyles = questionTypeSelectStyle;

function QuestionTypeSelect({ sectionIndex, contentIndex, type }) {
  const classes = useStyles();

  const dispatch = useContext(NewSurveyDispatcherContext);

  console.log("The type is: ", type);

  useEffect(() => {
    // Send initial data
    const updates = {
      type: questionTypes.SHORT_TEXT,
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
  }, []);

  const onChangeType = (e) => {
    const updates = {
      type: e.target.value,
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

  const renderSelectValue = (value) => {
    return (
      <ListItemText
        primary={value}
        className={classes.questionTypeRenderValue}
      />
    );
  };

  return (
    <FormControl className={classes.questionType}>
      <InputLabel shrink>Question Type</InputLabel>
      <Select
        labelId={`question-select-${sectionIndex}-${contentIndex}`}
        id={`question-select-${sectionIndex}-${contentIndex}`}
        value={type !== undefined ? type : questionTypes.SHORT_TEXT}
        // renderValue={renderSelectValue}
        // className={classes.questionType}
        onChange={onChangeType}
        fullWidth
      >
        {Object.keys(questionTypes).map((typeLoop) => (
          <QuestionTypeSelectMenuItem
            value={questionTypes[typeLoop]}
            key={typeLoop}
          >
            {questionTypes[typeLoop]}
          </QuestionTypeSelectMenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default React.memo(QuestionTypeSelect);
