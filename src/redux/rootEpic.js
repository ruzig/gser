import { combineEpics } from 'redux-observable';

import { fetchUserEpic } from '../Home/state';
import { allUserEpic, userChangeEpic } from '../db/state';

const rootEpic = combineEpics(
  allUserEpic,
  userChangeEpic,
  fetchUserEpic,
);

export default rootEpic;

