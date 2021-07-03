const express = require("express");
const fs = require("fs");
let cors = require("cors");
const { nanoid } = require("nanoid");
const app = express();
const port = 9000;
const publicDir = __dirname + "/public/";
const imageDir = publicDir + "/images/";
const textDir = __dirname + "/textcontent/";
const surveyDir = __dirname + "/surveys/";

const content_type = {
  QUESTION: "Question",
  IMAGE: "Image",
  VIDEO: "Video",
  TEXT: "Text",
  RANDOM_NUMBER: "Random Number",
};

const getExtension = (filename) => {
  const splittedString = filename.split(".");
  return splittedString[1];
};

const removeExtension = (filename) => {
  const splittedString = filename.split(".");
  return splittedString[0];
};

const splitNameByUnderscore = (filename) => {
  const splittedString = filename.split("_");
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

app.use(express.urlencoded({ extended: true }));

//Static files
app.use(express.static("public"));

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("The server is running!");
});

/*   Returns JSON with two lists: one for the question images and one for the explaination images.
 *   This method was used when the client had to make http requests for each image - obsolete */
app.get("/getImageList", (req, res) => {
  let imgJson = [];
  fs.readdirSync(imageDir).forEach((img) => {
    const imgName = removeExtension(img);
    imgJson.push(imgName);
  });
  res.status(200).json(imgJson);
  console.log(imgJson);
});

/*  New Get Image List ->  doesn't remove extensions, the client doesn't have to make http requests
    but uses direct links like "http://localhost:9000/images/1_01.jpg"  */
app.get("/newGetImageList", (req, res) => {
  let imgJson = [];
  fs.readdirSync(imageDir).forEach((img) => {
    imgJson.push(img);
  });
  res.status(200).json(imgJson);
  console.log(imgJson);
});

app.get("/getImageNumbers", (req, res) => {
  let imageArray = [];
  fs.readdirSync(imageDir).forEach((img) => {
    const imgName = splitNameByUnderscore(img);
    if (!imageArray.includes(imgName)) imageArray.push(imgName);
  });
  res.status(200).json(imageArray);
  console.log(imageArray);
});

app.get("/getImage", (req, res) => {
  const { imageName } = req.query;
  try {
    const image = checkImage(imageName, imageDir);
    res.set({ "Content-Type": "image/png" }).sendFile(imageDir + image);
  } catch (e) {
    res.status(500);
  }
});

app.get("/getRandomImage", (req, res) => {
  const { imageName } = req.query;
  // TODO check if folder is question or explanation. For now, just question is used
  let imgArray = [];
  fs.readdirSync(imageDir).forEach((img) => {
    /*   The following "if" checks the first name of the image.
     *   Every image is of the type 0_01, where the part before the underscore
     *   specifies the number and the part after the underscore specifies the
     *   "variant"  of the image. */
    if (splitNameByUnderscore(img) === imageName) {
      imgArray.push(img);
    }
  });
  /*   The array imgArray contains every image with the first name passed as query.
   *   The following line gets a random image from that array. */
  const randomImg = imgArray[Math.floor(Math.random() * imgArray.length)];
  console.log("The image randomized is: ", questionImageDir + randomImg);
  console.log("The extension is: ", getExtension(randomImg));
  res
    .set({ "Content-Type": "image/" + getExtension(randomImg) })
    .sendFile(questionImageDir + randomImg);
});

/* Updated version -> it sends a json with the filename instead of the file itself as blob. */
app.get("/newGetRandomImage", (req, res) => {
  const { imageName } = req.query;
  // TODO check if folder is question or explanation. For now, just question is used
  let imgArray = [];
  fs.readdirSync(imageDir).forEach((img) => {
    /*   The following "if" checks the first name of the image.
     *   Every image is of the type 0_01, where the part before the underscore
     *   specifies the number and the part after the underscore specifies the
     *   "variant"  of the image. */
    if (splitNameByUnderscore(img) === imageName) {
      imgArray.push(img);
    }
  });
  /*   The array imgArray contains every image with the first name passed as query.
   *   The following line gets a random image from that array. */
  const randomImg = imgArray[Math.floor(Math.random() * imgArray.length)];
  res.json({ image: randomImg });
});

app.get("/getTextList", (req, res) => {
  const rawData = fs.readFileSync(textDir + "text.json");
  const texts = JSON.parse(rawData);
  let textArray = [];
  texts.forEach((image) => {
    image["texts"].forEach((txt) => {
      textArray.push(txt);
    });
  });
  res.json(textArray);
});

app.get("/getRandomText", (req, res) => {
  const { textName } = req.query;
  const rawData = fs.readFileSync(textDir + "text.json");
  const texts = JSON.parse(rawData);
  let textArray = [];
  texts.forEach((image) => {
    if (image.image.toString() === textName) {
      textArray = image["texts"];
    }
  });
  const randomText = textArray[Math.floor(Math.random() * textArray.length)];
  res.json(randomText);
});

app.get("/getSurveys", (req, res) => {
  const rawData = fs.readFileSync(surveyDir + "surveys.json");
  const surveys = JSON.parse(rawData);
  res.json(surveys);
});

app.get("/getTemplates", (req, res) => {
  const rawData = fs.readFileSync(surveyDir + "templates.json");
  const templates = JSON.parse(rawData);
  res.json(templates);
});

app.post("/insertSurvey", (req, res) => {
  let newSurvey = req.body;
  const rawData = fs.readFileSync(surveyDir + "surveys.json");
  let surveys = JSON.parse(rawData);
  newSurvey.id = nanoid(); // Generate new random ID
  surveys.push(newSurvey);
  const newData = JSON.stringify(surveys);
  fs.writeFileSync(surveyDir + "surveys.json", newData);
  res.status(200).json({ status: "saved" });
});

app.post("/insertTemplate", (req, res) => {
  let newTemplate = req.body;
  const rawData = fs.readFileSync(surveyDir + "templates.json");
  let templates = JSON.parse(rawData);
  newTemplate.id = nanoid(); // Generate new random ID
  templates.push(newTemplate);
  const newData = JSON.stringify(templates);
  fs.writeFileSync(surveyDir + "templates.json", newData);
  res.status(200).json({ status: "saved" });
});

app.put("/editSurvey", (req, res) => {
  console.log("Editing survey");
  let newSurvey = req.body;
  const rawData = fs.readFileSync(surveyDir + "surveys.json");
  let surveys = JSON.parse(rawData);
  console.log(newSurvey.id);
  surveys = surveys.map((survey) =>
    survey.id === newSurvey.id ? newSurvey : survey
  );
  const newData = JSON.stringify(surveys);
  fs.writeFileSync(surveyDir + "surveys.json", newData);
  res.status(200).json({ status: "saved" });
});

app.put("/editTemplate", (req, res) => {
  let newTemplate = req.body;
  const rawData = fs.readFileSync(surveyDir + "templates.json");
  let templates = JSON.parse(rawData);
  templates = templates.map((template) =>
    template.id === newTemplate.id ? newTemplate : template
  );
  const newData = JSON.stringify(templates);
  fs.writeFileSync(surveyDir + "templates.json", newData);
  res.status(200).json({ status: "saved" });
});

app.delete("/deleteSurvey", (req, res) => {
  const deleteSurvey = req.body;
  const rawData = fs.readFileSync(surveyDir + "surveys.json");
  let surveys = JSON.parse(rawData);
  surveys = surveys.filter((survey) => survey.id !== deleteSurvey.id);
  console.log(surveys);
  console.log("The ID survey for deleting was: ", deleteSurvey.id);
  console.log("\n Survey deleted! \n");
  const newData = JSON.stringify(surveys);
  fs.writeFileSync(surveyDir + "surveys.json", newData);
  res.status(200).json({ status: "saved" });
});

app.delete("/deleteTemplate", (req, res) => {
  const deleteTemplate = req.body;
  const rawData = fs.readFileSync(surveyDir + "templates.json");
  let templates = JSON.parse(rawData);
  templates = templates.filter((template) => template.id !== deleteTemplate.id);
  console.log(templates);
  console.log("The ID template for deleting was: ", deleteTemplate.id);
  console.log("\n Template deleted! \n");
  const newData = JSON.stringify(templates);
  fs.writeFileSync(surveyDir + "templates.json", newData);
  res.status(200).json({ status: "saved" });
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

/*  Survey answers methods  */

app.post("/saveSurveyAnswers", (req, res) => {
  let surveyAnswers = req.body;
  const rawData = fs.readFileSync(surveyDir + "answers.json");
  let answers = JSON.parse(rawData);
  surveyAnswers.id = nanoid(); // Generate new random ID for the answer. The survey id is saved in "surveyId"
  answers.push(surveyAnswers);
  const newData = JSON.stringify(answers);
  fs.writeFileSync(surveyDir + "answers.json", newData);
  res.status(200).json({ status: "saved" });
});

app.get("/getSurveyAnswers", (req, res) => {
  const surveyId = req.query;
  const rawData = fs.readFileSync(surveyDir + "answers.json");
  const answers = JSON.parse(rawData);
  const surveyAnswers = answers.filter((el) => el.surveyId === surveyId);
  if (surveyAnswers.length > 0) {
    res.status(200).json({ answers: surveyAnswers, status: "found" });
  } else {
    res.status(500).json({ status: "not found" });
  }
});

/*  The server is launched at port ${port} */
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
