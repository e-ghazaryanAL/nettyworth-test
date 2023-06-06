import moment from 'moment';
import { useRouter } from 'next/navigation';

import { useAppSelector } from '../../../hooks/redux';
import useNewsCategory from '../../../hooks/useNewsCategory';
import { Loader } from '../../Loader';

const PodcastsHeader = () => {
  const {
    newsData: [firstItem],
    loading,
  } = useAppSelector((state) => state.news);

  const router = useRouter();
  const newsCategory = useNewsCategory();
  const handleNavigateDetails = (slug: string) => {
    router.push(`/podcasts/${slug}`);
  };

  return (
    <div className='px-8 max-w-[1300px]  2xl:mx-auto'>
      <div className='flex gap-1 pt-5 pl-3 '>
        <span className='text-primary text-sm font-semibold'>Podcasts</span>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className='grid grid-cols-1 items-center gap-[42px] pb-10 lg:grid-cols-2 lg:items-start'>
          <img src={firstItem?.featured_image_src} alt='' className='w-full object-cover rounded md:h-full xl:h-[324px]' />
          <div className='flex flex-col justify-between h-full xl:max-w-[566px] 2xl:max-w-2xl'>
            <div className='flex flex-col'>
              <span className='text-3xl font-medium leading-[42px]' dangerouslySetInnerHTML={{ __html: firstItem?.title.rendered }} />
              <span className='text-primary pt-1'>{newsCategory}</span>
              <span className='text-[15px] pt-2'>{moment(firstItem?.date).format('MMMM D YYYY')}</span>
              <span className='text-sm pt-2 leading-[23px]'>{firstItem?.yoast_head_json.description}</span>
            </div>
            <button className='bg-primary-blue uppercase hover:bg-dark-blue target:bg-off-blue text-white mt-5 py-5 rounded px-14  block w-full max-w-max text-base font-semibold' onClick={() => handleNavigateDetails(firstItem.slug)}>
              Read Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { PodcastsHeader };
