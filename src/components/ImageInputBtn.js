import React, { useState, useRef } from "react";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import { IconButton } from "@material-ui/core";

function ImageInputBtn(props) {
  const fileInput = useRef(null);

  /*  Simulates the click on the input file */
  const onAddImage = () => {
    fileInput.current.click();
  };

  /*  Changes the image and creates a new content, adding it to the state */
  const onChangeImage = (e) => {
    const myImg = e.target.files[0];
    // RETURN IMAGE
    props.changeImage(myImg);
  };

  return (
    <div>
      <InsertPhotoIcon />
      <input
        style={{
          display: "none",
          top: "0px",
          right: "0px",
        }}
        type="file"
        accept=".jpeg, .jpg, .png"
        ref={fileInput}
        onChange={onChangeImage}
      />
    </div>
  );
}

export default ImageInputBtn;
