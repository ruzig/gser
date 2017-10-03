import { combineReducers } from 'redux';
import home from '../Home/state';
import database from '../db/state';

export const rootReducer = combineReducers({
  ...database,
  ...home,
});

export default rootReducer;
