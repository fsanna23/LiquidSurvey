import React, { useState, useCallback } from "react";
import QuestionTypes from "./questionTypes";
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
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
// DragAndDrop
import { Draggable } from "react-beautiful-dnd";
//Style
import { newQuestionStyle } from "../styles";
import ImageInputBtn from "./ImageInputBtn";
const useStyles = newQuestionStyle;

function NewQuestion(props) {
  const classes = useStyles();
  const [, updateState] = useState();
  const [mandatory, setMandatory] = useState(false);
  const [question, setQuestion] = useState({
    title: props.content && props.content.title ? props.content.title : "",
    type:
      props.content && props.content.type && props.content.type !== "QUESTION"
        ? props.content.type
        : QuestionTypes.SHORT_TEXT,
  });
  const [images, setImages] = useState([]);
  const [desc, setDesc] = useState({
    descText: "",
    descStatus: false,
  });

  const forceUpdate = useCallback(() => updateState({}), []);

  const handleMandatory = () => {
    setMandatory(!mandatory);
  };

  const onChangeType = (e) => {
    console.log(e.target.value);
    setQuestion({ ...question, type: e.target.value });
  };

  const onToggleDescription = () => {
    setDesc({ ...desc, descStatus: !desc.descStatus });
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
      />
    );
  };

  const renderImages = () => {
    if (!Array.isArray(images)) {
      console.log("Image is not array");
      return;
    }
    console.log("Image is array");
    console.log("The array has length: " + images.length);
    return (
      <div>
        {images.map((image, index) => (
          <img
            src={URL.createObjectURL(image)}
            alt={"image-" + index}
            key={index}
            className={classes.imgContent}
          />
        ))}
      </div>
    );
  };

  const onRemoveQuestion = () => {
    props.removeQuestion(props.index);
  };

  const onAddImage = (img) => {
    console.log("Adding image");
    let newImages = images;
    newImages.push(img);
    setImages(newImages);
    console.log(img);
    forceUpdate();
  };

  return (
    <Draggable draggableId={props.id.toString()} index={props.index}>
      {(provided) => (
        <Box
          width={800}
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={classes.boxCardRoot}
        >
          <Card className={classes.cardRoot} variant="outlined">
            <CardContent className={classes.cardContent}>
              <Box
                id="handleBox"
                display="flex"
                justifyContent="center"
                className={classes.dragHandle}
                {...provided.dragHandleProps}
              >
                <DragHandleIcon className={classes.dragHandleIcon} />
              </Box>
              <Input
                placeholder="Question title"
                inputProps={{ "aria-label": "description" }}
                className={classes.questionTitle}
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
              </Select>
              {renderDescription()}
              {renderImages()}
              {/* RENDER QUESTION TYPES */}
            </CardContent>
            <Divider variant="middle" />
            <CardActions className={classes.cardActions}>
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
              <Divider orientation="vertical" flexItem />
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
            </CardActions>
          </Card>
        </Box>
      )}
    </Draggable>
  );
}

export default NewQuestion;
