import React, { useEffect, useState } from 'react';

import moment from 'moment';
// import { NewsEmail } from './NewsEmail';
import Image from 'next/image';

import { NewsEmail } from './NewsEmail';
import { Paginataion } from './Pagination';
import RightIcon from '../../../assets/icons/icon-arrow-right.svg';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import useNewsCategory from '../../../hooks/useNewsCategory';
import { fetchNewsData } from '../../../redux/news/newsSlice';
import { Loader } from '../../Loader';

type NewsListProps = {
  categoryId: number;
  handleNavigate: (slug: string) => void;
};

const NewsList: React.FC<NewsListProps> = ({ categoryId, handleNavigate }) => {
  const { newsData } = useAppSelector((state) => state.news);
  const { loading, newsTotalPages } = useAppSelector((state) => state.news);

  const [pageNumber, setPageNumber] = useState<number>(1);
  const dispatch = useAppDispatch();
  const newsCategory = useNewsCategory();

  useEffect(() => {
    dispatch(fetchNewsData({ per_page: 6, page: pageNumber, categories: categoryId, order: 'desc', orderby: 'date' }));
  }, []);

  const handlePageClick = ({ selected }: { selected: number }) => {
    dispatch(fetchNewsData({ per_page: 6, page: selected + 1, categories: categoryId, order: 'desc', orderby: 'date' }));
  };

  const handleLoadMore = () => {
    setPageNumber((prev) => prev + 1);
    dispatch(fetchNewsData({ per_page: 6, page: pageNumber + 1, categories: categoryId, order: 'desc', orderby: 'date', isMobile: !!pageNumber }));
  };

  return (
    <div className='grid grid-cols-1 xl:grid-cols-4 gap-y-14 w-full max-w-[1300px] 2xl:mx-auto'>
      <div className='col-span-3 flex flex-col justify-between'>
        {loading && pageNumber <= 1 ? (
          <Loader />
        ) : (
          <>
            {newsData?.slice(1).map((item, idx) => {
              return (
                <div key={idx} className={`flex flex-col  sm:flex-row gap-5 pb-8 2xl:pl-8 ${idx !== 0 && 'pt-[15px] bg-light-blue-grey border-t-[1px] '} xl:max-w-[700px] 2xl:max-w-none`}>
                  <div className='w-full object-cover min-w-[279px] sm:max-w-[279px] '>
                    <Image src={item.featured_image_src} alt='news-image' width={279} height={186} className='w-full rounded' />
                  </div>
                  <div className='flex flex-col gap-2 cursor-pointer  xl:max-w-[468px] 2xl:max-w-[478px]' onClick={() => handleNavigate(item.slug)}>
                    <h2 className='font-medium text-2xl text-dark-blue' dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
                    <div className='flex flex-col gap-3'>
                      <span className='text-primary'>{newsCategory}</span>
                      <div className='hidden sm:flex flex-col'>
                        <span className='text-sm'>{moment(item?.date).format('MMMM D YYYY')}</span>
                        <span className='text-sm leading-[23px]'>{item?.yoast_head_json.description}</span>
                      </div>
                    </div>
                    <div className='cursor-pointer w-fit'>
                      <span className='text-primary text-sm font-medium flex items-center gap-2'>
                        {categoryId === 39 ? 'Watch Video' : 'Learn More'}
                        <span className='text-primary text-3xl'>
                          <RightIcon fill='#006fff' />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
        <Paginataion totalPages={newsTotalPages} handlePageClick={handlePageClick} />
        <div className='w-full justify-center flex md:hidden'>
          {loading && pageNumber > 1 && <Loader />}
          {pageNumber !== newsTotalPages && !loading && (
            <button className='max-w-[200px] w-full md:hidden rounded text-white font-semibold h-[60px] bg-primary-blue text-base leading-6 flex justify-center items-center' onClick={handleLoadMore}>
              LOAD MORE
            </button>
          )}
        </div>
      </div>
      <NewsEmail />
    </div>
  );
};

export { NewsList };
