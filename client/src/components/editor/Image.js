import React, {
  Fragment,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
// Material
import {
  Grid,
  Input,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@material-ui/core";
// Context
import {
  NewSurveyDispatcherContext,
  RandomNumbersContext,
  action_types,
} from "./NewSurveyContext";
// Style
import { imageStyle } from "./editorStyles";
import RandomGallery from "./RandomGallery";
import content_type from "../contentTypes";
const useStyles = imageStyle;

function Image({ sectionIndex, contentIndex, data, id }) {
  const classes = useStyles();
  const fileInput = useRef(null);
  const dispatch = useContext(NewSurveyDispatcherContext);
  const { title, img, randomStatus, randomName } = data;
  const appRandomNumbers = useContext(RandomNumbersContext);
  const [randomNumbers, setRandomNumbers] = useState([]);

  /* Every time a random number changes,
    I need to know if I can still display it. */
  useEffect(() => {
    const previousPlaceholders = () => {
      let previousPhArray = [];
      appRandomNumbers.forEach((randomNumber) => {
        if (randomNumber.sectionIndex < sectionIndex) {
          previousPhArray.push(randomNumber.name);
        }
        if (randomNumber.sectionIndex === sectionIndex) {
          if (randomNumber.contentIndex < contentIndex) {
            previousPhArray.push(randomNumber.name);
          }
        }
      });
      return previousPhArray;
    };
    const newRandomNames = previousPlaceholders();
    console.log("The new random names from useEffect is: ", newRandomNames);
    setRandomNumbers(newRandomNames);
  }, [appRandomNumbers]);

  const onChangeTitle = (e) => {
    const updates = {
      title: e.target.value,
    };
    const payload = {
      sectionIndex: sectionIndex,
      contentIndex: contentIndex,
      updates,
    };
    dispatch({
      type: action_types.UPDATE_CONTENT,
      payload,
    });
  };

  const onClickSelectImg = () => {
    fileInput.current.click();
  };

  const onChangeImage = (e) => {
    const myImg = e.target.files[0];
    const updates = {
      img: myImg,
    };
    const payload = {
      sectionIndex: sectionIndex,
      contentIndex: contentIndex,
      updates,
    };
    dispatch({
      type: action_types.UPDATE_CONTENT,
      payload,
    });
  };

  const onChangeRandomName = (e) => {
    const updates = {
      randomName: e.target.value,
    };
    const payload = {
      sectionIndex: sectionIndex,
      contentIndex: contentIndex,
      updates,
    };
    dispatch({
      type: action_types.UPDATE_CONTENT,
      payload,
    });
  };

  const renderRandomizeSelection = () => {
    const checkValue = () => {
      let check = false;
      if (appRandomNumbers.length !== 0) {
        randomNumbers.forEach((name) => {
          if (randomName === name) check = true;
        });
      }
      return check;
    };

    return (
      <Fragment>
        <FormControl className={classes.controlRandomSelector}>
          <InputLabel shrink>Random Name</InputLabel>
          {randomNumbers.length !== 0 ? (
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={checkValue() === true ? randomName : ""}
              className={classes.randomNameSelector}
              onChange={onChangeRandomName}
              defaultValue=""
              fullWidth
            >
              {randomNumbers.map((rn) => (
                <MenuItem key={"selectvalue" + rn} value={rn}>
                  {rn}
                </MenuItem>
              ))}
            </Select>
          ) : null}
        </FormControl>
      </Fragment>
    );
  };

  const renderDefaultImage = () => {
    return (
      <Fragment>
        {img !== undefined ? (
          <div className={classes.imgContainer}>
            <img
              //src={checkImageType()}
              src={URL.createObjectURL(img)}
              alt={"img" + id}
              className={classes.imgContent}
            />
          </div>
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
    <Fragment>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={0}
      >
        <Grid item xs={12} sm={8} lg={8}>
          <Input
            placeholder={"Image title"}
            inputProps={{ "aria-label": "imagetitle" }}
            className={classes.imageTitle}
            value={title}
            onChange={onChangeTitle}
            fullWidth
          />
        </Grid>
        <Grid item xs={8} sm={3} lg={3}>
          {randomStatus && renderRandomizeSelection()}
        </Grid>
      </Grid>
      {/* <div className={classes.flexContainer}></div> */}
      {randomStatus && <RandomGallery randomType={content_type.IMAGE} />}
      {!randomStatus && renderDefaultImage()}
    </Fragment>
  );
}

export default Image;
