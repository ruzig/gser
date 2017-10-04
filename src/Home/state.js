import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { Observable } from 'rxjs';
import { map, toString, path } from 'lodash/fp';
import { createSelector } from 'reselect';

import { dbUsersSelector } from '../db/state';

const userIdsSelector = path('home.userIds');

export const usersSelector = createSelector(
  dbUsersSelector, 
  userIdsSelector,
  (users, ids) => ids.map(id => users[id])
)

const FETCH_GITHUB_USER = "Home/FETCH_GITHUB_USER";
const NOTIFY_MESSAGE = "Home/NOTIFY_MESSAGE";
const ADD_USER_ID = "Home/ADD_USER_ID";
const ADD_USER_IDS = "Home/ADD_USER_IDS";

export const fetchGithubUserAction = createAction(FETCH_GITHUB_USER);
export const notifyMessage = createAction(NOTIFY_MESSAGE);
export const addUserIdAction = createAction(ADD_USER_ID);
export const addUserIdsAction = createAction(ADD_USER_IDS);

const userIds = handleActions({
  [ADD_USER_ID] : (state, { payload }) => [...state, payload],
  [ADD_USER_IDS] : (state, { payload }) => [...state, ...payload],
}, []);

const reducer = combineReducers({
  userIds,
});

const ghSearchBase = "https://api.github.com/search/users?q=";
const singaporeSearchUrl = "location:singapore";
const searchUrl = page => `${ghSearchBase}${singaporeSearchUrl}&page=${page}`;

const userFormatter = map(profile => ({
  _id: toString(profile.id),
  type: "users",
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
          type: "paginations",
          count: res.total_count,
        }))
        .map(res => res.items)
        .do(items => getDB().bulkDocs(userFormatter(items)))
        .do(items => getDB().put({
          _id: toString(page),
          type: "paginations",
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
