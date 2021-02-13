import {
  ShortAnswer,
  Paragraph,
  MultipleChoice,
  CheckBox,
  Survey,
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
let mySurvey = new Survey("Prova1", "Desc1", [
  firstQuestion,
  secondQuestion,
  thirdQuestion,
  fourthQuestion,
]);
let mySimpleSurvey = new Survey("Prova2", "Desc2", [firstQuestion]);

export { mySimpleSurvey, mySurvey };
