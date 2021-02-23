import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { multipleChoiceQuestionStyle } from "../../editorStyles";
const useStyles = multipleChoiceQuestionStyle;

function MultipleChoiceQuestion(props) {
  const classes = useStyles();
  let choices = [...props.choices];

  const onChangeValue = (e, index) => {
    choices[index].value = e.target.value;
    props.update(choices);
  };

  const onRemoveOption = (index) => {
    choices = choices.filter((el, ix) => ix !== index);
    props.update(choices);
  };

  const onAddOption = () => {
    choices = [...choices, { id: choices.length + 1, value: "" }];
    props.update(choices);
  };

  const renderOptions = () => {
    return props.choices.map((choice, index) => {
      return (
        <div key={"choice-" + choice.id}>
          <TextField
            label={"Option " + (index + 1)}
            value={choice.value}
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
