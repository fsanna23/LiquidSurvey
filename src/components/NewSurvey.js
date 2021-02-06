import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  Fragment,
} from "react";
import { Grid, Box, Input, IconButton, Tooltip } from "@material-ui/core";
import NewQuestion from "./NewQuestion";
import ImageInputBtn from "./ImageInputBtn";
// Dialog
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
// DragAndDrop
import { DragDropContext, Droppable } from "react-beautiful-dnd";
// Styles
import { newSurveyStyle } from "../styles";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import { render } from "@testing-library/react";
import NewImage from "./NewImage";
import NewTextField from "./NewTextField";
const useStyles = newSurveyStyle;

let counter = 2;

const content_type = {
  QUESTION: "QUESTION",
  IMAGE: "IMAGE",
  VIDEO: "VIDEO",
  TEXT: "TEXT",
};

function NewSurvey(props) {
  const classes = useStyles();
  const [content, setContent] = useState([
    { id: 1, type: content_type.QUESTION },
    { id: 2, type: content_type.QUESTION },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  //REMOVE const fileInput = useRef(null);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    console.log("Source", source);
    console.log("Destination", destination);
    console.log("DraggableID", draggableId);
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    let newState = content;
    const movedContent = content.find((c) => c.id.toString() === draggableId);

    newState.splice(source.index, 1);
    newState.splice(destination.index, 0, movedContent);
    console.log("The new state", newState);
    console.log("The moved contente", movedContent);
    setContent(newState);
  };

  const onAddQuestion = () => {
    const newQuestion = { id: counter + 1, type: content_type.QUESTION };
    counter++;
    let newContent = content;
    newContent.push(newQuestion);
    console.log(newContent);
    setContent(newContent);
    /*The dnd library doesn't let the UI update when some data changes
    with respect to Draggable items, therefore a forced update is needed. */
    forceUpdate();
  };

  const onRemoveContent = (index) => {
    let newContent = content.filter((item, itemIndex) => {
      return index !== itemIndex;
    });
    setContent(newContent);
    forceUpdate();
  };

  /*  Simulates the click on the input file */
  /*const onAddImage = () => {
    fileInput.current.click();
  };*/

  /*  Changes the image and creates a new content, adding it to the state */
  const onChangeImage = (img) => {
    const newImage = { id: counter + 1, type: content_type.IMAGE, img: img };
    counter++;
    let newContent = content;
    newContent.push(newImage);
    setContent(newContent);
    /*The dnd library doesn't let the UI update when some data changes
    with respect to Draggable items, therefore a forced update is needed. */
    forceUpdate();
    // TODO upload to server
  };

  const onOpenEmbedVideoDialog = () => {
    setOpenDialog(true);
  };

  const onCloseEmbedVideoDialog = () => {
    setOpenDialog(false);
  };

  const onAddVideo = (url) => {
    const newVideo = { id: counter + 1, type: content_type.VIDEO, url: url };
    counter++;
    let newContent = content;
    newContent.push(newVideo);
    setContent(newContent);
    /*The dnd library doesn't let the UI update when some data changes
    with respect to Draggable items, therefore a forced update is needed. */
    forceUpdate();
  };

  const onAddTextField = () => {
    const newTextField = { id: counter + 1, type: content_type.TEXT };
    counter++;
    let newContent = content;
    newContent.push(newTextField);
    setContent(newContent);
    /*The dnd library doesn't let the UI update when some data changes
    with respect to Draggable items, therefore a forced update is needed. */
    forceUpdate();
  };

  const renderContent = () => {
    const parseVideoID = (url) => {
      console.log(url);
      const regexResult = url.match(/^[\s\S]*watch\?v=([\s\S]*)[\s\S]*$/);
      console.log(regexResult);
      const separatorIndex = regexResult[1].indexOf("&");
      if (separatorIndex !== -1)
        return regexResult[1].substring(0, separatorIndex);
      return regexResult[1];
    };

    const getVideoThumbnail = (videoID) => {
      return `http://img.youtube.com/vi/${videoID}/0.jpg`;
    };

    return content.map((cont, index) => {
      switch (cont.type) {
        case content_type.QUESTION:
          return (
            <NewQuestion
              key={cont.id}
              content={cont}
              id={cont.id}
              index={index}
              removeQuestion={onRemoveContent}
            />
          );
        case content_type.IMAGE:
          return (
            <NewImage
              key={cont.id}
              id={cont.id}
              index={index}
              image={cont.img}
              removeImage={onRemoveContent}
            />
          );
        case content_type.VIDEO:
          /* NOTE: there's no meaning in showing the embedded video in
             the survey editor, therefore we get the video thumbnail and
             show that as an image. */
          const thumbnail = getVideoThumbnail(parseVideoID(cont.url));
          return (
            <NewImage
              key={cont.id}
              id={cont.id}
              index={index}
              url={thumbnail}
              removeImage={onRemoveContent}
            />
          );
        case content_type.TEXT:
          return (
            <NewTextField
              key={cont.id}
              id={cont.id}
              index={index}
              removeTextField={onRemoveContent}
            />
          );
      }
    });
  };

  return (
    <Grid
      id="newsurveycontainer"
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.surveyGrid}
    >
      <Box width="60%" className={classes.surveyForm} id="firstboxcontainer">
        <Box width="100%">
          <form style={{ width: "100%" }}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              id="secondgridcontainer"
            >
              <Box width="70%" className={classes.titleInputBox}>
                <Input
                  placeholder="Your survey title"
                  inputProps={{ "aria-label": "description" }}
                  className={classes.titleInput}
                  fullWidth
                />
              </Box>
              <Box width="50%" className={classes.titleInputBox}>
                <Input
                  placeholder="Your survey description"
                  inputProps={{ "aria-label": "description" }}
                  className={classes.descInput}
                  fullWidth
                />
              </Box>
            </Grid>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="cardarea">
                {(provided) => (
                  <Grid
                    container
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    direction="column"
                    justify="center"
                    alignItems="center"
                    id="secondgridcontainer"
                    className={classes.questionsContainerGrid}
                  >
                    {renderContent()}
                    {provided.placeholder}
                    <Box
                      component="span"
                      id="managesurveybox"
                      width="210px"
                      height="50px"
                      className={classes.manageSurveyBox}
                    >
                      <Tooltip title="Add question">
                        <IconButton
                          className={classes.manageSurveyBoxIcon}
                          onClick={() => {
                            onAddQuestion();
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Insert image">
                        <ImageInputBtn changeImage={onChangeImage} />
                      </Tooltip>
                      <Tooltip title="Embed video">
                        <IconButton
                          className={classes.manageSurveyBoxIcon}
                          onClick={onOpenEmbedVideoDialog}
                        >
                          <VideoCallIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Add text field">
                        <IconButton
                          className={classes.manageSurveyBoxIcon}
                          onClick={onAddTextField}
                        >
                          <TextFieldsIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Grid>
                )}
              </Droppable>
            </DragDropContext>
          </form>
        </Box>
      </Box>
      {openDialog === true ? (
        <EmbedVideoDialog
          open={openDialog}
          handleClose={onCloseEmbedVideoDialog}
          handleSubmit={onAddVideo}
        />
      ) : (
        <Fragment />
      )}
    </Grid>
  );
}

function EmbedVideoDialog(props) {
  const [url, setUrl] = useState("");

  const handleChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Embed video</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To embed a YouTube video into the survey, please insert its URL.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="embedvideourlfield"
          label="URL"
          type="url"
          fullWidth
          onChange={handleChange}
          value={url}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.handleClose();
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            props.handleSubmit(url);
            props.handleClose();
          }}
          color="primary"
        >
          Embed
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewSurvey;
