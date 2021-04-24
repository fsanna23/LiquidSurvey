import React, { Fragment } from "react";
import { MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";
import questionTypes from "../questionTypes";
import ShortTextIcon from "@material-ui/icons/ShortText";
import SubjectIcon from "@material-ui/icons/Subject";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import LinearScaleIcon from "@material-ui/icons/LinearScale";
import ImportExportIcon from "@material-ui/icons/ImportExport";

function QuestionTypeSelectMenuItem(props) {
  const renderIcon = () => {
    const questionType = props["data-value"];
    console.log("The question type is: ", questionType);
    switch (questionType) {
      case questionTypes.SHORT_TEXT:
        return <ShortTextIcon />;
      case questionTypes.PARAGRAPH:
        return <SubjectIcon />;
      case questionTypes.MULTIPLE_CHOICE:
        return <RadioButtonCheckedIcon />;
      case questionTypes.CHECKBOX:
        return <CheckBoxIcon />;
      case questionTypes.LINEAR_SCALE:
        return <LinearScaleIcon />;
      case questionTypes.RANKING:
        return <ImportExportIcon />;
      default:
        return <Fragment />;
    }
  };

  return (
    <MenuItem {...props}>
      <ListItemIcon>{renderIcon()}</ListItemIcon>
      <ListItemText primary={props["data-value"]} />
    </MenuItem>
  );
}

export default QuestionTypeSelectMenuItem;
