import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { Observable } from 'rxjs';
import { map, toString, path } from 'lodash/fp';
import { createSelector } from 'reselect';

import { dbUsersSelector } from '../db/state';

export const usersSelector = createSelector(
  dbUsersSelector, 
  userIdsSelector,
  (users, ids) => ids.map(id => users[id])
)

const FETCH_GITHUB_USER = "Home/FETCH_GITHUB_USER";
const NOTIFY_MESSAGE = "Home/NOTIFY_MESSAGE";

export const fetchGithubUserAction = createAction(FETCH_GITHUB_USER);
export const notifyMessage = createAction(NOTIFY_MESSAGE);

const message = handleActions({
  [NOTIFY_MESSAGE] : (state, { payload }) => payload
}, null);

const reducer = combineReducers({
  message,
});

const ghSearchBase = "https://api.github.com/search/users?q=";
const singaporeSearchUrl = "location:singapore";
const searchUrl = page => `${ghSearchBase}${singaporeSearchUrl}&page=${page}`;

const userFormatter = map(profile => ({
  _id: toString(profile.id),
  table: "users",
  ...profile,
}));

export const fetchUserEpic = (action$, _store, { get, getDB }) => (
  action$
    .ofType(FETCH_GITHUB_USER)
		.switchMap(({ payload: page }) =>
      get(searchUrl(page))
        .pluck('response') 
        .do(res => getDB().put({
          _id: "total_items",
          table: "paginations",
          count: res.total_count,
        }))
        .map(res => res.items)
        .do(items => getDB().bulkDocs(userFormatter(items)))
        .do(items => getDB().put({
          _id: toString(page),
          table: "paginations",
          userIds: items.map(item => item.id),
        }))
        .map(_ => notifyMessage({
          message: "Fetch Github User Successfully",
          success: true,
        }))
      .catch(error => Observable.of(notifyMessage({
        message: "Can not fetch github users",
        success: false,
        error,
      })))
		)
);

export default { home: reducer }
