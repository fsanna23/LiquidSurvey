import React, { useContext } from "react";
import { Box, Grid } from "@material-ui/core";
import content_type from "../contentTypes";
import SectionManager from "./SectionManager";
import Content from "./Content";
import RandomizableContent from "./RandomizableContent";
import { pageStyle } from "./editorStyles";
import _ from "lodash";

const useStyles = pageStyle;

function Page({ section, sectionIndex }) {
  const classes = useStyles();

  const renderContent = (pageContent) => {
    return pageContent.map((cont, contentIndex) => {
      switch (cont.type) {
        case content_type.QUESTION:
        case content_type.RANDOM_NUMBER:
          return (
            <Content
              content={cont}
              sectionIndex={sectionIndex}
              contentIndex={contentIndex}
              key={cont.contentId}
            />
          );
        case content_type.IMAGE:
        case content_type.TEXT:
          return (
            <RandomizableContent
              content={cont}
              sectionIndex={sectionIndex}
              contentIndex={contentIndex}
              key={cont.contentId}
            />
          );
        default:
          return null;
      }
    });
  };

  console.log("Rendering Page with section index: ", sectionIndex);

  return (
    <Grid item xs={8} sm={12} lg={12} xl={12} className={classes.cardItem}>
      {renderContent(section.contents)}
      <Box className={classes.sectionManagerContainer}>
        <SectionManager id={section.pageId} sectionIndex={sectionIndex} />
      </Box>
    </Grid>
  );
}

function compareProps(prevProps, nextProps) {
  // console.log("Prevprops in Page is: ", prevProps);
  // console.log("Nextprops in Page is: ", nextProps);
  // console.log(
  //   "The isEqual on Page prop change is: ",
  //   _.isEqual(prevProps, nextProps)
  // );
  return _.isEqual(prevProps, nextProps);
}

// export default React.memo(Page, compareProps);
export default Page;
