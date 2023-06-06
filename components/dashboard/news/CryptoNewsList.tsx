import { useEffect } from 'react';

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

import NewsCard from './NewsCard';
import { NewsEmail } from './NewsEmail';
import { Paginataion } from './Pagination';
import { cryptoParams } from '../../../constant';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import usePaginate from '../../../hooks/usePaginate';
import useScreenSize from '../../../hooks/useScreenSize';
import { fetchCryptoNews, fetchNewsData } from '../../../redux/news/newsSlice';
import { Loader } from '../../Loader';

type CryptoNewsListProps = {
  categoryId: number;
};

const CryptoNewsList: React.FC<CryptoNewsListProps> = ({ categoryId }) => {
  const { cryptoNewsLoading, crypoNewsTotalPages } = useAppSelector((state) => state.news);
  const { newsData, cryptoNews } = useAppSelector((state) => state.news);
  const { newsTotalPages } = useAppSelector((state) => state.news);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const { screenWidth } = useScreenSize();
  const { pageNumber, loadMore, setLoadMore } = usePaginate();
  const handleNavigate = (slug: string) => {
    router.push(`${pathname}/${slug}`);
  };
  const filteredByDate = newsData?.filter((val) => {
    return new Date().getTime() - new Date(val.date).getTime() < 48 * 60 * 60 * 1000;
  });
  const mergedNews = [...filteredByDate, ...cryptoNews];

  const newsPagelimit = pageNumber - 1 <= newsTotalPages;

  const handleChangePage = ({ selected }: { selected: number }) => {
    dispatch(
      fetchCryptoNews({
        url: cryptoParams[router.pathname as keyof typeof cryptoParams],
        params: {
          page: selected + 1,
          items: newsPagelimit && filteredByDate.length ? 3 : 6,
        },
      })
    );
    if (newsPagelimit) {
      dispatch(fetchNewsData({ per_page: 3, page: selected + 1, categories: categoryId, order: 'desc', orderby: 'date' }));
    }
  };

  const handleLoadMore = () => {
    setLoadMore((prev) => prev + 1);
    dispatch(
      fetchCryptoNews({
        url: cryptoParams[router.pathname as keyof typeof cryptoParams],
        params: {
          page: loadMore + 1,
          items: newsPagelimit && filteredByDate.length ? 3 : 6,
          isLoadMore: !!loadMore,
        },
      })
    );
  };

  useEffect(() => {
    dispatch(
      fetchCryptoNews({
        url: cryptoParams[router.pathname as keyof typeof cryptoParams],
        params: {
          page: pageNumber,
          items: newsPagelimit && filteredByDate.length ? 3 : 6,
        },
      })
    );
    if (newsPagelimit) {
      dispatch(fetchNewsData({ per_page: 3, page: pageNumber, categories: categoryId, order: 'desc', orderby: 'date' }));
    }
  }, []);

  return (
    <div className='grid grid-cols-1 xl:grid-cols-4 gap-y-14 w-full max-w-[1300px] 2xl:mx-auto'>
      <div className='col-span-3'>
        {screenWidth > 768 && cryptoNewsLoading ? (
          <Loader />
        ) : (
          <>
            {mergedNews?.slice(1).map((item, idx) => {
              return <NewsCard idx={idx} key={idx} item={item} handleNavigate={handleNavigate} />;
            })}
          </>
        )}
        <Paginataion key={categoryId} totalPages={newsPagelimit ? Math.ceil(crypoNewsTotalPages / 2) : crypoNewsTotalPages} handlePageClick={handleChangePage} />
        <div className='w-full flex justify-center'>
          {cryptoNewsLoading && <Loader />}
          {loadMore !== crypoNewsTotalPages && !cryptoNewsLoading && (
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

export default CryptoNewsList;
