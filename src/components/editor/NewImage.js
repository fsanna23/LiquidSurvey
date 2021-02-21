import React, { useState, useRef, Fragment } from "react";
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
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
// Style
import { newImageStyle } from "../../editorStyles";
const useStyles = newImageStyle;

function NewImage(props) {
  const classes = useStyles();
  const imgRef = useRef(null);

  const [title, setTitle] = useState("");

  const onRemoveContent = () => {
    props.removeImage(props.index);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    props.update({ title: e.target.value });
  };

  const checkImageType = () => {
    if (props.url) {
      return props.url;
    } else if (props.image) {
      return URL.createObjectURL(props.image);
    } else {
      console.log(props);
      return props.url;
    }
  };

  return (
    <Box width={800} className={classes.boxCardRoot}>
      <Card className={classes.cardRoot} variant="outlined">
        <CardContent className={classes.cardContent}>
          <Input
            placeholder={props.url ? "Video title" : "Image title"}
            inputProps={{ "aria-label": "description" }}
            className={classes.imageTitle}
            value={title}
            onChange={onChangeTitle}
          />
          <img
            ref={imgRef}
            src={checkImageType()}
            alt={"img" + props.id}
            className={classes.imgContent}
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

export default NewImage;
