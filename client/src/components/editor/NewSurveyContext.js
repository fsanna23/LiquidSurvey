import React from "react";
import content_type from "../contentTypes";

export const NewSurveyStateContext = React.createContext(null);
export const NewSurveyDispatcherContext = React.createContext(null);
export const SectionLengthContext = React.createContext(null);
export const RandomNumbersContext = React.createContext(null);

export const action_types = {
  MOVE_CONTENT_UP: "MOVE CONTENT UP",
  MOVE_CONTENT_DOWN: "MOVE CONTENT DOWN",
  UPDATE_CONTENT: "UPDATE CONTENT",
  ADD_CONTENT: "ADD CONTENT",
  REMOVE_CONTENT: "REMOVE CONTENT",
  DUPLICATE_CONTENT: "DUPLICATE CONTENT",
  ADD_PAGE: "ADD PAGE",
  REMOVE_PAGE: "REMOVE PAGE",
  SET_SURVEY: "SET SURVEY",
  SET_INITIAL_SURVEY: "SET INITIAL SURVEY",
};

export const initialData = {
  sections: [
    {
      pageId: 1,
      contents: [
        { contentId: 1, type: content_type.QUESTION, data: {} },
        { contentId: 2, type: content_type.QUESTION, data: {} },
      ],
    },
  ],
  sectionIdCounter: 1,
  contentIdCounter: 2,
  randomNumbers: [],
};

/* Helper Functions */

const removeSection = (sections, sectionIndex) => {
  return sections.filter((s, i) => i !== sectionIndex);
};

const updateRandomNumbers = (sections) => {
  let newRandomNumbers = [];

  sections.forEach((sec, sectionIndex) => {
    sec.contents.forEach((c, contentIndex) => {
      if (c.type === content_type.RANDOM_NUMBER)
        newRandomNumbers.push({
          sectionIndex,
          contentIndex,
          name: c.data.name,
        });
    });
  });
  return newRandomNumbers;
};

const calculateSectionCounter = (sections) => {
  let sectionCounter = 1;
  sections.forEach((section) => {
    if (section.pageId > sectionCounter) {
      sectionCounter = section.pageId;
    }
  });
  return sectionCounter;
};

const calculateContentCounter = (sections) => {
  let contentCounter = 1;
  sections.forEach((section) => {
    section.contents.forEach((content) => {
      if (content.contentId > contentCounter) {
        contentCounter = content.contentId;
      }
    });
  });
  return contentCounter;
};

/* End Helper Functions */

export function reducer(state, action) {
  switch (action.type) {
    case action_types.ADD_PAGE: {
      const { sectionIndex } = action.payload;
      const newSectionCounter = state.sectionIdCounter + 1;
      const newContentCounter = state.contentIdCounter + 1;
      const newSection = {
        pageId: newSectionCounter,
        contents: [
          {
            contentId: newContentCounter,
            type: content_type.QUESTION,
            data: {
              title: "",
            },
          },
        ],
      };
      let newSections = [...state.sections];
      newSections.splice(sectionIndex, 0, newSection);
      let newRandomNumbers = updateRandomNumbers(newSections);
      return {
        sectionIdCounter: newSectionCounter,
        contentIdCounter: newContentCounter,
        sections: newSections,
        randomNumbers: newRandomNumbers,
      };
    }

    case action_types.ADD_CONTENT: {
      const { sectionIndex, newContent } = action.payload;
      /* TEMP */
      console.log("ADD CONTENT: the new content is -> ", newContent);
      /* TEMP */
      const newCounter = state.contentIdCounter + 1;
      newContent.contentId = newCounter;
      let newSections = [...state.sections];
      newSections[sectionIndex].contents = [
        ...newSections[sectionIndex].contents,
        newContent,
      ];
      return { ...state, contentIdCounter: newCounter, sections: newSections };
    }

    case action_types.REMOVE_PAGE: {
      const { sectionIndex } = action.payload;
      console.log(
        "Removing page from NewSurveyContext, the sectionIndex is: ",
        sectionIndex
      );
      let newSections = removeSection(state.sections, sectionIndex);
      console.log("The randomNumbers are: ", state.randomNumbers);
      if (state.randomNumbers.some((el) => el.sectionIndex > sectionIndex)) {
        let newRandomNumbers = updateRandomNumbers(newSections);
        return {
          ...state,
          sections: newSections,
          randomNumbers: newRandomNumbers,
        };
      }
      return { ...state, sections: newSections };
    }

    case action_types.REMOVE_CONTENT: {
      /* TODO: remember to add an alert before using this reducer method
      to check if there is at least one section */
      /*  When to update the random numbers when removing a content:
          - when the removed content is a random number;
          - when the removed content's section has a random number next to the removed content;
          - when the whole section is removed and there are randomNumbers with sectionIndex
            greater than the sectionIndex of the removed section.  */
      const { contentIndex, sectionIndex } = action.payload;
      let section = state.sections[sectionIndex];
      let content = section.contents[contentIndex];
      let newContent = section.contents.filter(
        (item, itemIndex) => contentIndex !== itemIndex
      );
      let newSections = state.sections;
      if (newContent.length === 0) {
        newSections = removeSection(newSections, sectionIndex);
        if (state.randomNumbers.some((el) => el.sectionIndex > sectionIndex)) {
          let newRandomNumbers = updateRandomNumbers(newSections);
          return {
            ...state,
            sections: newSections,
            randomNumbers: newRandomNumbers,
          };
        }
        return { ...state, sections: newSections };
      }
      newSections = [...state.sections];
      newSections[sectionIndex].contents = newContent;
      if (
        content.type === content_type.RANDOM_NUMBER ||
        state.randomNumbers.some(
          (el) =>
            el.sectionIndex === sectionIndex && el.contentIndex > contentIndex
        )
      ) {
        let newRandomNumbers = updateRandomNumbers(newSections);
        return {
          ...state,
          sections: newSections,
          randomNumbers: newRandomNumbers,
        };
      }
      return { ...state, sections: newSections };
    }

    case action_types.UPDATE_CONTENT: {
      const { contentIndex, sectionIndex, updates } = action.payload;
      let newContent = {
        ...state.sections[sectionIndex].contents[contentIndex],
      };
      newContent.data = { ...newContent.data, ...updates };
      let newSections = [...state.sections];
      newSections[sectionIndex].contents[contentIndex] = newContent;
      if (newContent.type === content_type.RANDOM_NUMBER) {
        let newRandomNumbers = updateRandomNumbers(newSections);
        return {
          ...state,
          sections: newSections,
          randomNumbers: newRandomNumbers,
        };
      } else {
        return {
          ...state,
          sections: newSections,
        };
      }
    }

    case action_types.DUPLICATE_CONTENT: {
      const { contentIndex, sectionIndex } = action.payload;
      let newContents = [...state.sections[sectionIndex].contents];
      let newContent = {
        ...state.sections[sectionIndex].contents[contentIndex],
      };
      newContents.splice(contentIndex, 0, newContent);
      const newCounter = state.contentIdCounter + 1;
      newContent.contentId = newCounter;
      let newSections = [...state.sections];
      newSections[sectionIndex].contents = newContents;
      return { ...state, contentIdCounter: newCounter, sections: newSections };
    }

    case action_types.MOVE_CONTENT_UP: {
      const { contentIndex, sectionIndex } = action.payload;
      let section = state.sections[sectionIndex];
      const cont = section.contents[contentIndex];
      if (contentIndex === 0) {
        if (sectionIndex !== 0) {
          // Move to the section before the current one
          let destContent = state.sections[sectionIndex - 1].contents;
          //cont.id = destContent.length + 1;
          destContent = [...destContent, cont];
          section.contents.splice(contentIndex, 1);
          let newSections = [...state.sections];
          newSections[sectionIndex].contents = section.contents;
          newSections[sectionIndex - 1].contents = destContent;
          /*  When to update the random numbers:
              - when the moved content was a random number;
              - when the adjacent content was a random number; */
          if (section.contents.length === 0) {
            newSections = removeSection(newSections, sectionIndex);
          }
          if (cont.type === content_type.RANDOM_NUMBER) {
            let newRandomNumbers = updateRandomNumbers(newSections);
            return {
              ...state,
              sections: newSections,
              randomNumbers: newRandomNumbers,
            };
          } else {
            return {
              ...state,
              sections: newSections,
            };
          }
        }
      } else {
        // Move up on the same section
        let newContent = [...state.sections[sectionIndex].contents];
        newContent.splice(contentIndex, 1);
        newContent.splice(contentIndex - 1, 0, cont);
        let newSections = [...state.sections];
        newSections[sectionIndex].contents = newContent;
        if (
          cont.type === content_type.RANDOM_NUMBER ||
          newContent[contentIndex].type === content_type.RANDOM_NUMBER
        ) {
          let newRandomNumbers = updateRandomNumbers(newSections);
          return {
            ...state,
            sections: newSections,
            randomNumbers: newRandomNumbers,
          };
        } else {
          return {
            ...state,
            sections: newSections,
          };
        }
      }
      return { ...state };
    }

    case action_types.MOVE_CONTENT_DOWN: {
      const { contentIndex, sectionIndex } = action.payload;
      let section = state.sections[sectionIndex];
      const cont = section.contents[contentIndex];
      /* This is the old mover, change using the json state from the reducer */
      if (contentIndex === section.contents.length - 1) {
        if (sectionIndex !== state.sections.length - 1) {
          // Move to the section after the current one
          let destContent = state.sections[sectionIndex + 1].contents;
          destContent = [cont, ...destContent];
          section.contents.splice(contentIndex, 1);
          let newSections = [...state.sections];
          newSections[sectionIndex].contents = section.contents;
          newSections[sectionIndex + 1].contents = destContent;
          // updateRandomNumbers();
          if (section.contents.length === 0) {
            newSections = removeSection(newSections, sectionIndex);
          }
          if (cont.type === content_type.RANDOM_NUMBER) {
            let newRandomNumbers = updateRandomNumbers(newSections);
            return {
              ...state,
              sections: newSections,
              randomNumbers: newRandomNumbers,
            };
          } else {
            return {
              ...state,
              sections: newSections,
            };
          }
        }
      } else {
        // Move down on the same section
        let newContent = [...state.sections[sectionIndex].contents];
        newContent.splice(contentIndex, 1);
        newContent.splice(contentIndex + 1, 0, cont);
        let newSections = [...state.sections];
        newSections[sectionIndex].contents = newContent;
        if (
          cont.type === content_type.RANDOM_NUMBER ||
          newContent[contentIndex].type === content_type.RANDOM_NUMBER
        ) {
          let newRandomNumbers = updateRandomNumbers(newSections);
          return {
            ...state,
            sections: newSections,
            randomNumbers: newRandomNumbers,
          };
        } else {
          return {
            ...state,
            sections: newSections,
          };
        }
      }
      return { ...state };
    }

    case action_types.SET_SURVEY: {
      const sections = action.survey.pages;
      console.log("Set survey in reducer, the sections are: ", sections);
      const randomNumbers = updateRandomNumbers(sections);
      const sectionIdCounter = calculateSectionCounter(sections);
      const contentIdCounter = calculateContentCounter(sections);
      return {
        sections,
        randomNumbers,
        sectionIdCounter,
        contentIdCounter,
      };
    }

    case action_types.SET_INITIAL_SURVEY: {
      return {
        sections: [
          {
            pageId: 1,
            contents: [
              { contentId: 1, type: content_type.QUESTION, data: {} },
              { contentId: 2, type: content_type.QUESTION, data: {} },
            ],
          },
        ],
        sectionIdCounter: 1,
        contentIdCounter: 2,
        randomNumbers: [],
      };
    }

    default:
      return { ...state };
  }
}
