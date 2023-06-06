import moment from 'moment';
import Link from 'next/link';

import RightIcon from '../../../assets/icons/icon-arrow-right.svg';
import { useAppSelector } from '../../../hooks/redux';
import useNewsCategory from '../../../hooks/useNewsCategory';
import { Loader } from '../../Loader';
// import { NewsEmail } from '../news/NewsEmail';
import { Paginataion } from '../news/Pagination';

const Podcasts = () => {
  const { newsData, loading, newsTotalPages } = useAppSelector((state) => state.news);
  const newsCategory = useNewsCategory();

  const handlePageClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='grid grid-cols-1 xl:grid-cols-4  gap-y-14	 w-full  max-w-[1300px] 2xl:mx-auto'>
      <div className='col-span-3'>
        {loading ? (
          <Loader />
        ) : (
          <>
            {newsData.slice(1).map((item: any, idx: number) => {
              return (
                <div key={idx} className={`flex flex-col  sm:flex-row gap-5  pb-8 2xl:pl-8 ${idx !== 0 && 'pt-[15px] bg-light-blue-grey border-t-[1px] '} xl:max-w-[700px] 2xl:max-w-none`}>
                  <img src={item.featured_image_src} alt='' className='w-full rounded object-cover sm:max-w-[279px]' />
                  <div className='flex flex-col gap-2  xl:max-w-[468px] 2xl:max-w-[478px]'>
                    <h2 className='font-medium text-2xl text-dark-blue'>{item.title.rendered}</h2>
                    <div className='flex flex-col gap-3'>
                      <span className='text-primary'>{newsCategory}</span>
                      <div className='flex flex-col'>
                        <span className='text-sm'>{moment(item.date).format('MMMM D YYYY')}</span>
                        <span className='text-sm leading-[23px]'>{item.yoast_head_json.description}</span>
                      </div>
                    </div>
                    <div className='cursor-pointer w-fit'>
                      <Link href={`${item.slug}`}>
                        <span className='text-primary text-sm font-medium flex items-center gap-2'>
                          Learn More{' '}
                          <span className='text-primary text-3xl'>
                            <RightIcon fill='#006fff' />
                          </span>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
        <Paginataion totalPages={newsTotalPages} handlePageClick={handlePageClick} />
      </div>

      {/* <NewsEmail /> */}
    </div>
  );
};

export { Podcasts };
