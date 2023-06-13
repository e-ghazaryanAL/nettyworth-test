import React, { useEffect, useState } from 'react';

import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

import { FilterModal } from './FilterModal';
import { TopSalesDetailCard } from './TopSalesDetailCard';
import { TopSalesDetailFilter } from './TopSalesDetailFilter';
import { TopSalesDetailHeading } from './TopSalesDetailHeading';
import { useAppDispatch } from '../../../hooks/redux';
import usePaginate from '../../../hooks/usePaginate';
import { fetchCollection, fetchCollectionAssets, fetchCollectionTraitTypes } from '../../../redux/top-sales/topSalesSlice';

type CategoryFilter = {
  category: string;
  val: string;
};

const TopSalesDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const dispatch = useAppDispatch();
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { pageNumber, handlePageClick } = usePaginate();
  const limit = 30;

  const [searchValue, setSearchvalue] = useState('');
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const filterHandler = (category: string, val: string) => {
    setCategoryFilter((prev) => {
      const idx = prev.findIndex((obj) => obj.val === val);
      if (idx === -1) {
        return [...prev, { category, val }];
      }
      if (prev[idx].category !== category) {
        const updatedFilters = [...prev];
        updatedFilters[idx].category = category;
        return updatedFilters;
      }
      return prev.filter((item) => item.val !== val);
    });
  };

  const clearFiltersHandler = () => {
    setCategoryFilter([]);
    setSearchvalue('');
  };

  useEffect(() => {
    if (slug) {
      dispatch(
        fetchCollectionTraitTypes({
          slug: slug as string,
        })
      );
    }
  }, [slug]);

  useEffect(() => {
    if (slug) {
      dispatch(
        fetchCollectionAssets({
          slug: slug as string,
          limit: 30,
          offset: (pageNumber - 1) * limit,
          include_count: true,
        })
      );
      dispatch(fetchCollection(slug as string));
    }
  }, [slug, pageNumber]);

  return (
    <div className='pb-16 md:pb-4 max-w-[1300px] 2xl:mx-auto'>
      <TopSalesDetailHeading filterCategory={categoryFilter} setIsOpen={setIsOpen} isOpen={isOpen} />
      <div className='bg-primary border-t border-input px-9 md:px-6'>
        <div className=''>
          <div className='hidden lg:block'>
            <TopSalesDetailFilter searchvalue={searchValue} search={handleSearch} clearFilter={clearFiltersHandler} filter={filterHandler} />
          </div>
          {categoryFilter.length ? (
            <div className='flex gap-1'>
              {categoryFilter.map((filter) => {
                return (
                  <button key={filter.category} className='flex mt-[19px] gap-[18px] items-center bg-white py-2 px-4 rounded w-max' onClick={() => filterHandler(filter.category, filter.val)}>
                    <span className='font-medium'>{filter.category}</span>
                    <FontAwesomeIcon icon={faSquareXmark} className='text-dark-blue w-[13px] h-[13px]' />
                  </button>
                );
              })}
            </div>
          ) : (
            <></>
          )}
          <div className=''>
            <TopSalesDetailCard pageHandler={handlePageClick} />
          </div>
        </div>
      </div>
      <FilterModal searchvalue={searchValue} search={handleSearch} clearFilter={clearFiltersHandler} filterHandler={filterHandler} isOpen={isOpen} />
    </div>
  );
};

export { TopSalesDetail };
