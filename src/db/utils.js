import { Observable } from 'rxjs';
import { reduce } from 'lodash/fp';

export const normalizeItem = item => ({ [item._id]: item });
export const normalizeItems = items => reduce((result, value) => ({ ...result, [value._id]: value }), {}, items);

export const pouchChange$ = db => Observable.create(obs => 
  db.changes({
    since: 'now',
    live: true,
    include_docs: true,
  })
  .on('change', change => obs.next(change))
  .on('complete', info => obs.complete(info))
  .on('error', error => obs.error(error))
).share();
