import { combineReducers } from 'redux';
import { Observable } from 'rxjs';
import { createAction, handleActions } from 'redux-actions';

import { pouchChange$, normalizeItem } from './utils';

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
    .map(rows => rows.map(row => normalizeItem(row.doc)))
    .map(users => addUsersAction(users))
);

export const userChangeEpic = (action$, _store, { getDB }) => (
  pouchChange$(getDB())
    .pluck('doc')
    .map(profile => addUserAction(profile))
);

export default { database: reducer };
