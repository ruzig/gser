import { createAction, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

const FETCH_GITHUB_USER = "Home/FETCH_GITHUB_USER";
const ADD_USER_IDS = "Home/ADD_USER_IDS";

export const fetchGithubUserAction = createAction(FETCH_GITHUB_USER);
export const addUserIdsAction = createAction(ADD_USER_IDS);

const userIds = handleActions({
  [ADD_USER_IDS]: (state, { payload }) => [...state, ...payload],
}, []);

const reducer = combineReducers({
  userIds,
});

export default { home: reducer };
