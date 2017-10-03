import { createAction } from 'redux-actions';
import { Observable } from 'rxjs';
import { map, toString } from 'lodash/fp';

const FETCH_GITHUB_USER = "Home/FETCH_GITHUB_USER";
const NOTIFY_MESSAGE = "Home/NOTIFY_MESSAGE";

export const fetchGithubUserAction = createAction(FETCH_GITHUB_USER);
export const notifyMessage = createAction(NOTIFY_MESSAGE);

const ghSearchBase = "https://api.github.com/search/users?q=";
const singaporeSearchUrl = `${ghSearchBase}location:singapore`;

const pouchFormatter = map(profile => ({
  _id: toString(profile.id),
  ...profile,
}));

export const fetchUserEpic = (action$, _store, { get, getDB }) => (
  action$
    .ofType(FETCH_GITHUB_USER)
		.switchMap(_action =>
      get(singaporeSearchUrl)
        .pluck('response') 
        .map(res => res.items)
        .do(items => getDB().bulkDocs(pouchFormatter(items)))
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
