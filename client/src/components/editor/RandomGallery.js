import React, { useState, useEffect, Fragment } from "react";
import { Button, Typography } from "@material-ui/core";
import content_type from "../../contentTypes";
import { randomGalleryStyle } from "../../editorStyles";
const useStyles = randomGalleryStyle;

function RandomGallery(props) {
  const [content, setContent] = useState(undefined);
  const [contentIndex, setContentIndex] = useState(0);
  const [contentList, setContentList] = useState([]);
  const randomType = props.randomType;
  const classes = useStyles();

  useEffect(() => {
    if (content === undefined) {
      getFirstContent();
    }
  }, []);

  const getFirstContent = () => {
    if (randomType === content_type.IMAGE) {
      let imageList;
      fetch("http://localhost:9000/getImageList")
        .then((response) => response.json())
        .then((data) => {
          setContentList(data);
          imageList = data;
        })
        .then(() => {
          let url = new URL("http://localhost:9000/getImage");
          url.search = new URLSearchParams({
            imageName: imageList["Question Images"][0],
            folder: "question",
          });
          fetch(url)
            .then((response) => response.blob())
            .then((data) => setContent(data));
        });
    }
    if (randomType === content_type.TEXT) {
      let textList;
      fetch("http://localhost:9000/getTextList")
        .then((response) => response.json())
        .then((data) => {
          setContentList(data);
          setContent(data[0]);
          textList = data;
        });
    }
  };

  const getPreviousContent = () => {
    const getImg = () => {
      let newIndex;
      if (contentIndex !== 0) {
        newIndex = contentIndex - 1;
        setContentIndex(contentIndex - 1);
      } else {
        newIndex = contentList["Question Images"].length - 1;
        setContentIndex(contentList["Question Images"].length - 1);
      }
      let url = new URL("http://localhost:9000/getImage");
      url.search = new URLSearchParams({
        imageName: contentList["Question Images"][newIndex],
        folder: "question",
      });
      fetch(url)
        .then((response) => response.blob())
        .then((data) => setContent(data));
    };

    const getTxt = () => {
      let newIndex;
      if (contentIndex !== 0) {
        newIndex = contentIndex - 1;
        setContentIndex(contentIndex - 1);
      } else {
        newIndex = contentList.length - 1;
        setContentIndex(contentList.length - 1);
      }
      setContent(contentList[newIndex]);
    };

    switch (randomType) {
      case content_type.IMAGE:
        return getImg();
      case content_type.TEXT:
        return getTxt();
      default:
        return;
    }
  };

  const getNextContent = () => {
    const getImg = () => {
      let newIndex;
      if (contentIndex !== contentList["Question Images"].length - 1) {
        newIndex = contentIndex + 1;
        setContentIndex(contentIndex + 1);
      } else {
        newIndex = 0;
        setContentIndex(0);
      }
      let url = new URL("http://localhost:9000/getImage");
      url.search = new URLSearchParams({
        imageName: contentList["Question Images"][newIndex],
        folder: "question",
      });
      fetch(url)
        .then((response) => response.blob())
        .then((data) => setContent(data));
    };

    const getTxt = () => {
      let newIndex;
      if (contentIndex !== contentList.length - 1) {
        newIndex = contentIndex + 1;
        setContentIndex(contentIndex + 1);
      } else {
        newIndex = 0;
        setContentIndex(0);
      }
      setContent(contentList[newIndex]);
    };

    switch (randomType) {
      case content_type.IMAGE:
        return getImg();
      case content_type.TEXT:
        return getTxt();
      default:
        return;
    }
  };

  const renderRandomComponent = () => {
    switch (randomType) {
      case content_type.IMAGE: {
        return content !== undefined ? (
          <img
            src={URL.createObjectURL(content)}
            alt="Random image"
            className={classes.imgContent}
          />
        ) : (
          <Fragment />
        );
      }
      case content_type.TEXT:
        return content !== undefined ? (
          <Typography className={classes.textContent} variant="body2">
            {content}
          </Typography>
        ) : (
          <Fragment />
        );
      default: {
        return <Fragment />;
      }
    }
  };

  return (
    <div>
      <Typography variant="body1">Overview of your random component</Typography>
      {renderRandomComponent()}
      <Button onClick={getPreviousContent}>Previous Content</Button>
      <Button onClick={getNextContent}>Next Content</Button>
    </div>
  );
}

export default RandomGallery;
