import * as actions from '../actions/';

const INITIAL_STATE = {
  loading: false,
  questionIndex: 0,
  questionsItems: [],
  error: '',
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.FETCH_QUESTIONS_REQUEST:
      return { ...state, loading: true };
    case actions.FETCH_QUESTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        questionsItems: action.payload,
        error: '',
      };
    case actions.FETCH_QUESTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        questionsItems: [],
        error: action.payload,
      };
    case actions.UPDATE_QUESTION_INDEX:
      return {
        ...state,
        questionIndex: state.questionIndex + 1,
      };
    case actions.RESET_QUESTION_INDEX:
      return { ...state, questionIndex: 0 };
    default:
      return state;
  }
};

export default questions;
