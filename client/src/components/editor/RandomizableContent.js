import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Grid,
  Typography,
  Divider,
  Card,
  CardContent,
  CardActions,
} from "@material-ui/core";
import contentTypes from "../contentTypes";
import { contentStyle } from "./editorStyles";
import Image from "./Image";
import Text from "./Text";
import ContentActions from "./ContentActions";

const useStyles = contentStyle;

function RandomizableContent({ content, sectionIndex, contentIndex }) {
  const classes = useStyles();
  const { type: contentType, contentId, data } = content;
  const { randomStatus } = data;

  const renderContent = () => {
    switch (contentType) {
      case contentTypes.IMAGE:
        return (
          <Image
            sectionIndex={sectionIndex}
            contentIndex={contentIndex}
            data={data}
            id={contentId}
          />
        );
      case contentTypes.TEXT:
        return (
          <Text
            sectionIndex={sectionIndex}
            contentIndex={contentIndex}
            data={data}
          />
        );
      default:
        break;
    }
  };

  console.log(
    "Rendering a Randomizable content, sx cx: ",
    sectionIndex,
    contentIndex
  );

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
            type={contentType}
            id={contentId}
            randomStatus={randomStatus}
          />
        </CardActions>
      </Card>
    </Box>
  );
}

export default React.memo(RandomizableContent);
// export default RandomizableContent;
