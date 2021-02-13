const SHORT_ANSWER_LENGTH = 40;

/**
 *  Survey class, it contains a list of Questions and meta data
 *  about the creator of the survey, the date of creation,
 *  the scope of the survey and other.
 */
export class Survey {
  constructor(title, description, content) {
    this.id = null;
    if (typeof title !== "string") throw new Error("Title is not a string");
    if (typeof description !== "string")
      throw new Error("Description is not a string");
    this.title = title;
    this.description = description;
    if (!Array.isArray(content))
      throw new Error("You must pass an array of content");
    if (!this._checkValidQuestions(content))
      throw new Error("You must pass only SurveyContent objects");
    this.content = content;
  }

  setId(id) {
    if (typeof id !== "number") throw new Error("The ID is not a number");
    this.id = id;
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
export class SurveyContent {
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
export class Question extends SurveyContent {
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
export class SingleQuestion extends Question {
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
export class MultipleQuestion extends Question {
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
