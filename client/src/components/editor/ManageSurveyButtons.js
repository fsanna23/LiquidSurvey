import React, { Fragment } from "react";
import { Box, IconButton, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ImageInputBtn from "./ImageInputBtn";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import PostAddIcon from "@material-ui/icons/PostAdd";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";

import { newSurveyStyle } from "../../editorStyles";
const useStyles = newSurveyStyle;

function ManageSurveyButtons(props) {
  const classes = useStyles();
  const {
    sectionsLength,
    sectionId,
    onAddQuestion,
    onAddImage,
    onOpenEmbedVideoDialog,
    onAddTextField,
    onAddSection,
    onRemoveSection,
  } = props;

  return (
    <Box
      component="span"
      id={"managesurveybox-" + sectionId}
      className={
        sectionsLength === 1
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
        <ImageInputBtn changeImage={onAddImage} />
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
      <Tooltip title="Add section">
        <IconButton
          className={classes.manageSurveyBoxIcon}
          onClick={onAddSection}
        >
          <PostAddIcon />
        </IconButton>
      </Tooltip>
      {sectionsLength !== 1 ? (
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
  );
}

export default ManageSurveyButtons;
