import { createAction, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { Observable } from 'rxjs';
import { map } from 'lodash/fp';

const FETCH_GITHUB_USER = "Home/FETCH_GITHUB_USER";
const ADD_USER_IDS = "Home/ADD_USER_IDS";
const NOTIFY_MESSAGE = "Home/NOTIFY_MESSAGE";

export const fetchGithubUserAction = createAction(FETCH_GITHUB_USER);
export const addUserIdsAction = createAction(ADD_USER_IDS);
export const notifyMessage = createAction(NOTIFY_MESSAGE);

const userIds = handleActions({
  [ADD_USER_IDS]: (state, { payload }) => [...state, ...payload],
}, []);

const reducer = combineReducers({
  userIds,
});

const idize = map(profile => ({ [profile.id]: profile }));

const ghSearchBase = "https://api.github.com/search/users?q=";
const singaporeSearchUrl = `${ghSearchBase}location:singapore`;

export const fetchUserEpic = (action$, _store, { get, getDB }) => (
  action$
    .ofType(FETCH_GITHUB_USER)
		.switchMap(_action =>
      get(singaporeSearchUrl)
        .pluck('response') 
        .map(res => res.items)
        .do(items => getDB().bulkDocs(idize(items)))
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
export default { home: reducer };
