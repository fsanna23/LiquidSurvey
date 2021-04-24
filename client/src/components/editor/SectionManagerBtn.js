import React from "react";
import { Tooltip, IconButton } from "@material-ui/core";
// Icons
import AddIcon from "@material-ui/icons/Add";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import PostAddIcon from "@material-ui/icons/PostAdd";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import { surveyActionTypes } from "./surveyActionTypes";
import { sectionManagerBtnStyle } from "./editorStyles";
import content_type from "../contentTypes";
const useStyles = sectionManagerBtnStyle;

const SectionManagerBtn = React.forwardRef(
  ({ title, actionType, clickCallback }, ref) => {
    const classes = useStyles();
    const renderIcon = () => {
      switch (actionType) {
        case surveyActionTypes.QUESTION:
          return <AddIcon />;
        case surveyActionTypes.IMAGE:
          return <InsertPhotoIcon />;
        case surveyActionTypes.TEXT:
          return <TextFieldsIcon />;
        case surveyActionTypes.RANDOM_NUMBER:
          return <BookmarkIcon />;
        case surveyActionTypes.ADD_SECTION:
          return <PostAddIcon />;
        case surveyActionTypes.REMOVE_SECTION:
          return <DeleteSweepIcon />;
        /* INSERT VIDEO - icon: VideoCallIcon */
        default:
          return null;
      }
    };

    console.log("Rendering SectionManagerBtn with actionType ", actionType);

    return (
      <Tooltip title={title}>
        <IconButton
          className={classes.manageSurveyBoxIcon}
          onClick={() => {
            console.log("SectionManagerBtn the action type is: ", actionType);
            console.log(
              "Clicked btn SectionManagerBtn, content type is: ",
              content_type[actionType]
            );
            clickCallback(content_type[actionType]);
          }}
          ref={ref}
        >
          {renderIcon()}
        </IconButton>
      </Tooltip>
    );
  }
);

// export default React.memo(SectionManagerBtn);
export default SectionManagerBtn;
