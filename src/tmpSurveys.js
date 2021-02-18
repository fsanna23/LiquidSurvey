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

let mySurvey = new Survey("Prova1", "Desc1", [firstPage]);
let mySimpleSurvey = new Survey("Prova2", "Desc2", [secondPage]);

export { mySimpleSurvey, mySurvey };
