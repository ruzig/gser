import { combineReducers } from 'redux';
import { Observable } from 'rxjs';
import { path } from 'lodash/fp';

import { pouchChange$, normalizeItems } from './utils';
import { addUserIdAction, addUserIdsAction } from '../Home/state';
import {
  users,
  addUsersAction,
  addUserAction,
} from './users';

export const dbUsersSelector = path('database.users');

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
