import { createAction, handleActions } from 'redux-actions';
import { normalizeItem, normalizeItems } from './utils';

export const ADD_PAGINATION = 'db/addPagination';
export const ADD_PAGINATIONS = 'db/addPaginations';
export const addPaginationAction = createAction(ADD_PAGINATION);
export const addPaginationsAction = createAction(ADD_PAGINATIONS);

export const pagination = handleActions({
  [ADD_PAGINATION] : (state, { payload }) => ({
    ...state, ...normalizeItem(payload)
  }),
  [ADD_PAGINATIONS] : (state, { payload }) => ({
    ...state, ...normalizeItems(payload)
  }),
}, {});
