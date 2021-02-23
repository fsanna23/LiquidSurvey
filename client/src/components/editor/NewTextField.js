import React, { Fragment, useState } from "react";
// Material
import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Input,
  Divider,
  Tooltip,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
// Draggable
import { Draggable } from "react-beautiful-dnd";
// Icons
import DragHandleIcon from "@material-ui/icons/DragHandle";
import DeleteIcon from "@material-ui/icons/Delete";
// Style
import { newTextFieldStyle } from "../../editorStyles";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ShortTextIcon from "@material-ui/icons/ShortText";
import ImageInputBtn from "./ImageInputBtn";
const useStyles = newTextFieldStyle;

function NewTextField(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    title: "",
    description: "",
  });

  const onRemoveContent = () => {
    props.removeTextField(props.index);
  };

  const onChangeTitle = (e) => {
    setState({ ...state, title: e.target.value });
    props.update({ title: e.target.value });
  };

  const onChangeDescription = (e) => {
    setState({ ...state, description: e.target.value });
    props.update({ description: e.target.value });
  };

  return (
    <Box width={800} className={classes.boxCardRoot}>
      <Card className={classes.cardRoot} variant="outlined">
        <CardContent className={classes.cardContent}>
          <Input
            placeholder="Title"
            inputProps={{ "aria-label": "title" }}
            className={classes.textTitle}
            value={state.title}
            onChange={onChangeTitle}
          />
          <Input
            placeholder="Description"
            inputProps={{ "aria-label": "description" }}
            className={classes.textDescription}
            value={state.description}
            onChange={onChangeDescription}
          />
        </CardContent>
        <Divider variant="middle" />
        <CardActions className={classes.cardActions}>
          <div
            id={"left-side-actions" + props.index}
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
            <Tooltip title="Delete question" placement="bottom">
              <IconButton
                onClick={() => {
                  onRemoveContent();
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

export default NewTextField;
