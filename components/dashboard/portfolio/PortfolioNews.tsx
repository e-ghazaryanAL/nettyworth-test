import { useEffect, useState } from 'react';

import RightIcon from '../../../assets/icons/new-window.svg';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchDashboardNews, fetchDashboardNewsMount } from '../../../redux/news/newsSlice';
import { Loader } from '../../Loader';
import AdBanners from '../../shared/AdBanners';

interface ILatestNews {
  mobile?: boolean;
}
const LatestNews: React.FC<ILatestNews> = () => {
  const { dashboardNewsLoading, dashboardNewsTotalPages } = useAppSelector((state) => state.news);
  const { dashboardNews } = useAppSelector((state) => state.news);
  const [pageNumber, setPageNumber] = useState<number>(2);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      dispatch(fetchDashboardNewsMount());
    }
    return () => {
      ignore = true;
    };
  }, []);

  const handlePageChange = () => {
    dispatch(
      fetchDashboardNews({
        url: '/category?section=general&source=Cointelegraph,Decrypt,Reuters,Benzinga,Coindesk,Cryptonews,TheBlock&topic=NFT',
        params: { page: pageNumber, items: 4 },
      })
    );
    setPageNumber((prev) => prev + 1);
  };

  return (
    <div className={'bg-white pt-9 px-7 border-t-[1px] border-light-gray md:pb-[99px] dark-latest dark:bg-dark-mode-light-blue dark:border-dark-mode-light-blue'}>
      <AdBanners />
      <div className='mt-3'>
        <p>
          Latest
          <span className='text-primary text-base font-semibold dark-primary'> News</span>
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        {dashboardNews?.map((item, idx) => {
          return (
            <div key={idx} className='mt-4'>
              <div>
                <img src={item?.image_url} className='w-full h-[148px] rounded object-cover' />
              </div>
              <a href={item.news_url} className='mt-3 cursor-pointer' target='_blank' rel='noreferrer'>
                <span className='text-primary'>NFT NEWS</span>
                <p className='p-normal'>{item?.title}</p>
                <span className='line-clamp-2'>{item?.text}</span>
                <div className='flex items-center gap-2'>
                  <p className='p-small text-primary font-medium'>Read on {item.source_name}</p>
                  <RightIcon fill='#006FFF' />
                </div>
              </a>
            </div>
          );
        })}
      </div>
      <div className='mt-5'>
        {pageNumber !== dashboardNewsTotalPages &&
          (dashboardNewsLoading ? (
            <Loader />
          ) : (
            <button className='py-[18px] px-[53px] bg-primary-blue hover:bg-dark-blue target:bg-off-blue rounded text-white font-semibold' onClick={handlePageChange}>
              Load More
            </button>
          ))}
      </div>
    </div>
  );
};

export { LatestNews };
