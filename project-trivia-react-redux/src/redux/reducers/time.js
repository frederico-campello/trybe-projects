import * as actions from '../actions';

const INITIAL_STATE = {
  time: 30,
  intervalId: 0,
};

const updateTimer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.UPDATE_TIMER:
      return {
        ...state,
        time: state.time - 1,
      };
    case actions.STOP_TIMER:
      return {
        ...state,
        time: 0,
      };
    case actions.RESET_TIMER:
      return {
        ...state,
        time: 30,
      };
    case actions.SAVE_INTERVAL_ID:
      return {
        ...state,
        intervalId: action.payload,
      };
    default:
      return state;
  }
};

export default updateTimer;
