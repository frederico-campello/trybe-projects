import * as actions from '../actions';

const INITIAL_STATE = {
  options: [],
  isDisabled: false,
};

const possibleAnswers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.SAVE_POSSIBLE_ANSWERS:
      return {
        ...state,
        options: action.payload,
      };
    case actions.UPDATE_IS_DISABLED:
      return {
        ...state,
        isDisabled: !state.isDisabled,
      };
    default:
      return state;
  }
};

export default possibleAnswers;
