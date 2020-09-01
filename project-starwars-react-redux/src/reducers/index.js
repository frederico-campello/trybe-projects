import { combineReducers } from 'redux';
import {
  starWarsAPIReducer,
  filters,
  selectFilter,
  changeSort,
} from './reducer';

const rootReducer = combineReducers({
  starWarsAPIReducer,
  filters,
  selectFilter,
  changeSort,
});

export default rootReducer;
