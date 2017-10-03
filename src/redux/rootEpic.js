import { combineEpics } from 'redux-observable';

import { fetchUserEpic } from '../Home/state';

const rootEpic = combineEpics(
  fetchUserEpic,
);

export default rootEpic;

