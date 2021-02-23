import {
  SurveyPage,
  Survey,
  CheckBox,
  Image,
  LinearScale,
  MultipleChoice,
  Paragraph,
  Ranking,
  ShortAnswer,
  Text,
  Video,
} from "./Survey";

function createContentObj(content) {}

export function JSONToSurvey(json) {
  let surveyTitle = json.title;
  let surveyDescription = json.description;
  let surveyPages = json.pages;
  for (const page of surveyPages) {
    let contentArray = [];
    const pageContent = page.content;
    for (const content of pageContent) {
      contentArray.push(createContentObj(content));
    }
    let pageObj = new SurveyPage(contentArray);
  }
}

export function optimizeJSON(json) {}
