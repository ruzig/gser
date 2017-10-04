import React from 'react'
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

import './index.css';
import {
  updatePageAction,
} from './state';

const Pagination = ({ pageCount, fetcher, updatePage }) => (
  <div>
    <ReactPaginate
      pageCount={pageCount}
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
  null,
  {
    updatePage: updatePageAction,
  }
);

export default enhance(Pagination);
