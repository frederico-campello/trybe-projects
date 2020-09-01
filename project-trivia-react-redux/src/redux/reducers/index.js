import { combineReducers } from 'redux';
import userInfo from './userInfo';
import questions from './questions';
import answers from './answers';
import time from './time';
import ranking from './ranking';

const rootReducer = combineReducers({
  userInfo,
  questions,
  answers,
  time,
  ranking,
});

export default rootReducer;
