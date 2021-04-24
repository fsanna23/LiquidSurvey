import React, { useState, Fragment, useContext, useEffect } from "react";
import contentTypes from "../contentTypes";
import ImageInputBtn from "./ImageInputBtn";
import RandomContentActions from "./RandomContentActions";

// Material
import {
  Tooltip,
  IconButton,
  Switch,
  FormControlLabel,
  Divider,
} from "@material-ui/core";

// Context
import { NewSurveyDispatcherContext, action_types } from "./NewSurveyContext";

// Icons
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ShortTextIcon from "@material-ui/icons/ShortText";

// Style
import { contentActionsStyle } from "./editorStyles";
const useStyles = contentActionsStyle;

function ContentActions({
  sectionIndex,
  contentIndex,
  randomStatus,
  images,
  isMandatory,
  descStatus,
  type,
  id,
}) {
  const classes = useStyles();
  const dispatch = useContext(NewSurveyDispatcherContext);

  /* Dispatcher functions */

  const onMoveContentUp = () => {
    const payload = {
      sectionIndex: sectionIndex,
      contentIndex: contentIndex,
    };
    dispatch({ type: action_types.MOVE_CONTENT_UP, payload });
  };

  const onMoveContentDown = () => {
    const payload = {
      sectionIndex: sectionIndex,
      contentIndex: contentIndex,
    };
    dispatch({ type: action_types.MOVE_CONTENT_DOWN, payload });
  };

  const onRemoveContent = () => {
    const payload = {
      sectionIndex: sectionIndex,
      contentIndex: contentIndex,
    };
    dispatch({ type: action_types.REMOVE_CONTENT, payload });
  };

  const onSwitchMandatory = () => {
    const updates = { isMandatory: !isMandatory };
    const payload = {
      sectionIndex: sectionIndex,
      contentIndex: contentIndex,
      updates,
    };
    dispatch({ type: action_types.UPDATE_CONTENT, payload });
  };

  const onSwitchDescription = () => {
    const updates = { descStatus: !descStatus };
    const payload = {
      sectionIndex: sectionIndex,
      contentIndex: contentIndex,
      updates,
    };
    dispatch({ type: action_types.UPDATE_CONTENT, payload });
  };

  const onAddImage = (newImg) => {
    const newImages = [...images, newImg];
    const updates = { images: newImages };
    const payload = {
      sectionIndex: sectionIndex,
      contentIndex: contentIndex,
      updates,
    };
    dispatch({ type: action_types.UPDATE_CONTENT, payload });
  };

  /* End dispatcher functions */

  /* This renders if the content is a Question */
  const renderQuestionActions = () => {
    if (type === contentTypes.QUESTION) {
      return (
        <Fragment>
          <FormControlLabel
            control={
              <Switch
                checked={isMandatory !== undefined ? isMandatory : false}
                onChange={onSwitchMandatory}
                color="primary"
              />
            }
            label="Mandatory"
            labelPlacement="start"
          />
          <Divider
            orientation="vertical"
            flexItem
            className={classes.cardActionsDivider}
          />
          <Tooltip
            title={(descStatus ? "Show" : "Hide") + " description"}
            placement="bottom"
          >
            <IconButton onClick={onSwitchDescription}>
              <ShortTextIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Attach image" placement="bottom">
            <ImageInputBtn value={onAddImage} />
          </Tooltip>
        </Fragment>
      );
    }
    return null;
  };

  /* This renders if the content is an Image or a Text */
  const renderRandomActions = () => {
    switch (type) {
      case contentTypes.IMAGE:
      case contentTypes.TEXT:
        return (
          <RandomContentActions
            sectionIndex={sectionIndex}
            contentIndex={contentIndex}
            randomStatus={randomStatus}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Fragment>
      <div id={"left-side-actions" + id} className={classes.cardActionsLeft}>
        <Tooltip title="Move up" placement="bottom">
          <IconButton onClick={onMoveContentUp}>
            <ArrowUpward />
          </IconButton>
        </Tooltip>
        <Tooltip title="Move down" placement="bottom">
          <IconButton onClick={onMoveContentDown}>
            <ArrowDownward />
          </IconButton>
        </Tooltip>
      </div>
      <div className={classes.cardActionsRight}>
        {renderQuestionActions()}
        {renderRandomActions()}
        <Tooltip title="Delete content" placement="bottom">
          <IconButton onClick={onRemoveContent}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
    </Fragment>
  );
}

export default React.memo(ContentActions);
// export default ContentActions;
