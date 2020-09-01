import * as actions from '../actions/';

const INITIAL_STATE = {
  ranking: [],
};

const ranking = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.UPDATE_RANKING:
      return {
        ...state,
        ranking: [...state.ranking, action.payload],
      };
    default:
      return state;
  }
};

export default ranking;
