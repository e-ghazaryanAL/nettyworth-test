import { useState } from 'react';

const usePaginate = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loadMore, setLoadMore] = useState<number>(1);
  const handlePageClick = ({ selected }: any) => {
    if (selected === undefined) {
      setLoadMore((prev) => prev + 1);
      selected = loadMore;
    }
    setPageNumber(selected + 1);
  };

  return { pageNumber, handlePageClick, loadMore, setPageNumber, setLoadMore };
};

export default usePaginate;
