import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { multipleChoiceQuestionStyle } from "../styles";
const useStyles = multipleChoiceQuestionStyle;

function MultipleChoiceQuestion(props) {
  const classes = useStyles();
  let choices = [...props.choices];

  const onChangeValue = (e, index) => {
    choices[index] = e.target.value;
    props.update(choices);
  };

  const onRemoveOption = (index) => {
    choices = choices.filter((el, ix) => ix !== index);
    props.update(choices);
  };

  const onAddOption = () => {
    choices = [...choices, ""];
    props.update(choices);
  };

  const renderOptions = () => {
    return props.choices.map((value, index) => {
      return (
        <div key={index}>
          <TextField
            label={"Option " + (index + 1)}
            value={value}
            className={classes.textField}
            onChange={(e) => {
              onChangeValue(e, index);
            }}
          />
          {index !== 0 && index !== 1 ? (
            <Button
              color="#FF0000"
              className={classes.removeOptionBtn}
              onClick={() => {
                onRemoveOption(index);
              }}
            >
              Remove option
            </Button>
          ) : null}
        </div>
      );
    });
  };

  return (
    <div className={classes.fieldContainer}>
      {renderOptions()}
      <Button
        color="primary"
        className={classes.addOptionBtn}
        onClick={() => {
          onAddOption();
        }}
      >
        Add option
      </Button>
    </div>
  );
}

export default MultipleChoiceQuestion;
