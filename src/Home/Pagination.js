import React from 'react'
import ReactPaginate from 'react-paginate';

import './index.css';

const Pagination = ({ pageCount, fetcher }) => (
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
      onPageChange={data => fetcher(data.selected + 1)}
    />
  </div>
);

export default Pagination;
