import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { Observable } from 'rxjs';
import { map, toString, path, isEmpty } from 'lodash/fp';
import { createSelector } from 'reselect';

import {
  dbUsersSelector,
  dbPaginationSelector,
} from '../db/state';

const currentPageSelector = path('home.currentPage');
export const isEmptyUserSelector = createSelector(dbUsersSelector, isEmpty);
export const totalItemsSelector = createSelector(dbPaginationSelector, path('total_items.count'));

export const usersSelector = createSelector(
  dbUsersSelector, 
  dbPaginationSelector,
  currentPageSelector,
  (users, pagination, page) => {
    if (pagination[page]) {
      return pagination[page].userIds.map(id => users[id]);
    }
    return [];
  }
)

const FETCH_GITHUB_USER = "Home/FETCH_GITHUB_USER";
const NOTIFY_MESSAGE = "Home/NOTIFY_MESSAGE";
const UPDATE_PAGE = "Home/UPDATE_PAGE";

export const fetchGithubUserAction = createAction(FETCH_GITHUB_USER);
export const notifyMessageAction = createAction(NOTIFY_MESSAGE);
export const updatePageAction = createAction(UPDATE_PAGE);

const message = handleActions({
  [NOTIFY_MESSAGE] : (state, { payload }) => payload
}, null);

const currentPage = handleActions({
  [UPDATE_PAGE] : (state, { payload }) => payload
}, 1);

const reducer = combineReducers({
  currentPage,
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
        .map(_ => notifyMessageAction({
          message: "Fetch Github User Successfully",
          success: true,
        }))
      .catch(error => Observable.of(notifyMessageAction({
        message: "Can not fetch github users",
        success: false,
        error,
      })))
		)
);

export default { home: reducer }
