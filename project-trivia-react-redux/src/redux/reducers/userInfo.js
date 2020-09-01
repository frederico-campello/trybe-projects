import * as actions from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
  token: '',
};

const saveUserInfo = (state, action) => ({
  ...state,
  player: {
    ...state.player,
    name: action.payload.player.name,
    gravatarEmail: action.payload.player.gravatarEmail,
  },
});

const updateScore = (state, action) => ({
  ...state,
  player: {
    ...state.player,
    score: state.player.score + action.payload,
  },
});

const resetPlayer = (state) => ({
  ...state,
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
});

const userInfo = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.SAVE_USER_INFO:
      return saveUserInfo(state, action);
    case actions.SAVE_TOKEN:
      return { ...state, token: action.payload };
    case actions.UPDATE_SCORE:
      return updateScore(state, action);
    case actions.UPDATE_ASSERTIONS:
      return {
        ...state,
        player: { ...state.player, assertions: state.player.assertions + 1 },
      };
    case actions.RESET_PLAYER:
      return resetPlayer(state, action);
    default:
      return state;
  }
};

export default userInfo;
