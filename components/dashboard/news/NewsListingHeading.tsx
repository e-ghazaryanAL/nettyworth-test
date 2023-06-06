import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { breadcrumbs } from '../../../constant';
import { useAppSelector } from '../../../hooks/redux';
import { Loader } from '../../Loader';

type NewsListingHeadingProps = {
  handleNavigateDetails: (slug: string) => void;
};

const NewsListingHeading: React.FC<NewsListingHeadingProps> = ({ handleNavigateDetails }) => {
  const {
    newsData: [firstItem],
    loading,
  } = useAppSelector((state) => state.news);
  const router = useRouter();
  const breadcrumb = breadcrumbs[router.pathname];

  return (
    <div className='pt-[22px] px-8 max-w-[1300px] 2xl:mx-auto'>
      {loading ? (
        <Loader />
      ) : (
        <div className='grid grid-cols-1 items-center gap-[42px] pb-10  lg:grid-cols-2 lg:items-start'>
          <img src={firstItem?.featured_image_src} alt='' className='w-full object-cover   rounded md:h-full xl:h-[324px]' />
          <div className='flex flex-col justify-between h-full  xl:max-w-[566px] 2xl:max-w-2xl'>
            <div className='flex flex-col'>
              <Link href={firstItem?.slug || ''}>
                <span className='text-3xl font-medium leading-[42px]' dangerouslySetInnerHTML={{ __html: firstItem?.title.rendered }} />
              </Link>{' '}
              <span className='text-primary pt-1'>
                {breadcrumb?.blue} {breadcrumb?.text}
              </span>
              <span className='text-[15px] pt-2'>{moment(firstItem?.date).format('MMMM D YYYY')}</span>
              <span className='text-sm pt-2 leading-[23px]'>{firstItem?.yoast_head_json.description}</span>
            </div>
            <button className='bg-primary-blue uppercase hover:bg-dark-blue target:bg-off-blue text-white mt-5 py-5 rounded px-14  block w-full max-w-max text-base font-semibold' onClick={() => handleNavigateDetails(firstItem.slug)}>
              {router.pathname === '/podcasts' ? 'Watch Video' : 'Read Post'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { NewsListingHeading };
