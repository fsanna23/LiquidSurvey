const express = require("express");
const fs = require("fs");
let cors = require("cors");
const app = express();
const port = 9000;
const imageDir = __dirname + "/images/";
const questionImageDir = imageDir + "question/";
const explImageDir = imageDir + "explaination/";

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
