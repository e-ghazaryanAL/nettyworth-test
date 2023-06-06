import React from 'react';

import ReactPaginate from 'react-paginate';

interface IPagination {
  totalPages: number;
  handlePageClick: (e: { selected: number }) => void;
  className?: string;
}

const Paginataion: React.FC<IPagination> = ({ handlePageClick, totalPages, className = '' }) => {
  return (
    <ReactPaginate
      className={`news_pagination ${className || 'hidden'} md:flex pb-28 md:pb-8 2xl:pl-8`}
      previousLabel={'Previous'}
      nextLabel={'Next'}
      breakLabel={''}
      pageCount={totalPages}
      pageClassName='page-item'
      pageLinkClassName='page-link'
      previousClassName='page-item'
      previousLinkClassName='page-link'
      nextClassName='page-item'
      nextLinkClassName='page-link page-next'
      activeClassName='active'
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      onPageChange={handlePageClick}
    />
  );
};

export { Paginataion };
