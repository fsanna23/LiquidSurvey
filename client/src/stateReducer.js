export const initialState = {
  surveys: [],
  templates: [],
  selectedSurvey: { survey: null, useTemplate: false },
};

export const actionTypes = {
  ADD_SURVEY: "ADD SURVEY",
  EDIT_SURVEY: "EDIT SURVEY",
  DELETE_SURVEY: "DELETE SURVEY",
  SELECT_SURVEY: "SELECT SURVEY", // also used for templates
  SET_SURVEYS: "SET SURVEYS",
  ADD_TEMPLATE: "ADD TEMPLATE",
  EDIT_TEMPLATE: "EDIT TEMPLATE",
  DELETE_TEMPLATE: "DELETE TEMPLATE",
  SET_TEMPLATES: "SET TEMPLATES",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_SURVEY:
      return { ...state, surveys: [...state.surveys, action.survey] };

    case actionTypes.EDIT_SURVEY:
      return {
        ...state,
        surveys: state.surveys.map((survey) =>
          survey.id !== action.survey.id ? survey : action.survey
        ),
        selectedSurvey: { survey: null, useTemplate: false },
      };

    case actionTypes.DELETE_SURVEY:
      return {
        ...state,
        surveys: state.surveys.filter((survey) => survey.id !== action.id),
        selectedSurvey: { survey: null, useTemplate: false },
      };

    case actionTypes.SELECT_SURVEY:
      return { ...state, selectedSurvey: action.survey };

    case actionTypes.SET_SURVEYS:
      return { ...state, surveys: action.surveys };

    case actionTypes.ADD_TEMPLATE:
      console.log("Adding template in reducer");
      console.log("The new template is: ", action.template);
      console.log("The old templates were: ", state.templates);
      return { ...state, templates: [...state.templates, action.template] };

    case actionTypes.EDIT_TEMPLATE:
      return {
        ...state,
        templates: state.templates.map((template) =>
          template.id !== action.template.id ? template : action.template
        ),
        selectedSurvey: { survey: null, useTemplate: false },
      };

    case actionTypes.DELETE_TEMPLATE:
      return {
        ...state,
        templates: state.templates.filter(
          (template) => template.id !== action.id
        ),
        selectedSurvey: { survey: null, useTemplate: false },
      };

    case actionTypes.SET_TEMPLATES:
      return { ...state, templates: action.templates };

    default:
      return { ...state };
  }
};
