import React, { useState, useContext } from "react";
import contentTypes from "../contentTypes";
import Question from "./Question";
import RandomNumber from "./RandomNumber";
import ContentActions from "./ContentActions";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Divider,
  Typography,
} from "@material-ui/core";
// Style
import { contentStyle } from "./editorStyles";
const useStyles = contentStyle;

function Content({ content, sectionIndex, contentIndex }) {
  const classes = useStyles();
  const { type: contentType, contentId, data } = content;
  const { images, descStatus, isMandatory } = data;

  const renderContent = () => {
    switch (contentType) {
      case contentTypes.QUESTION:
        return (
          <Question
            sectionIndex={sectionIndex}
            contentIndex={contentIndex}
            data={data}
          />
        );
      case contentTypes.RANDOM_NUMBER:
        return (
          <RandomNumber
            data={data}
            sectionIndex={sectionIndex}
            contentIndex={contentIndex}
          />
        );
      default:
        break;
    }
  };

  console.log("Rendering Content sx cx: ", sectionIndex, contentIndex);

  return (
    <Box className={classes.pageContent}>
      {contentIndex === 0 ? (
        <Box component="div" className={classes.sectionDecor}>
          <Typography variant="body2">Section {sectionIndex + 1}</Typography>
        </Box>
      ) : null}
      <Card className={classes.innerCardItem}>
        <CardContent>{renderContent()}</CardContent>
        <Divider variant="middle" />
        <CardActions className={classes.cardActions}>
          <ContentActions
            sectionIndex={sectionIndex}
            contentIndex={contentIndex}
            images={images}
            isMandatory={isMandatory}
            descStatus={descStatus}
            type={contentType}
            id={contentId}
          />
        </CardActions>
      </Card>
    </Box>
  );
}

export default React.memo(Content);
// export default Content;
