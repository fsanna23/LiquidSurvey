/* eslint-disable default-case */
import React, { Fragment, useEffect, useState } from "react";
// Dialog
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Input,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import NewQuestion from "./NewQuestion";
import ImageInputBtn from "./ImageInputBtn";
import pages from "../pages";
// DragAndDrop
import { DragDropContext, Droppable } from "react-beautiful-dnd";
// Styles
import { newSurveyStyle } from "../../editorStyles";
import AddIcon from "@material-ui/icons/Add";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import PostAddIcon from "@material-ui/icons/PostAdd";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import NewImage from "./NewImage";
import NewTextField from "./NewTextField";
import NewRandomNumber from "./NewRandomNumber";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import PlaceholdersContext from "./PlaceholdersContext";

const useStyles = newSurveyStyle;

const content_type = {
  QUESTION: "Question",
  IMAGE: "Image",
  VIDEO: "Video",
  TEXT: "Text",
  RANDOM_NUMBER: "Random Number",
};

function NewSurvey(props) {
  const classes = useStyles();
  const [surveyData, setSurveyData] = useState({
    title: "",
    description: "",
  });
  const [sections, setSections] = useState([
    {
      pageId: 1,
      contents: [
        { contentId: 1, type: content_type.QUESTION, data: {} },
        { contentId: 2, type: content_type.QUESTION, data: {} },
      ],
    },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [sectionIdCounter, setSectionIdCounter] = useState(2);
  const [contentIdCounter, setContentIdCounter] = useState(3);
  const [randomNumbers, setRandomNumbers] = useState([
    { pageId: 1, placeholders: [] },
  ]);

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

    let newSections = [...sections]; // array of sections
    let sourcePage = sections.find(
      (c) => c.contentId.toString() === source.droppableId
    ); // section with ID and content
    const sourcePageIndex = sections.indexOf(sourcePage);
    /* Alternative sourcePageIndex -->
    const sourcePageIndex = sections.findIndex(
      (c) => c.id.toString() === source.droppableId
    );
    */
    const movedContent = sourcePage.contents.find(
      (c) => c.contentId.toString() === draggableId
    ); // content that has to be moved

    // Remove the content from the source page
    sourcePage.contents.splice(source.index, 1);

    // If the content is moved in the same section that it was before
    if (source.droppableId === destination.droppableId) {
      // Insert the content in the new position of the same section
      sourcePage.contents.splice(destination.index, 0, movedContent);
      // Update
      newSections[sourcePageIndex] = sourcePage;
      setSections(newSections);
      return;
    }

    let destinationPage = sections.find(
      (c) => c.pageId.toString() === destination.droppableId
    );
    const destinationPageIndex = sections.indexOf(destinationPage);
    destinationPage.contents.splice(destination.index, 0, movedContent);
    // If the source section has no more content, remove it
    newSections[destinationPageIndex] = destinationPage;
    if (sourcePage.contents.length === 0) {
      newSections.splice(sourcePageIndex, 1);
      let counter = sourcePage.pageId;
      for (let s of newSections) {
        if (s.pageId > sourcePage.pageId) {
          s.pageId = counter;
          counter++;
        }
      }
    } else {
      newSections[sourcePageIndex] = sourcePage;
    }
    setSections(newSections);

    /* OLD
    let newState = content;
    const movedContent = content.find((c) => c.id.toString() === draggableId);

    newState.splice(source.index, 1);
    newState.splice(destination.index, 0, movedContent);
    setContent(newState);*/
  };

  const onSaveSurvey = () => {
    const changeImages = (json) => {
      json.pages.forEach((page) => {
        page.contents.forEach((cont) => {
          if (cont.type === content_type.QUESTION) {
            if (
              cont.data.images &&
              Array.isArray(cont.data.images) &&
              cont.data.images.length !== 0
            ) {
              cont.data.images.map((img) => {
                return img.name;
              });
            }
          }
          if (cont.type === content_type.IMAGE) {
            cont.data.img = cont.data.img.name;
          }
        });
      });
      return json;
    };

    /*  TODO: save survey data */
    console.log("The content is");
    console.log(sections);
    let finalJSON = {
      title: surveyData.title,
      description: surveyData.description,
      pages: sections,
    };
    console.log(finalJSON);
    props.addSurvey(changeImages(finalJSON));
    props.setPage(pages.MAIN);
  };

  const onChangeSurveyTitle = (e) => {
    setSurveyData({ ...surveyData, title: e.target.value });
  };

  const onChangeSurveyDescription = (e) => {
    setSurveyData({ ...surveyData, description: e.target.value });
  };

  const increaseSectionCounter = () => {
    const newSectionId = sectionIdCounter;
    setSectionIdCounter(newSectionId + 1);
    return newSectionId;
  };

  const increaseContentCounter = () => {
    const newContentId = contentIdCounter;
    setContentIdCounter(newContentId + 1);
    return newContentId;
  };

  const renderSections = () => {
    return sections.map((section, sectionIndex) => {
      const addContent = (newContent) => {
        let newSections = [...sections];
        newSections[sectionIndex].contents = [
          ...newSections[sectionIndex].contents,
          newContent,
        ];
        setSections(newSections);
      };

      const onAddQuestion = () => {
        const newContentId = increaseContentCounter();
        const newQuestion = {
          contentId: newContentId,
          type: content_type.QUESTION,
          data: {},
        };
        addContent(newQuestion);
      };

      const onAddImage = () => {
        const newContentId = increaseContentCounter();
        const newImage = {
          contentId: newContentId,
          type: content_type.IMAGE,
          data: {},
        };
        addContent(newImage);
      };

      const onAddTextField = () => {
        const newContentId = increaseContentCounter();
        const newTextField = {
          contentId: newContentId,
          type: content_type.TEXT,
          data: {},
        };
        addContent(newTextField);
      };

      const onAddRandomNumber = () => {
        const newContentId = increaseContentCounter();
        const newRandomNumber = {
          contentId: newContentId,
          type: content_type.RANDOM_NUMBER,
          data: {},
        };
        addContent(newRandomNumber);
        let newRandomNumbers = [...randomNumbers];
        let phIndex = section.contents.length;
        newRandomNumbers[sectionIndex].placeholders.push({
          index: phIndex,
          name: "",
        });
        setRandomNumbers(newRandomNumbers);
      };

      const onOpenEmbedVideoDialog = () => {
        setOpenDialog(true);
      };

      const onCloseEmbedVideoDialog = () => {
        setOpenDialog(false);
      };

      const onAddVideo = (url) => {
        const newContentId = increaseContentCounter();
        const newVideo = {
          contentId: newContentId,
          type: content_type.VIDEO,
          data: { url: url },
        };
        addContent(newVideo);
      };

      const onAddSection = () => {
        const newContentId = increaseContentCounter();

        const newSectionId = increaseSectionCounter();

        const newSection = {
          pageId: newSectionId,
          contents: [
            {
              contentId: newContentId,
              type: content_type.QUESTION,
              data: {
                title: "",
              },
            },
          ],
        };
        let newSections = [...sections];
        /*let counter = section.id + 1;
        for (let s of newSections) {
          if (s.id >= section.id) {
            s.id = counter;
            counter++;
          }
        }*/
        newSections.splice(sectionIndex, 0, newSection);
        console.log("Added a new section, the sections now are: ", newSections);
        setSections(newSections);
      };

      const onRemoveSection = () => {
        let newSections = sections.filter((s, i) => i !== sectionIndex);
        /*let counter = section.id;
        for (let s of newSections) {
          if (s.id > section.id) {
            s.id = counter;
            counter++;
          }
        }*/
        console.log("The new sectins are", newSections);
        setSections(newSections);
      };

      const renderContent = (pageContent) => {
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

        return pageContent.map((cont, contentIndex) => {
          const removeContent = () => {
            if (sections.length === 1 && section.contents.length === 1) {
              alert("You must have at least one content in your survey!");
              return;
            }
            let newContent = section.contents.filter(
              (item, itemIndex) => contentIndex !== itemIndex
            );
            if (newContent.length !== 0) {
              /*let counter = 1;
              for (let c of newContent) {
                c.id = counter;
                counter++;
              }*/
              let newSections = [...sections];
              newSections[sectionIndex].contents = newContent;
              setSections(newSections);
            } else {
              onRemoveSection();
            }
          };

          const updateContent = (updates) => {
            let newContent = { ...cont };
            newContent.data = { ...cont.data, ...updates };
            console.log("The new content is now: ", newContent);
            let newSections = [...sections];
            newSections[sectionIndex].contents[contentIndex] = newContent;
            setSections(newSections);
          };

          const moveContentUp = () => {
            if (contentIndex === 0) {
              if (sectionIndex !== 0) {
                // Move to the section before the current one
                let destContent = sections[sectionIndex - 1].contents;
                //cont.id = destContent.length + 1;
                destContent = [...destContent, cont];
                section.contents.splice(contentIndex, 1);
                let newSections = [...sections];
                newSections[sectionIndex].contents = section.contents;
                newSections[sectionIndex - 1].contents = destContent;
                setSections(newSections);
                // Check and change placeholders
                if (cont.type === content_type.RANDOM_NUMBER) {
                  let newRandomNumbers = [...randomNumbers];
                  newRandomNumbers[
                    sectionIndex
                  ].placeholders = newRandomNumbers[
                    sectionIndex
                  ].placeholders.filter((ph) => ph.index !== contentIndex);
                  newRandomNumbers[sectionIndex - 1].placeholders.push({
                    index: destContent.length - 1,
                    name: cont.name,
                  });
                  setRandomNumbers(newRandomNumbers);
                }
                if (section.contents.length === 0) onRemoveSection();
              }
            } else {
              // Move up on the same section
              let newContent = [...sections[sectionIndex].contents];
              newContent.splice(contentIndex, 1);
              newContent.splice(contentIndex - 1, 0, cont);
              let newSections = [...sections];
              newSections[sectionIndex].contents = newContent;
              setSections(newSections);
              // Change placeholders
              let newRandomNumbers = [...randomNumbers];
              newRandomNumbers[sectionIndex].placeholders = newRandomNumbers[
                sectionIndex
              ].placeholders.map((ph) =>
                ph.index !== contentIndex
                  ? ph
                  : { ...ph, index: contentIndex - 1 }
              );
              setRandomNumbers(newRandomNumbers);
            }
          };

          const moveContentDown = () => {
            if (contentIndex === section.contents.length - 1) {
              if (sectionIndex !== sections.length - 1) {
                // Move to the section after the current one
                let destContent = sections[sectionIndex + 1].contents;
                destContent = [cont, ...destContent];
                section.contents.splice(contentIndex, 1);
                let newSections = [...sections];
                newSections[sectionIndex].contents = section.content;
                newSections[sectionIndex + 1].contents = destContent;
                setSections(newSections);
                // Check and change placeholders
                if (cont.type === content_type.RANDOM_NUMBER) {
                  let newRandomNumbers = [...randomNumbers];
                  newRandomNumbers[
                    sectionIndex
                  ].placeholders = newRandomNumbers[
                    sectionIndex
                  ].placeholders.filter((ph) => ph.index !== contentIndex);
                  newRandomNumbers[sectionIndex + 1].placeholders.push({
                    index: 0,
                    name: cont.name,
                  });
                  setRandomNumbers(newRandomNumbers);
                }
                if (section.contents.length === 0) onRemoveSection();
              }
            } else {
              // Move down on the same section
              let newContent = [...sections[sectionIndex].content];
              newContent.splice(contentIndex, 1);
              newContent.splice(contentIndex + 1, 0, cont);
              let newSections = [...sections];
              newSections[sectionIndex].contents = newContent;
              setSections(newSections);
              // Change placeholders
              let newRandomNumbers = [...randomNumbers];
              newRandomNumbers[sectionIndex].placeholders = newRandomNumbers[
                sectionIndex
              ].placeholders.map((ph) =>
                ph.index !== contentIndex
                  ? ph
                  : { ...ph, index: contentIndex + 1 }
              );
              setRandomNumbers(newRandomNumbers);
            }
          };

          const move = { up: moveContentUp, down: moveContentDown };

          switch (cont.type) {
            case content_type.QUESTION:
              return (
                <NewQuestion
                  key={cont.contentId}
                  content={cont.data}
                  id={cont.contentId}
                  index={contentIndex}
                  section={sectionIndex}
                  removeQuestion={removeContent}
                  move={move}
                  update={updateContent}
                />
              );
            case content_type.IMAGE:
              return (
                <NewImage
                  key={cont.contentId}
                  id={cont.contentId}
                  index={contentIndex}
                  image={cont.data.img}
                  removeImage={removeContent}
                  move={move}
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
                  key={cont.contentId}
                  id={cont.contentId}
                  index={contentIndex}
                  url={thumbnail}
                  videoUrl={cont.data.url}
                  removeImage={removeContent}
                  move={move}
                  update={updateContent}
                />
              );
            case content_type.TEXT:
              return (
                <NewTextField
                  key={cont.contentId}
                  id={cont.contentId}
                  index={contentIndex}
                  removeTextField={removeContent}
                  move={move}
                  update={updateContent}
                />
              );
            case content_type.RANDOM_NUMBER:
              return (
                <NewRandomNumber
                  key={cont.contentId}
                  id={cont.contentId}
                  index={contentIndex}
                  removeRandomNumber={removeContent}
                  move={move}
                  update={updateContent}
                />
              );
          }
        });
      };

      return (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          id={"droppablegridcontainer-" + section.pageId}
          className={
            sections.length === 1
              ? classes.questionsContainerGridHidden
              : classes.questionsContainerGrid
          }
        >
          {sections.length === 1 ? (
            <Fragment />
          ) : (
            <Box className={classes.sectionNameContainer}>
              <Typography variant="h6">
                {"Section " + (sectionIndex + 1)}
              </Typography>
            </Box>
          )}
          {renderContent(section.contents)}
          <Box
            component="span"
            id={"managesurveybox-" + section.pageId}
            className={
              sections.length === 1
                ? classes.manageSurveyBox
                : classes.manageSurveyBoxSection
            }
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
              {/* OLD <ImageInputBtn changeImage={onAddImage} />*/}
              <IconButton
                className={classes.manageSurveyBoxIcon}
                onClick={() => {
                  onAddImage();
                }}
              >
                <InsertPhotoIcon />
              </IconButton>
            </Tooltip>
            {/* ADD LATER
            <Tooltip title="Embed video">
              <IconButton
                className={classes.manageSurveyBoxIcon}
                onClick={onOpenEmbedVideoDialog}
              >
                <VideoCallIcon />
              </IconButton>
            </Tooltip>*/}
            <Tooltip title="Add text field">
              <IconButton
                className={classes.manageSurveyBoxIcon}
                onClick={onAddTextField}
              >
                <TextFieldsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add random number">
              <IconButton
                className={classes.manageSurveyBoxIcon}
                onClick={onAddRandomNumber}
              >
                <BookmarkIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add section">
              <IconButton
                className={classes.manageSurveyBoxIcon}
                onClick={onAddSection}
              >
                <PostAddIcon />
              </IconButton>
            </Tooltip>
            {sections.length !== 1 ? (
              <Tooltip title="Remove section">
                <IconButton
                  className={classes.manageSurveyBoxIcon}
                  onClick={onRemoveSection}
                >
                  <DeleteSweepIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Fragment />
            )}
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
            {renderSections()}
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
      {/*{openDialog === true ? (
        <EmbedVideoDialog
          open={openDialog}
          handleClose={onCloseEmbedVideoDialog}
          handleSubmit={onAddVideo}
        />
      ) : (
        <Fragment />
      )}*/}
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
