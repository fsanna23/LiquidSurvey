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
  Select,
  MenuItem,
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
import RandomGallery from "./RandomGallery";
import content_type from "../../contentTypes";
const useStyles = newTextFieldStyle;

function NewTextField(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    title: "",
    description: "",
  });
  const [randomize, setRandomize] = useState({
    randomStatus:
      props.data && props.data.randomStatus ? props.data.randomStatus : false,
    randomName:
      props.data && props.data.randomName ? props.data.randomName : "",
  });
  const randomNumbersNames = props.randomNumbers;

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

  const onChangeRandomStatus = () => {
    setRandomize({ ...randomize, randomStatus: !randomize.randomStatus });
    props.update({ randomStatus: !randomize.randomStatus });
  };

  const onChangeRandomName = (e) => {
    setRandomize({ ...randomize, randomName: e.target.value });
    props.update({ randomName: e.target.value });
  };

  const renderRandomizeSelection = () => {
    const checkValue = () => {
      let check = false;
      if (randomNumbersNames.length !== 0) {
        randomNumbersNames.forEach((name) => {
          if (randomize.randomName === name) check = true;
        });
      }
      return check;
    };

    return (
      <Fragment>
        {randomNumbersNames.length !== 0 ? (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={checkValue() === true ? randomize.randomName : ""}
            className={classes.randomNameSelector}
            onChange={onChangeRandomName}
            defaultValue=""
          >
            {randomNumbersNames.map((rn) => (
              <MenuItem key={"selectvalue" + rn} value={rn}>
                {rn}
              </MenuItem>
            ))}
          </Select>
        ) : null}
        <RandomGallery randomType={content_type.TEXT} />
      </Fragment>
    );
  };

  const renderDefault = () => {
    return (
      <Input
        placeholder="Description"
        inputProps={{ "aria-label": "description" }}
        className={classes.textDescription}
        value={state.description}
        onChange={onChangeDescription}
      />
    );
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
          {randomize.randomStatus
            ? renderRandomizeSelection()
            : renderDefault()}
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
            {props.randomNumbers.length !== 0 ? (
              <Fragment>
                <FormControlLabel
                  control={
                    <Switch
                      checked={randomize.randomStatus}
                      onChange={onChangeRandomStatus}
                      color="primary"
                    />
                  }
                  label="Randomize"
                  labelPlacement="start"
                />
                <Divider
                  orientation="vertical"
                  flexItem
                  className={classes.cardActionsDivider}
                />
              </Fragment>
            ) : null}
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
