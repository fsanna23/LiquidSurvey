import React, { useState, useRef, Fragment, useEffect } from "react";
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
  Button,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Select,
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
import QuestionTypes from "../questionTypes";
import ShortTextIcon from "@material-ui/icons/ShortText";
import SubjectIcon from "@material-ui/icons/Subject";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import LinearScaleIcon from "@material-ui/icons/LinearScale";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import RandomGallery from "./RandomGallery";
import content_type from "../../contentTypes";
const useStyles = newImageStyle;

function NewImage(props) {
  const classes = useStyles();
  const fileInput = useRef(null);
  const randomNumbersNames = props.randomNumbers;

  const [title, setTitle] = useState(
    props.data && props.data.title ? props.data.title : ""
  );
  const [img, setImg] = useState(
    props.data && props.data.img ? props.data.img : undefined
  );
  const [randomize, setRandomize] = useState({
    randomStatus:
      props.data && props.data.randomStatus ? props.data.randomStatus : false,
    randomName:
      props.data && props.data.randomName ? props.data.randomName : "",
  });

  useEffect(() => {
    console.log("The random numbers in NewImage are: ", randomNumbersNames);
  }, []);

  const onRemoveContent = () => {
    props.removeImage(props.index);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    props.update({ title: e.target.value });
  };

  const onClickSelectImg = () => {
    fileInput.current.click();
  };

  const onChangeImage = (e) => {
    const myImg = e.target.files[0];
    setImg(myImg);
    props.update({ img: myImg });
  };

  const onChangeRandomStatus = () => {
    setRandomize({ ...randomize, randomStatus: !randomize.randomStatus });
    props.update({ randomStatus: !randomize.randomStatus });
  };

  const onChangeRandomName = (e) => {
    setRandomize({ ...randomize, randomName: e.target.value });
    props.update({ randomName: e.target.value });
  };

  /* const checkImageType = () => {
    if (props.url) {
      return props.url;
    } else if (props.image) {
      return URL.createObjectURL(props.image);
    } else {
      console.log(props);
      return props.url;
    }
  };*/

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
        <RandomGallery randomType={content_type.IMAGE} />
      </Fragment>
    );
  };

  const renderDefaultImage = () => {
    return (
      <Fragment>
        {img !== undefined ? (
          <img
            //src={checkImageType()}
            src={URL.createObjectURL(img)}
            alt={"img" + props.id}
            className={classes.imgContent}
          />
        ) : (
          <Fragment />
        )}
        <div>
          <Button
            variant="contained"
            color="primary"
            className={classes.selectAndChangeImgBtn}
            onClick={() => {
              onClickSelectImg();
            }}
          >
            {img === undefined ? "Select" : "Change"} image
          </Button>
          <input
            style={{
              display: "none",
              top: "0px",
              right: "0px",
            }}
            type="file"
            accept="image/*"
            ref={fileInput}
            onChange={onChangeImage}
            onClick={(event) => {
              // Used to let the user select the same file if needed
              event.target.value = null;
            }}
          />
        </div>
      </Fragment>
    );
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
          {randomize.randomStatus
            ? renderRandomizeSelection()
            : renderDefaultImage()}
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

export default NewImage;
