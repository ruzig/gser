import { createEpicMiddleware } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { getDB } from '../../db/warehouse';

import rootEpic from '../rootEpic';

const middleware = createEpicMiddleware(rootEpic, {
  dependencies: { get: ajax.get, getDB },
});

export default middleware;
