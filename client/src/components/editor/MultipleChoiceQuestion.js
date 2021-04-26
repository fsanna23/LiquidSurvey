import React, { useEffect, useContext } from "react";
import { TextField, Button } from "@material-ui/core";
import { multipleChoiceQuestionStyle } from "./editorStyles";
//Context
import { NewSurveyDispatcherContext, action_types } from "./NewSurveyContext";

const useStyles = multipleChoiceQuestionStyle;

function MultipleChoiceQuestion({ choices, sectionIndex, contentIndex }) {
  const classes = useStyles();
  const dispatch = useContext(NewSurveyDispatcherContext);

  useEffect(() => {
    // Send initial values
    if (choices === undefined) {
      const updates = {
        choices: [
          { id: 1, value: "" },
          { id: 2, value: "" },
        ],
      };
      dispatch({
        type: action_types.UPDATE_CONTENT,
        payload: {
          sectionIndex: sectionIndex,
          contentIndex: contentIndex,
          updates,
        },
      });
    }
  }, []);

  const onChangeValue = (e, index) => {
    let newChoices = [...choices];
    newChoices[index].value = e.target.value;
    const updates = {
      choices: newChoices,
    };
    dispatch({
      type: action_types.UPDATE_CONTENT,
      payload: {
        sectionIndex: sectionIndex,
        contentIndex: contentIndex,
        updates,
      },
    });
  };

  const onRemoveOption = (index) => {
    let newChoices = [...choices];
    newChoices = newChoices.filter((el, ix) => ix !== index);
    const updates = {
      choices: newChoices,
    };
    dispatch({
      type: action_types.UPDATE_CONTENT,
      payload: {
        sectionIndex: sectionIndex,
        contentIndex: contentIndex,
        updates,
      },
    });
  };

  const onAddOption = () => {
    let newChoices = [...choices, { id: choices.length + 1, value: "" }];
    const updates = {
      choices: newChoices,
    };
    dispatch({
      type: action_types.UPDATE_CONTENT,
      payload: {
        sectionIndex: sectionIndex,
        contentIndex: contentIndex,
        updates,
      },
    });
  };

  const renderOptions = () => {
    return choices === undefined
      ? null
      : choices.map((choice, index) => {
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

// export default React.memo(MultipleChoiceQuestion);
export default MultipleChoiceQuestion;
