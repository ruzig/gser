import { createAction, handleActions } from 'redux-actions';
import { normalizeItem } from './utils';

export const ADD_USER = 'db/addUser';
export const ADD_USERS = 'db/addUsers';
export const addUserAction = createAction(ADD_USER);
export const addUsersAction = createAction(ADD_USERS);

export const users = handleActions({
  [ADD_USER] : (state, { payload }) => ({
    ...state, ...normalizeItem(payload)
  }),
  [ADD_USERS] : (state, { payload }) => ({
    ...state, ...payload
  }),
}, {});

