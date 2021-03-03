import React, { useState, Fragment, useEffect } from "react";
import QuestionTypes from "../questionTypes";
// Material
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Input,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Divider,
  FormControlLabel,
  Switch,
  Tooltip,
} from "@material-ui/core";
// Icons
import ShortTextIcon from "@material-ui/icons/ShortText";
import SubjectIcon from "@material-ui/icons/Subject";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import DeleteIcon from "@material-ui/icons/Delete";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import LinearScaleIcon from "@material-ui/icons/LinearScale";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
// DragAndDrop
import { Draggable } from "react-beautiful-dnd";
//Style
import { newQuestionStyle } from "../../editorStyles";
import ImageInputBtn from "./ImageInputBtn";
import questionTypes from "../questionTypes";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import LinearScaleQuestion from "./LinearScaleQuestion";
const useStyles = newQuestionStyle;

const initialData = {
  choices: [
    { id: 1, value: "" },
    { id: 2, value: "" },
  ],
  minValue: 1,
  maxValue: 5,
  minValueLabel: "",
  maxValueLabel: "",
};

function NewQuestion(props) {
  const classes = useStyles();
  const [mandatory, setMandatory] = useState(false);

  // TODO: use props to get values for the state
  const [question, setQuestion] = useState({
    title: props.content && props.content.title ? props.content.title : "",
    type:
      props.content && props.content.type && props.content.type !== "QUESTION"
        ? props.content.type
        : QuestionTypes.SHORT_TEXT,
    description: props.content.description ? props.content.description : "",
    choices: props.content.choices
      ? props.content.choices
      : [
          { id: 1, value: "" },
          { id: 2, value: "" },
        ],
    minValue: props.content.minValue ? props.content.minValue : 1,
    maxValue: props.content.maxValue ? props.content.maxValue : 5,
    minValueLabel: props.content.minValueLabel
      ? props.content.minValueLabel
      : "",
    maxValueLabel: props.content.maxValueLabel
      ? props.content.maxValueLabel
      : "",
  });
  const [images, setImages] = useState([]);
  const [desc, setDesc] = useState({
    descText: "",
    descStatus: false,
  });

  const updateQuestion = props.update;

  /* Used to send the title, the type and the mandatory value to the parent */
  useEffect(() => {
    updateQuestion({
      title: question.title,
      type: question.type,
      isMandatory: mandatory,
    });
  }, []);

  const handleMandatory = () => {
    setMandatory(!mandatory);
    props.update({ isMandatory: !mandatory });
  };

  const onChangeTitle = (e) => {
    setQuestion({ ...question, title: e.target.value });
    props.update({ title: e.target.value });
  };

  const onChangeType = (e) => {
    setQuestion({ ...question, type: e.target.value });
    // TODO reset initial data
    props.update({ type: e.target.value });
  };

  const onToggleDescription = () => {
    setDesc({ ...desc, descStatus: !desc.descStatus });
  };

  const onChangeDescription = (e) => {
    setQuestion({ ...question, description: e.target.value });
    props.update({ description: e.target.value });
  };

  const renderSelectValue = (value) => {
    return (
      <ListItemText
        primary={value}
        className={classes.questionTypeRenderValue}
      />
    );
  };

  const renderDescription = () => {
    if (!desc.descStatus) return;
    return (
      <Input
        placeholder="Question description"
        inputProps={{ "aria-label": "description" }}
        className={classes.questionDescription}
        value={question.description}
        onChange={onChangeDescription}
      />
    );
  };

  const renderImages = () => {
    const onRemoveImg = (index) => {
      let newImages = [...images];
      newImages = newImages.filter((el, ix) => ix !== index);
      setImages(newImages);
      props.update({ images: newImages });
    };

    if (!Array.isArray(images)) {
      return;
    }
    return (
      <div>
        {images.map((image, index) => (
          <div className={classes.imgContainer}>
            <img
              src={URL.createObjectURL(image)}
              alt={"image-" + index}
              key={index}
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

  const onRemoveQuestion = () => {
    props.removeQuestion(props.index);
  };

  const onAddImage = (img) => {
    console.log("Adding image");
    const newImages = [...images, img];
    setImages(newImages);
    props.update({ images: newImages });
    // forceUpdate();
  };

  const onUpdateChoices = (choices) => {
    setQuestion({ ...question, choices: choices });
    props.update({ choices: choices });
  };

  const onUpdateMinLinearValue = (value) => {
    setQuestion({ ...question, minValue: value });
    props.update({ minValue: value });
  };

  const onUpdateMaxLinearValue = (value) => {
    setQuestion({ ...question, maxValue: value });
    props.update({ maxValue: value });
  };

  const onUpdateMinLinearLabel = (label) => {
    setQuestion({ ...question, minValueLabel: label });
    props.update({ minValueLabel: label });
  };

  const onUpdateMaxLinearLabel = (label) => {
    setQuestion({ ...question, maxValueLabel: label });
    props.update({ maxValueLabel: label });
  };

  const renderQuestion = () => {
    switch (question.type) {
      case questionTypes.MULTIPLE_CHOICE:
        return (
          <MultipleChoiceQuestion
            update={onUpdateChoices}
            choices={question.choices}
          />
        );
      case questionTypes.LINEAR_SCALE:
        const updateAll = (updates) => {
          props.update(updates);
        };

        /*props.update({
          minValue: question.minValue,
          maxValue: question.maxValue,
          minValueLabel: question.minValueLabel,
          maxValueLabel: question.maxValueLabel,
        });*/
        return (
          <LinearScaleQuestion
            minValue={question.minValue}
            maxValue={question.maxValue}
            minValueLabel={question.minValueLabel}
            maxValueLabel={question.maxValueLabel}
            updateMinValue={onUpdateMinLinearValue}
            updateMaxValue={onUpdateMaxLinearValue}
            updateMinValueLabel={onUpdateMinLinearLabel}
            updateMaxValueLabel={onUpdateMaxLinearLabel}
            updateAll={updateAll}
          />
        );
      case questionTypes.RANKING:
        return (
          <MultipleChoiceQuestion
            update={onUpdateChoices}
            choices={question.choices}
          />
        );
      default:
        return <Fragment />;
    }
  };

  return (
    <Box width={800} className={classes.boxCardRoot}>
      <Card className={classes.cardRoot} variant="outlined">
        <CardContent className={classes.cardContent}>
          <Input
            placeholder="Question title"
            inputProps={{ "aria-label": "description" }}
            className={classes.questionTitle}
            onChange={onChangeTitle}
            value={question.title}
          />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={question.type}
            renderValue={renderSelectValue}
            className={classes.questionType}
            onChange={onChangeType}
          >
            <MenuItem value={QuestionTypes.SHORT_TEXT}>
              <ListItemIcon>
                <ShortTextIcon />
              </ListItemIcon>
              <ListItemText primary={QuestionTypes.SHORT_TEXT} />
            </MenuItem>
            <MenuItem value={QuestionTypes.PARAGRAPH}>
              <ListItemIcon>
                <SubjectIcon />
              </ListItemIcon>
              <ListItemText primary={QuestionTypes.PARAGRAPH} />
            </MenuItem>
            <MenuItem value={QuestionTypes.MULTIPLE_CHOICE}>
              <ListItemIcon>
                <RadioButtonCheckedIcon />
              </ListItemIcon>
              <ListItemText primary={QuestionTypes.MULTIPLE_CHOICE} />
            </MenuItem>
            <MenuItem value={QuestionTypes.CHECKBOX}>
              <ListItemIcon>
                <CheckBoxIcon />
              </ListItemIcon>
              <ListItemText primary={QuestionTypes.CHECKBOX} />
            </MenuItem>
            <MenuItem value={QuestionTypes.LINEAR_SCALE}>
              <ListItemIcon>
                <LinearScaleIcon />
              </ListItemIcon>
              <ListItemText primary={QuestionTypes.LINEAR_SCALE} />
            </MenuItem>
            <MenuItem value={QuestionTypes.RANKING}>
              <ListItemIcon>
                <ImportExportIcon />
              </ListItemIcon>
              <ListItemText primary={QuestionTypes.RANKING} />
            </MenuItem>
          </Select>
          {renderDescription()}
          {renderImages()}
          {renderQuestion()}
        </CardContent>
        <Divider variant="middle" />
        <CardActions className={classes.cardActions}>
          <div
            id={"left-side-actions" + props.id + props.index}
            className={classes.cardActionsLeft}
          >
            <Tooltip title="Move up" placement="bottom">
              <IconButton
                onClick={() => {
                  props.move.up();
                }}
              >
                <ArrowUpward />
              </IconButton>
            </Tooltip>
            <Tooltip title="Move down" placement="bottom">
              <IconButton
                onClick={() => {
                  props.move.down();
                }}
              >
                <ArrowDownward />
              </IconButton>
            </Tooltip>
          </div>
          <div className={classes.cardActionsRight}>
            <FormControlLabel
              control={
                <Switch
                  checked={mandatory}
                  onChange={handleMandatory}
                  name="checkedA"
                  color="primary"
                />
              }
              label="Mandatory"
              labelPlacement="start"
            />
            <Divider
              orientation="vertical"
              flexItem
              className={classes.cardActionsDivider}
            />
            <Tooltip
              title={(desc.descStatus ? "Hide" : "Show") + " description"}
              placement="bottom"
            >
              <IconButton
                onClick={() => {
                  onToggleDescription();
                }}
              >
                <ShortTextIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Attach image" placement="bottom">
              <ImageInputBtn changeImage={onAddImage} />
            </Tooltip>
            <Tooltip title="Delete question" placement="bottom">
              <IconButton
                onClick={() => {
                  onRemoveQuestion();
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        </CardActions>
      </Card>
    </Box>
  );
}

export default NewQuestion;
