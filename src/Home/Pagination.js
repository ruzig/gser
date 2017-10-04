import React from 'react'
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { ceil } from 'lodash/fp';

import './index.css';
import {
  updatePageAction,
  totalItemsSelector,
} from './state';

const RESULTS_PER_PAGE = 30.0;
const MAX_RESULTS = 1000.0;
const MAX_PAGE = ceil(MAX_RESULTS / RESULTS_PER_PAGE);

const normalizeTotalPages = items => (items > MAX_RESULTS ? MAX_PAGE : ceil(items/RESULTS_PER_PAGE));

const Pagination = ({ pageCount, fetcher, updatePage, totalItems }) => (
  <div>
    <ReactPaginate
      pageCount={normalizeTotalPages(totalItems)}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      containerClassName={"pagination"}
      previousLabel="prev"
      nextLabel="next"
      subContainerClassName={"pages pagination"}
      activeClassName={"active"}
      onPageChange={data => (updatePage(data.selected + 1), fetcher(data.selected + 1))}
    />
  </div>
);

const enhance = connect(
  state => ({ totalItems: totalItemsSelector(state) }),
  {
    updatePage: updatePageAction,
  }
);

export default enhance(Pagination);
