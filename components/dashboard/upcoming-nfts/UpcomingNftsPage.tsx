import { useEffect, useState } from 'react';

import moment from 'moment';

import { UpcomingNftsItem } from './UpcomingNftsItem';
import { graphqlClient } from '../../../api/api';
import { getMoreUpcomings, getUpcomingBydate } from '../../../api/apoloQueries';
import { FilterNfts, IUpcomingNfts, IUpcomingPost } from '../../../redux/news/model';
import AdBanners from '../../shared/AdBanners';

type UpcomingNftsPageProps = {
  filterNfts: FilterNfts;
};
const UpcomingNftsPage: React.FC<UpcomingNftsPageProps> = ({ filterNfts }) => {
  const [todayData, setTodayData] = useState<IUpcomingPost[]>();
  const [weekData, setWeekData] = useState<IUpcomingPost[]>();
  const [nextWeekData, setNextweekData] = useState<IUpcomingPost[]>();
  const [futureData, setFutureData] = useState<IUpcomingPost[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPosts, setTotalPosts] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const postsPerPage = 20;

  useEffect(() => {
    const fetchTodayData = async () => {
      setLoading(true);
      const data = await graphqlClient.request<IUpcomingNfts>(getUpcomingBydate(filterNfts), {
        dateStart: moment().utc().startOf('day'),
        dateEnd: moment().utc().endOf('day'),
        ...(filterNfts.symbol !== 'All' && { symbol: filterNfts.symbol }),
        ...(filterNfts.category !== 'All NFTs' && { category: filterNfts.category }),
        freeMint: filterNfts.freeMint,
        postsPerPage: 20,
      });
      setLoading(false);
      setTodayData(data.posts);
    };
    const fetchWeekData = async () => {
      const data = await graphqlClient.request<IUpcomingNfts>(getUpcomingBydate(filterNfts), {
        dateStart: moment().utc().add(1, 'day').startOf('day'),
        dateEnd: moment().utc().endOf('week').format(),
        ...(filterNfts.symbol !== 'All' && { symbol: filterNfts.symbol }),
        ...(filterNfts.category !== 'All NFTs' && { category: filterNfts.category }),
        freeMint: filterNfts.freeMint,
        postsPerPage: 20,
      });
      setWeekData(data.posts);
    };
    const fetchFutureData = async () => {
      const data = await graphqlClient.request<IUpcomingNfts>(getUpcomingBydate(filterNfts), {
        dateStart: moment().utc().add(2, 'weeks').startOf('week'),
        dateEnd: moment().utc().endOf('year').format(),
        ...(filterNfts.symbol !== 'All' && { symbol: filterNfts.symbol }),
        ...(filterNfts.category !== 'All NFTs' && { category: filterNfts.category }),
        freeMint: filterNfts.freeMint,
        postsPerPage: 20,
      });
      setFutureData(data.posts);
    };
    fetchTodayData();
    fetchWeekData();
    fetchFutureData();
  }, [filterNfts]);

  useEffect(() => {
    const fetchNextWeekData = async () => {
      const { posts } = await graphqlClient.request<IUpcomingNfts>(getMoreUpcomings(filterNfts), {
        dateStart: moment().utc().add(1, 'weeks').startOf('week'),
        dateEnd: moment().utc().add(1, 'weeks').endOf('week'),
        ...(filterNfts.symbol !== 'All' && { symbol: filterNfts.symbol }),
        ...(filterNfts.category !== 'All NFTs' && { category: filterNfts.category }),
        freeMint: filterNfts.freeMint,
        postsPerPage,
      });
      setNextweekData(posts);
      setTotalPosts(Math.ceil(posts.length / postsPerPage));
    };
    fetchNextWeekData();
  }, [currentPage, postsPerPage, filterNfts]);

  const handleMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className='mt-[30px]'>
      {!!todayData?.length && (
        <>
          <div className='flex items-center gap-3 pb-5'>
            <div className='bg-light-blue-grey min-w-[97px] h-[46px] flex justify-center items-center rounded-lg'>
              <span className='text-xl leading-8 text-dark-blue'>Today</span>
            </div>
            <hr className='bg-btn-disabled h-[2px] w-full' />
          </div>
          {todayData?.map((val, idx) => {
            return (
              <div key={idx}>
                <UpcomingNftsItem idx={idx} item={val} filterNfts={filterNfts} />
                {(idx + 1) % 4 === 0 ? (
                  <div className='mb-[14px]'>
                    <AdBanners />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
          {todayData?.length < 4 ? (
            <div className='mb-[14px]'>
              <AdBanners />
            </div>
          ) : (
            <></>
          )}
        </>
      )}
      {!!weekData?.length && (
        <>
          <div className='flex items-center gap-3 pb-5'>
            <div className='bg-light-blue-grey min-w-[134px] h-[46px] flex justify-center items-center rounded-lg'>
              <span className='text-xl leading-8 text-dark-blue'>This Week</span>
            </div>
            <hr className='bg-btn-disabled h-[2px] w-full' />
          </div>
          {weekData?.map((nft, idx) => {
            return (
              <div key={idx}>
                <UpcomingNftsItem idx={idx} item={nft} filterNfts={filterNfts} />
                {(idx + 1) % 4 === 0 ? (
                  <div className='mb-[14px]'>
                    <AdBanners />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
          {weekData?.length < 4 ? (
            <div className='mb-[14px]'>
              <AdBanners />
            </div>
          ) : (
            <></>
          )}
        </>
      )}
      {!!nextWeekData?.length && (
        <>
          <div className='flex items-center gap-3 pb-5'>
            <div className='bg-light-blue-grey min-w-[134px] h-[46px] flex justify-center items-center rounded-lg'>
              <span className='text-xl leading-8 text-dark-blue'>Next Week</span>
            </div>
            <hr className='bg-btn-disabled h-[2px] w-full' />
          </div>
          {nextWeekData?.map((nft, idx) => {
            return (
              <div key={idx}>
                <UpcomingNftsItem idx={idx} item={nft} filterNfts={filterNfts} />
                {(idx + 1) % 4 === 0 ? (
                  <div className='mb-[14px]'>
                    <AdBanners />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
          {nextWeekData?.length < 4 ? (
            <div className='mb-[14px]'>
              <AdBanners />
            </div>
          ) : (
            <></>
          )}
        </>
      )}
      {!!futureData?.length && (
        <>
          <div className='flex items-center gap-3 pb-5'>
            <div className='bg-light-blue-grey min-w-[134px] h-[46px] flex justify-center items-center rounded-lg'>
              <span className='text-xl leading-8 text-dark-blue'>Future</span>
            </div>
            <hr className='bg-btn-disabled h-[2px] w-full' />
          </div>
          {futureData?.map((nft, idx) => {
            return (
              <div key={idx}>
                <UpcomingNftsItem idx={idx} item={nft} filterNfts={filterNfts} />
                {(idx + 1) % 4 === 0 ? (
                  <div className='mb-[14px]'>
                    <AdBanners />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
          {futureData?.length < 4 ? (
            <div className='mb-[14px]'>
              <AdBanners />
            </div>
          ) : (
            <></>
          )}
        </>
      )}

      {totalPosts > 0 && currentPage !== totalPosts && (
        <button className='rounded bg-primary-blue w-[200px] h-[60px] flex justify-center items-center' onClick={handleMore}>
          <span className='text-base leading-6 text-white font-semibold'>LOAD MORE</span>
        </button>
      )}
    </div>
  );
};

export { UpcomingNftsPage };
