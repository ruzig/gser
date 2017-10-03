import { combineReducers } from 'redux';
import home from '../Home/state';

export const rootReducer = combineReducers({
  ...home,
});

export default rootReducer;
