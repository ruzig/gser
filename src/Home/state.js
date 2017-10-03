import { createAction, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

const userIds = handleActions({
}, []);

const reducer = combineReducers({
  userIds,
});

export default { home: reducer };
