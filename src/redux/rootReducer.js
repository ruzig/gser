import { combineReducers } from 'redux';
import database from '../db/state';

export const rootReducer = combineReducers({
  ...database,
});

export default rootReducer;
