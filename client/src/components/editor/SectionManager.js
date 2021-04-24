import React, { useContext, Fragment } from "react";
import { Box } from "@material-ui/core";
import SectionManagerBtn from "./SectionManagerBtn";
import { surveyActionTypes } from "./surveyActionTypes";
import { sectionManagerStyle } from "./editorStyles";
import {
  NewSurveyDispatcherContext,
  SectionLengthContext,
  action_types,
} from "./NewSurveyContext";
import content_type from "../contentTypes";
const useStyles = sectionManagerStyle;

function SectionManager({ id, sectionIndex }) {
  const classes = useStyles();
  const dispatch = useContext(NewSurveyDispatcherContext);
  const sectionsLength = useContext(SectionLengthContext);

  const addContent = (contentType) => {
    const switchContent = (contentType) => {
      switch (contentType) {
        case content_type.QUESTION:
          return {
            type: content_type.QUESTION,
            data: {},
          };
        case content_type.IMAGE:
          return {
            type: content_type.IMAGE,
            data: {},
          };
        case content_type.TEXT:
          return {
            type: content_type.TEXT,
            data: {},
          };
        case content_type.RANDOM_NUMBER: {
          console.log("Adding a random number section manager");
          return {
            type: content_type.RANDOM_NUMBER,
            data: {},
          };
        }
        default:
          return {};
      }
    };
    const newContent = switchContent(contentType);
    dispatch({
      type: action_types.ADD_CONTENT,
      payload: { sectionIndex, newContent },
    });
  };

  const addSection = () => {
    dispatch({
      type: action_types.ADD_PAGE,
      payload: { sectionIndex },
    });
  };

  const removeSection = () => {
    dispatch({
      type: action_types.REMOVE_PAGE,
      payload: { sectionIndex },
    });
  };

  /* VIDEO functions */

  const onOpenEmbedVideoDialog = () => {
    // setOpenDialog(true);
  };

  const onCloseEmbedVideoDialog = () => {
    // setOpenDialog(false);
  };

  const onAddVideo = (url) => {
    /* const newContentId = increaseContentCounter();
    const newVideo = {
      contentId: newContentId,
      type: content_type.VIDEO,
      data: { url: url },
    };
    addContent(newVideo); */
  };

  /* end VIDEO functions */

  console.log("Rendering SectionManager sx: ", sectionIndex);

  return (
    <Box
      component="span"
      id={"managesurveybox-" + id}
      className={
        sectionsLength === 1
          ? classes.manageSurveyBox
          : classes.manageSurveyBoxSection
      }
    >
      <SectionManagerBtn
        title="Add question"
        actionType={surveyActionTypes.QUESTION}
        clickCallback={addContent}
      />
      <SectionManagerBtn
        title="Add image"
        actionType={surveyActionTypes.IMAGE}
        clickCallback={addContent}
      />
      <SectionManagerBtn
        title="Add text field"
        actionType={surveyActionTypes.TEXT}
        clickCallback={addContent}
      />
      <SectionManagerBtn
        title="Add random number"
        actionType={surveyActionTypes.RANDOM_NUMBER}
        clickCallback={addContent}
      />
      <SectionManagerBtn
        title="Add section"
        actionType={surveyActionTypes.ADD_SECTION}
        clickCallback={addSection}
      />
      {sectionsLength !== 1 ? (
        <SectionManagerBtn
          title="Remove section"
          actionType={surveyActionTypes.REMOVE_SECTION}
          clickCallback={removeSection}
        />
      ) : (
        <Fragment />
      )}
    </Box>
  );
}

export default React.memo(SectionManager);
// export default SectionManager;
