export const initialState = {
  surveys: [],
  selectedSurvey: null,
};

export const actionTypes = {
  ADD_SURVEY: "ADD SURVEY",
  EDIT_SURVEY: "EDIT SURVEY",
  DELETE_SURVEY: "DELETE SURVEY",
  SELECT_SURVEY: "SELECT SURVEY",
  SET_SURVEYS: "SET SURVEYS",
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
        selectedSurvey: null,
      };

    case actionTypes.DELETE_SURVEY:
      return {
        ...state,
        surveys: state.surveys.filter((survey) => survey.id !== action.id),
        selectedSurvey: null,
      };

    case actionTypes.SELECT_SURVEY:
      return { ...state, selectedSurvey: action.survey };

    case actionTypes.SET_SURVEYS:
      return { ...state, surveys: action.surveys };

    default:
      return { ...state };
  }
};
