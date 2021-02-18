const SHORT_ANSWER_LENGTH = 40;

/**
 *  Survey class, it contains a list of Questions and meta data
 *  about the creator of the survey, the date of creation,
 *  the scope of the survey and other.
 */
export class Survey {
  constructor(title, description, pages) {
    this.id = null;
    if (typeof title !== "string") throw new Error("Title is not a string");
    if (typeof description !== "string")
      throw new Error("Description is not a string");
    this.title = title;
    this.description = description;
    if (!Array.isArray(pages))
      throw new Error("You must pass an array of pages");
    if (!this._checkValidPages(pages))
      throw new Error("You must pass only SurveyPages objects");
    this.pages = pages;
  }

  setId(id) {
    if (typeof id !== "number") throw new Error("The ID is not a number");
    this.id = id;
  }

  _checkValidPages(pages) {
    pages.forEach((page) => {
      if (!page instanceof SurveyPage) {
        return false;
      }
    });
    return true;
  }
}

export class SurveyPage {
  constructor(content) {
    if (!Array.isArray(content))
      throw new Error("You must pass an array of content");
    if (!this._checkValidQuestions(content))
      throw new Error("You must pass only SurveyContent objects");
    this.content = content;
  }
  _checkValidQuestions(content) {
    content.forEach((cnt) => {
      if (!cnt instanceof SurveyContent) {
        return false;
      }
    });
    return true;
  }
}

/**
 * Survey content (can be a question, an image,
 * an embedded video or a text with a description)
 */
class SurveyContent {
  constructor(title) {
    this.id = null;
    if (typeof title !== "string") throw new Error("Title is not a string");
    this.title = title;
  }
}

export class Image extends SurveyContent {
  constructor(title, blob) {
    super(title);
    if (!blob instanceof Blob)
      throw new Error("The passed argument is not a Blob");
    this.blob = blob;
  }
}

export class Video extends SurveyContent {
  constructor(title, url) {
    super(title);
    if (typeof url !== "string") throw new Error("The url is not a string");
    if (!this._checkUrlValidity(url))
      throw new Error("The url is not valid one");
    this.url = url;
  }

  _checkUrlValidity(url) {
    return url.includes("youtube.com/watch?v=");
  }
}

export class Text extends SurveyContent {
  constructor(title, description) {
    super(title);
    if (typeof description !== "string")
      throw new Error("Description is not a string");
    this.description = description;
  }
}

/**
 *  Base question class, it contains attributes common to all
 *  the question types, which extend this class.
 */
class Question extends SurveyContent {
  constructor(title, isMandatory) {
    super(title);
    this.id = null;
    if (typeof isMandatory !== "boolean") throw new Error("Mandatory error");
    this.isMandatory = isMandatory;
    this.attachedImages = [];
  }

  setId(id) {
    if (typeof id !== "number") throw new Error("The ID is not a number");
    this.id = id;
  }

  setDescription(description) {
    if (typeof description !== "string")
      throw new Error("Description is not a string");
    this.description = description;
  }

  attachImage(blob) {
    if (!blob instanceof Blob)
      throw new Error("The passed argument is not a Blob");
    this.attachedImages.push(blob);
  }

  removeAttachedImage(index) {
    if (typeof index !== "number") throw new Error("The index is not a number");
    this.attachedImages = this.attachedImages.filter(
      (el, idx) => idx !== index
    );
  }
}

/**
 *  Single answer questions like a short answer or a text field
 */
class SingleQuestion extends Question {
  constructor(title, isMandatory) {
    super(title, isMandatory);
    this.answer = null;
  }
}

/**
 *  Short answer type of question, only admits strings of short
 *  length.
 */
export class ShortAnswer extends SingleQuestion {
  checkAnswer() {
    if (typeof this.answer !== "string") {
      return new Error("Answer is not a string");
    } else {
      if (this.answer.length > SHORT_ANSWER_LENGTH) {
        return new Error("The string is too long");
      }
    }
    return true;
  }

  toJson() {
    return {
      title: this.title,
      isMandatory: this.isMandatory,
      type: "Short Answer",
    };
  }
}

/**
 *  Long string type answer, it admits a string of arbitrary length
 */
export class Paragraph extends SingleQuestion {
  checkAnswer() {
    return typeof this.answer === "string"
      ? true
      : new Error("Answer is not a string");
  }

  toJson() {
    return {
      title: this.title,
      isMandatory: this.isMandatory,
      type: "Paragraph",
    };
  }
}

/**
 *  Question that lets the user choose from more than one option
 */
class MultipleQuestion extends Question {
  constructor(title, isMandatory, choices) {
    super(title, isMandatory);
    if (!Array.isArray(choices)) {
      throw new Error("You have to pass an array containing the choices");
    }
    if (!this.checkChoices(choices)) {
      throw new Error("One of the choices you passed is not a string");
    }
    this.choices = choices;
    this.answers = null;
  }

  checkChoices(choices) {
    choices.forEach((choice) => {
      if (typeof choice === "string") return false;
    });
    return true;
  }
}

/**
 *  Questions where the choices are rendered as radio buttons,
 *  the user can select only one of them
 */
export class MultipleChoice extends MultipleQuestion {
  checkAnswers() {
    return typeof this.answer === "number"
      ? true
      : new Error("The answer is not a number");
  }

  toJson() {
    return {
      title: this.title,
      isMandatory: this.isMandatory,
      type: "Multiple Choice",
      choices: this.choices,
    };
  }
}

/**
 * Question where the users has to rank a list of values
 */
export class Ranking extends MultipleQuestion {
  checkAnswers() {
    if (!Array.isArray(this.answers))
      throw new Error("The answer is not an array");
    for (let answer of this.answers) {
      if (typeof answer !== "number") return false;
    }
    return true;
  }

  toJson() {
    return {
      title: this.title,
      isMandatory: this.isMandatory,
      type: "Ranking",
      choices: this.choices,
    };
  }
}

/**
 *  Multiple answers type where the user can select more than
 *  one option
 */
export class CheckBox extends MultipleQuestion {
  checkAnswers() {
    if (!Array.isArray(this.answers)) {
      return new Error("The answer is not an array");
    }
    this.answers.forEach((answer) => {
      if (typeof answer !== "number") {
        return new Error("One or more of the answers is not a number");
      }
    });
    return true;
  }

  toJson() {
    return {
      title: this.title,
      isMandatory: this.isMandatory,
      type: "CheckBox",
      choices: this.choices,
    };
  }
}

/**
 * Questions of LinearScale type. The user has a slider that
 * he can move between a defined interval space. Each option has
 * a numerical value.
 */
export class LinearScale extends Question {
  constructor(title, isMandatory, values, labels) {
    super(title, isMandatory);
    this.checkAndSetValues(values);
    this.checkAndSetLabels(labels);
    this.answers = null;
  }

  checkAndSetValues(values) {
    if (!!values.minValue || typeof values.minValue !== "number") {
      throw new Error(
        "You have to pass a numerical value for the minimum value of the scale inside the key minValue"
      );
    }
    if (!!values.maxValue || typeof values.maxValue !== "number") {
      throw new Error(
        "You have to pass a numerical value for the maximum value of the scale inside the key maxValue"
      );
    }
    this.values = values;
  }

  checkAndSetLabels(labels) {
    if (!!labels.minValueLabel || typeof labels.minValueLabel !== "string") {
      throw new Error(
        "You have to pass a string label for the minimum value of the scale inside the key minValueLabel"
      );
    }
    if (!!labels.maxValueLabel || typeof labels.maxValueLabel !== "string") {
      throw new Error(
        "You have to pass a string label for the maximum value of the scale inside the key maxValueLabel"
      );
    }
    this.labels = labels;
  }

  checkAnswers() {
    return typeof this.answer === "number"
      ? true
      : new Error("The answer is not a number");
  }

  toJson() {
    return {
      title: this.title,
      isMandatory: this.isMandatory,
      type: "Multiple Choice",
      choices: this.choices,
    };
  }
}
