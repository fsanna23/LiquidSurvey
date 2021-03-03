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
        "pageId" : "1",
        "contents": [
          {
            "type": "Question",
            "data": {
              "type": "Multiple Choice",
              "title": "The AI must decide: Is 40% or more of the nutrients on then plate fat?",
              "description": "What will the AI decide?",
              "choices": [
                {
                  "id" : "1",
                  "value": "No, 30% of the nutrients on this plate is not fat."
                },
                {
                  "id" : "2",
                  "value": "Yes, 30% of the nutrients on this plate is not fat."
                }
              ],
              "images": ["image01.png", "image02.png"]
            }
          },
          {
            "type": "Question",
            "data": {
              "type": "Short Text",
              "title": "The AI generated its prediction giving this motivation: it is represented as two curved lines",
              "description": "What is your decision?"
            }
          },
          {
            "type": "Question",
            "data": {
              "type": "Ranking",
              "title": "Employee Performance review",
              "description": "Rank these elements sorting them by importance to you",
              "choices": [
                {
                  "id": "1",
                  "value": "Job Knowledge"
                },
                {
                  "id": "2",
                  "value": "Work Quality"
                },
                {
                  "id": "3",
                  "value": "Attendance/punctuality"
                },
                {
                  "id": "4",
                  "value": "Productivity"
                },
                {
                  "id": "5",
                  "value": "Communication Skills"
                }
              ]
            }
          },
        ],
      },
      {
        pageId: 2,
        contents: [
          {
            contentId: 1,
            type: "Image",
            data: {
              title: "ImagetitleProva",
              randomName: "Pippo",
              randomStatus: true,
            },
          },
          {
            contentId: 2,
            type: "Random Number",
            data: { name: "Pippo", minRange: 0, maxRange: 100 },
          },
          {
            contentId: 3,
            type: "Random Number",
            data: { name: "Gatto", minRange: 0, maxRange: 100 },
          },        
        ],
      },
    {
      pageId: 3,
      contents: [
        
        {
          contentId: 1,
          type: "Image",
          data: {
            title: "ImagetitleProva",
            randomName: "Cane",
            randomStatus: true,
          },
        },
        {
          contentId: 2,
          type: "Random Number",
          data: { name: "Cane", minRange: 0, maxRange: 100 },
        }, 
        {
          contentId: 3,
          type: "Image",
          data: {
            title: "ImagetitleProva",
            randomName: "Gatto",
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
