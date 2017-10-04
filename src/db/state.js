import { combineReducers } from 'redux';
import { Observable } from 'rxjs';
import { path, filter } from 'lodash/fp';

import { pouchChange$ } from './utils';
import {
  users,
  addUsersAction,
  addUserAction,
} from './users';

import {
  pagination,
  addPaginationAction,
  addPaginationsAction,
} from './pagination';

export const dbUsersSelector = path('database.users');

const reducer = combineReducers({
  users,
  pagination,
});

const filterUsers = filter({ table: 'users' });
const filterPagination = filter({ table: 'paginations' });

export const allUserEpic = (action$, _store, { getDB }) => (
  Observable.fromPromise(getDB().allDocs({ include_docs: true }))
    .pluck('rows')
    .map(rows => rows.map(row => row.doc))
    .switchMap(models => [
      addUsersAction(filterUsers(models)),
      addPaginationsAction(filterPagination(models)),
    ])
);

export const userChangeEpic = (action$, _store, { getDB }) => (
  pouchChange$(getDB())
    .pluck('doc')
    .map(model => model.table === "users" ?
      addUserAction(model) :
      addPaginationAction(model)
    )
);

export default { database: reducer };
