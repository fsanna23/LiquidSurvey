const express = require("express");
const fs = require("fs");
let cors = require("cors");
const app = express();
const port = 9000;
const imageDir = __dirname + "/images/";
const questionImageDir = imageDir + "question/";
const explImageDir = imageDir + "explaination/";

const content_type = {
  QUESTION: "Question",
  IMAGE: "Image",
  VIDEO: "Video",
  TEXT: "Text",
  RANDOM_NUMBER: "Random Number",
};

const removeExtension = (filename) => {
  const splittedString = filename.split(".");
  return splittedString[0];
};

const checkImage = (filename, folder) => {
  let found = undefined;
  fs.readdirSync(folder).forEach((img) => {
    if (img.split(".")[0] === filename) {
      found = img;
    }
  });
  return found;
};

app.use(cors());

app.get("/", (req, res) => {
  res.send("The server is running!");
});

/* Returns JSON with two lists: one for the question images and one for the explaination images */
app.get("/getImageList", (req, res) => {
  let imgJson = { "Question Images": [], "Explaination Images": [] };
  fs.readdirSync(questionImageDir).forEach((img) => {
    const imgName = removeExtension(img);
    imgJson["Question Images"].push(imgName);
  });
  fs.readdirSync(explImageDir).forEach((img) => {
    const imgName = removeExtension(img);
    imgJson["Explaination Images"].push(imgName);
  });
  res.status(200).json(imgJson);
  console.log(imgJson);
});

app.get("/getImage", (req, res) => {
  const { imageName, folder } = req.query;
  if (folder === "question") {
    const image = checkImage(imageName, questionImageDir);
    res.set({ "Content-Type": "image/png" }).sendFile(questionImageDir + image);
    return;
  }
  if (folder === "explaination") {
    const image = checkImage(imageName, explImageDir);
    res.sendFile(explImageDir + image);
    return;
  }
  res.status(500);
});

app.get("/getFirstContent", (req, res) => {
  const { contentType } = req.query;
  switch (contentType) {
    case content_type.IMAGE: {
      // Just getting "question" type images for now. Edit later
      const questionFiles = fs.readdirSync(questionImageDir);
      res
        .set({ "Content-Type": "image/png" })
        .sendFile(questionImageDir + questionFiles[0]);
      return;
    }
    default: {
      return;
    }
  }
});

app.get("/getPreviousContent", (req, res) => {
  const { contentType, currentContent } = req.query;
  console.log(currentContent.filename);
  // TEMP
  res.status(500);
  return;
  // END TEMP
  switch (contentType) {
    case content_type.IMAGE: {
      // Just getting "question" type images for now. Edit later
      const questionFiles = fs.readdirSync(questionImageDir);
      const currentIndex = questionFiles.findIndex(
        (file) => file === currentContent
      );
      if (currentIndex !== 0)
        res
          .set({ "Content-Type": "image/png" })
          .sendFile(questionImageDir + questionFiles[currentIndex - 1]);
      else
        res
          .set({ "Content-Type": "image/png" })
          .sendFile(questionImageDir + questionFiles[questionFiles.length - 1]);
      return;
    }
    default: {
      return;
    }
  }
});

app.get("/getNextContent", (req, res) => {
  const { contentType, currentContent } = req.query;
  switch (contentType) {
    case content_type.IMAGE: {
      // Just getting "question" type images for now. Edit later
      const questionFiles = fs.readdirSync(questionImageDir);
      res
        .set({ "Content-Type": "image/png" })
        .sendFile(questionImageDir + questionFiles[0]);
      return;
    }
    default: {
      return;
    }
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
