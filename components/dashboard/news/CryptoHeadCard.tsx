import moment from 'moment';

import useNewsCategory from '../../../hooks/useNewsCategory';
import { CryptoNewsData } from '../../../redux/news/model';

type CryptoHeadCardProps = {
  item: CryptoNewsData;
};

const CryptoHeadCard: React.FC<CryptoHeadCardProps> = ({ item }) => {
  const newsCategory = useNewsCategory();

  return (
    <div className='grid grid-cols-1 items-center gap-[42px] pb-10  lg:grid-cols-2 lg:items-start'>
      <img src={item?.image_url} alt='' className='w-full object-cover rounded md:h-full xl:h-[324px]' />
      <div className='flex flex-col justify-between h-full  xl:max-w-[566px] 2xl:max-w-2xl'>
        <div className='flex flex-col'>
          <a rel='nofollow' href={item?.news_url}>
            <span className='text-3xl font-medium leading-[42px]'>{item?.title}</span>
          </a>
          <span className='text-primary pt-1'>{newsCategory}</span>
          <span className='text-[15px] pt-2'>{moment(item?.date).format('MMMM D YYYY')}</span>
          <span className='text-sm pt-2 leading-[23px]'>{item?.text}</span>
        </div>

        <a href={item?.news_url} rel='noreferrer' className='cursor-pointer bg-primary-blue uppercase hover:bg-dark-blue dark:hover:border border-primary target:bg-off-blue text-white mt-5 py-5 rounded px-14  block w-full max-w-max text-base font-semibold' target='_blank'>
          Read Post
        </a>
      </div>
    </div>
  );
};

export default CryptoHeadCard;
