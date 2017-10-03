import { combineReducers } from 'redux';
import { Observable } from 'rxjs';
import { createAction, handleActions } from 'redux-actions';
import { path } from 'lodash/fp';

import { pouchChange$, normalizeItem, normalizeItems } from './utils';
import { addUserIdAction, addUserIdsAction } from '../Home/state';

export const dbUsersSelector = path('database.users');

export const ADD_USER = 'db/addUser';
export const ADD_USERS = 'db/addUsers';
export const addUserAction = createAction(ADD_USER);
export const addUsersAction = createAction(ADD_USERS);

const users = handleActions({
  [ADD_USER] : (state, { payload }) => ({
    ...state, ...normalizeItem(payload)
  }),
  [ADD_USERS] : (state, { payload }) => ({
    ...state, ...payload
  }),
}, {});

const reducer = combineReducers({
  users,
});

export const allUserEpic = (action$, _store, { getDB }) => (
  Observable.fromPromise(getDB().allDocs({ include_docs: true }))
    .pluck('rows')
    .map(rows => rows.map(row => row.doc))
    .switchMap(users => [
      addUsersAction(normalizeItems(users)),
      addUserIdsAction(users.map(u => u._id)),
    ])
);

export const userChangeEpic = (action$, _store, { getDB }) => (
  pouchChange$(getDB())
    .pluck('doc')
    .switchMap(profile => [
      addUserAction(profile),
      addUserIdAction(profile._id),
    ])
);

export default { database: reducer };
