import { createAction, handleActions } from 'redux-actions';
import { normalizeItem } from './utils';

export const ADD_PAGINATION = 'db/addPagination';
export const addPaginationAction = createAction(ADD_PAGINATION);

export const pagination = handleActions({
  [ADD_PAGINATION] : (state, { payload }) => ({
    ...state, ...normalizeItem(payload)
  }),
}, {});
