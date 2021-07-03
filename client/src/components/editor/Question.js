import React, { Fragment, useEffect, useContext } from "react";
import questionTypes from "../questionTypes";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import LinearScaleQuestion from "./LinearScaleQuestion";
import QuestionTypeSelect from "./QuestionTypeSelect";
// Material
import { Button, Input, Grid, TextField } from "@material-ui/core";
//Style
import { questionStyle } from "./editorStyles";
//Context
import { NewSurveyDispatcherContext, action_types } from "./NewSurveyContext";

const useStyles = questionStyle;

function Question({ sectionIndex, contentIndex, data }) {
  const classes = useStyles();
  const dispatch = useContext(NewSurveyDispatcherContext);
  const {
    title,
    description,
    type,
    images,
    descStatus,
    /* Multiple choice props */
    choices,
    /* Linear scale props */
    minValue,
    maxValue,
    minValueLabel,
    maxValueLabel,
    continuousSwitch,
    radioBtnSwitch,
    horizontalSwitch,
  } = data;

  /* Used to send the title, the type and the mandatory value to the parent */
  useEffect(() => {
    if (title === undefined) {
      console.log("UseEffect is starting on Question");
      const updates = {
        title: "",
        description: "",
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

  /* Dispatcher functions */

  const onChangeTitle = (e) => {
    const updates = { title: e.target.value };
    dispatch({
      type: action_types.UPDATE_CONTENT,
      payload: {
        sectionIndex: sectionIndex,
        contentIndex: contentIndex,
        updates,
      },
    });
  };

  const onChangeDescription = (e) => {
    const updates = { description: e.target.value };
    dispatch({
      type: action_types.UPDATE_CONTENT,
      payload: {
        sectionIndex: sectionIndex,
        contentIndex: contentIndex,
        updates,
      },
    });
  };

  const onRemoveImg = (index) => {
    let newImages = images.filter((el, ix) => ix !== index);
    const updates = { images: newImages };
    dispatch({
      type: action_types.UPDATE_CONTENT,
      payload: {
        sectionIndex: sectionIndex,
        contentIndex: contentIndex,
        updates,
      },
    });
  };

  /* End dispatcher functions */

  const renderDescription = () => {
    if (!descStatus) return;
    return (
      <Input
        placeholder="Question description"
        inputProps={{ "aria-label": "description" }}
        className={classes.questionDescription}
        value={description}
        onChange={onChangeDescription}
      />
    );
  };

  const renderImages = () => {
    if (!Array.isArray(images)) {
      return;
    }
    return (
      <div>
        {images.map((image, index) => (
          <div className={classes.imgContainer} key={"image" + index}>
            <img
              src={URL.createObjectURL(image)}
              alt={"image-" + index}
              className={classes.imgContent}
            />
            <Button
              className={classes.removeImgBtn}
              onClick={() => {
                onRemoveImg(index);
              }}
            >
              Remove image
            </Button>
          </div>
        ))}
      </div>
    );
  };

  const renderQuestion = () => {
    switch (type) {
      case questionTypes.MULTIPLE_CHOICE:
      case questionTypes.CHECKBOX:
      case questionTypes.RANKING:
        return (
          <MultipleChoiceQuestion
            sectionIndex={sectionIndex}
            contentIndex={contentIndex}
            choices={choices}
          />
        );
      case questionTypes.LINEAR_SCALE:
        return (
          <LinearScaleQuestion
            sectionIndex={sectionIndex}
            contentIndex={contentIndex}
            minValue={minValue}
            maxValue={maxValue}
            minValueLabel={minValueLabel}
            maxValueLabel={maxValueLabel}
            continuousSwitch={continuousSwitch}
            radioBtnSwitch={radioBtnSwitch}
            horizontalSwitch={horizontalSwitch}
          />
        );
      default:
        return <div className={classes.noQuestionBlank}></div>;
    }
  };

  console.log("Rendering Question sx cx: ", sectionIndex, contentIndex);

  return (
    <Fragment>
      <Grid container direction="row" justify="space-between" spacing={0}>
        <Grid item xs={12} sm={8} lg={8} className={classes.questionTitle}>
          <TextField
            placeholder="Question title"
            inputProps={{ "aria-label": "title" }}
            className={classes.questionTitle}
            onChange={onChangeTitle}
            value={title !== undefined ? title : ""}
            fullWidth
          />
        </Grid>
        <Grid item xs={8} sm={3} lg={3} className={classes.questionSelect}>
          <QuestionTypeSelect
            type={type}
            sectionIndex={sectionIndex}
            contentIndex={contentIndex}
          />
        </Grid>
      </Grid>
      {renderDescription()}
      {renderImages()}
      {renderQuestion()}
    </Fragment>
  );
}

// export default React.memo(Question);
export default Question;
