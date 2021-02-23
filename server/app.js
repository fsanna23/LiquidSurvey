const express = require("express");
const fs = require("fs");
const app = express();
const port = 9000;
const imageDir = "./images/";
const questionImageDir = imageDir + "question/";
const explImageDir = imageDir + "explaination/";

const removeExtension = (filename) => {
  const splittedString = filename.split(".");
  return splittedString[0];
};

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
