import React, { useState, Fragment } from "react";
import { Grid, Box, Input, IconButton, Tooltip } from "@material-ui/core";
import NewQuestion from "./NewQuestion";
import ImageInputBtn from "./ImageInputBtn";
import pages from "./pages";
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
import AddIcon from "@material-ui/icons/Add";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import NewImage from "./NewImage";
import NewTextField from "./NewTextField";
const useStyles = newSurveyStyle;

const content_type = {
  QUESTION: "QUESTION",
  IMAGE: "IMAGE",
  VIDEO: "VIDEO",
  TEXT: "TEXT",
};

function NewSurvey(props) {
  const classes = useStyles();
  const [surveyData, setSurveyData] = useState({
    title: "",
    description: "",
  });
  const [content, setContent] = useState([
    { id: 1, type: content_type.QUESTION, data: {} },
    { id: 2, type: content_type.QUESTION, data: {} },
  ]);
  const [openDialog, setOpenDialog] = useState(false);

  /*  Updates the state when the drag ends */
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    console.log("The destination is ", destination);
    console.log("The source is ", source);
    console.log("The draggableId is ", draggableId);
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
    setContent(newState);
  };

  const onAddQuestion = () => {
    const newQuestion = {
      id: content.length + 1,
      type: content_type.QUESTION,
      data: {},
    };
    setContent([...content, newQuestion]);
  };

  const onRemoveContent = (index) => {
    let newContent = content.filter((item, itemIndex) => {
      return index !== itemIndex;
    });
    let counter = 1;
    for (let cont of newContent) {
      cont.id = counter;
      counter++;
    }
    setContent(newContent);
  };

  /*  Changes the image and creates a new content, adding it to the state */
  const onChangeImage = (img) => {
    const newImage = {
      id: content.length + 1,
      type: content_type.IMAGE,
      data: { img: img },
    };
    setContent([...content, newImage]);

    // TODO upload to server
  };

  const onOpenEmbedVideoDialog = () => {
    setOpenDialog(true);
  };

  const onCloseEmbedVideoDialog = () => {
    setOpenDialog(false);
  };

  const onAddVideo = (url) => {
    const newVideo = {
      id: content.length + 1,
      type: content_type.VIDEO,
      data: { url: url },
    };
    setContent([...content, newVideo]);
  };

  const onAddTextField = () => {
    const newTextField = {
      id: content.length + 1,
      type: content_type.TEXT,
      data: {},
    };
    setContent([...content, newTextField]);
  };

  const onSaveSurvey = () => {
    /*  TODO: save survey data */
    console.log("The content is");
    console.log(content);
  };

  const onChangeSurveyTitle = (e) => {
    setSurveyData({ ...surveyData, title: e.target.value });
  };

  const onChangeSurveyDescription = (e) => {
    setSurveyData({ ...surveyData, description: e.target.value });
  };

  /*  This function is good for any of the content types. */
  const updateContent = (index, updates) => {
    let newContent = [...content];
    newContent[index] = {
      ...content[index],
      data: { ...content[index].data, ...updates },
    };
    setContent(newContent);
  };

  const renderContent = () => {
    /* TODO: consider move video parsing into a specific component */
    const parseVideoID = (url) => {
      const regexResult = url.match(/^[\s\S]*watch\?v=([\s\S]*)[\s\S]*$/);
      const separatorIndex = regexResult[1].indexOf("&");
      if (separatorIndex !== -1)
        return regexResult[1].substring(0, separatorIndex);
      return regexResult[1];
    };

    const getVideoThumbnail = (videoID) => {
      return `http://img.youtube.com/vi/${videoID}/0.jpg`;
    };

    console.log("Rendering the content, which is:");
    console.log(content);

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
              update={updateContent}
            />
          );
        case content_type.IMAGE:
          return (
            <NewImage
              key={cont.id}
              id={cont.id}
              index={index}
              image={cont.data.img}
              removeImage={onRemoveContent}
              update={updateContent}
            />
          );
        case content_type.VIDEO:
          /* NOTE: there's no meaning in showing the embedded video in
             the survey editor, therefore we get the video thumbnail and
             show that as an image. */
          const thumbnail = getVideoThumbnail(parseVideoID(cont.data.url));
          return (
            <NewImage
              key={cont.id}
              id={cont.id}
              index={index}
              url={thumbnail}
              videoUrl={cont.data.url}
              removeImage={onRemoveContent}
              update={updateContent}
            />
          );
        case content_type.TEXT:
          return (
            <NewTextField
              key={cont.id}
              id={cont.id}
              index={index}
              removeTextField={onRemoveContent}
              update={updateContent}
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
                  value={surveyData.title}
                  onChange={onChangeSurveyTitle}
                />
              </Box>
              <Box width="50%" className={classes.titleInputBox}>
                <Input
                  placeholder="Your survey description"
                  inputProps={{ "aria-label": "description" }}
                  className={classes.descInput}
                  fullWidth
                  value={surveyData.description}
                  onChange={onChangeSurveyDescription}
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
          <Grid item className={classes.bottomButtonsContainer}>
            <Button
              variant="contained"
              color="primary"
              className={classes.bottomButton}
              onClick={() => {
                props.setPage(pages.MAIN);
              }}
            >
              Back to home page
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.bottomButton}
              onClick={() => {
                onSaveSurvey();
              }}
            >
              Save survey
            </Button>
          </Grid>
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
