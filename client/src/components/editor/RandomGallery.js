import React, { useState, useEffect, Fragment } from "react";
import { Button, Typography } from "@material-ui/core";
import content_type from "../../contentTypes";

function RandomGallery(props) {
  const [content, setContent] = useState(undefined);
  const [contentIndex, setContentIndex] = useState(0);
  const [contentList, setContentList] = useState([]);
  const randomType = props.randomType;

  useEffect(() => {
    if (content === undefined) {
      getFirstContent();
    }
  }, []);

  const getFirstContent = () => {
    // TODO generalize for any type of content
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
  };

  const getPreviousContent = () => {
    let newIndex;
    if (contentIndex !== 0) {
      console.log("Content index is not zero");
      newIndex = contentIndex - 1;
      setContentIndex(contentIndex - 1);
    } else {
      console.log("Content index is zero");
      newIndex = contentList["Question Images"].length - 1;
      setContentIndex(contentList["Question Images"].length - 1);
    }
    console.log("The new index is", newIndex);
    console.log("The list is: ", contentList);
    console.log(
      "The value at the list is :",
      contentList["Question Images"][newIndex]
    );
    let url = new URL("http://localhost:9000/getImage");
    url.search = new URLSearchParams({
      imageName: contentList["Question Images"][newIndex],
      folder: "question",
    });
    fetch(url)
      .then((response) => response.blob())
      .then((data) => setContent(data));
  };

  const getNextContent = () => {
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

  const renderRandomComponent = () => {
    switch (randomType) {
      case content_type.IMAGE: {
        return content !== undefined ? (
          <img src={URL.createObjectURL(content)} alt="Random image" />
        ) : (
          <Fragment />
        );
      }
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
