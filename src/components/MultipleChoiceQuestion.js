import React, { useContext, useState } from "react";
import { UpdateContext } from "./NewSurvey";
import { TextField, Button } from "@material-ui/core";
import { multipleChoiceQuestionStyle } from "../styles";
const useStyles = multipleChoiceQuestionStyle;

function MultipleChoiceQuestion(props) {
  const classes = useStyles();
  const [values, setValues] = useState(["", ""]);
  const forceUpdate = useContext(UpdateContext);

  const onAddOption = () => {
    let newValues = values;
    newValues.push("");
    setValues(newValues);
    forceUpdate();
  };

  const renderOptions = () => {
    const onChangeValue = (e, index) => {
      let newValues = values;
      newValues[index] = e.target.value;
      setValues(newValues);
      forceUpdate();
    };

    const onRemoveOption = (index) => {
      let newValues = values.filter((value, idx) => idx !== index);
      setValues(newValues);
      forceUpdate();
    };

    return values.map((value, index) => {
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
