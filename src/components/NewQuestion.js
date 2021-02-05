import React, { useState } from "react";
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
import MoreIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";
import DragHandleIcon from "@material-ui/icons/DragHandle";
// DragAndDrop
import { Draggable } from "react-beautiful-dnd";
//Style
import { newQuestionStyle } from "../styles";
const useStyles = newQuestionStyle;

function NewQuestion(props) {
  const classes = useStyles();
  const [mandatory, setMandatory] = useState(false);
  const [question, setQuestion] = useState({
    title: props.content && props.content.title ? props.content.title : "",
    type:
      props.content && props.content.type && props.content.type !== "QUESTION"
        ? props.content.type
        : "",
  });

  const handleMandatory = () => {
    setMandatory(!mandatory);
  };

  const onChangeType = (e) => {
    console.log(e.target.value);
    setQuestion({ ...question, type: e.target.value });
  };

  const renderSelectValue = (value) => {
    return (
      <ListItemText
        primary={value}
        className={classes.questionTypeRenderValue}
      />
    );
  };

  const onRemoveQuestion = () => {
    props.removeQuestion(props.index);
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
              <Tooltip title="Delete question" placement="right">
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
