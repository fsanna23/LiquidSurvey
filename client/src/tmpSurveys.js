import {
  ShortAnswer,
  Paragraph,
  MultipleChoice,
  CheckBox,
  Survey,
  SurveyPage,
} from "./surveys/Survey";

let firstQuestion = new ShortAnswer("My Title", true);
let secondQuestion = new Paragraph("My Paragraph Title", true);
let thirdQuestion = new MultipleChoice("My MultipleChoice Title", true, [
  "firstMCChoice",
  "secondMCChoice",
  "thirdMCCChoice",
]);
let fourthQuestion = new CheckBox("My Checkbox Title", true, [
  "firstCBChoice",
  "secondCBChoice",
  "thirdCBChoice",
  "fourthCBChoice",
]);

let firstPage = new SurveyPage([
  firstQuestion,
  secondQuestion,
  thirdQuestion,
  fourthQuestion,
]);
let secondPage = new SurveyPage([firstQuestion]);

let otherSurvey = new Survey("Prova1", "Desc1", [firstPage]);
let mySurvey = {
  title: "Random01",
  description: "RandomDesc",
  pages: [
    {
      pageId: 1,
      contents: [
        {
          contentId: 1,
          type: "Random Number",
          data: { name: "Pippo", minRange: 0, maxRange: 100 },
        },
        {
          contentId: 2,
          type: "Image",
          data: {
            title: "ImagetitleProva",
            randomName: "Pippo",
            randomStatus: true,
          },
        },
        {
          contentId: 3,
          type: "Random Number",
          data: { name: "Pluto", minRange: 0, maxRange: 100 },
        },
        {
          contentId: 4,
          type: "Random Number",
          data: { name: "Prova", minRange: 0, maxRange: 100 },
        },
        {
          contentId: 5,
          type: "Image",
          data: {
            title: "ImagetitleProva2",
            randomName: "Prova",
            randomStatus: true,
          },
        },
      ],
    },
  ],
};

let mySimpleSurvey = {
  title: "Random01",
  description: "RandomDesc",
  pages: [
    {
      pageId: 1,
      contents: [
        {
          contentId: 1,
          type: "Random Number",
          data: { name: "Pippo", minRange: 0, maxRange: 100 },
        },
        {
          contentId: 2,
          type: "Image",
          data: {
            title: "ImagetitleProva",
            randomName: "Pippo",
            randomStatus: true,
          },
        },
      ],
    },
  ],
};

export { mySimpleSurvey, mySurvey };
