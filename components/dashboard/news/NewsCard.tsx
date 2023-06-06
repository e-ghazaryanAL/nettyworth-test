import moment from 'moment';

import RightIcon from '../../../assets/icons/new-window.svg';
import useNewsCategory from '../../../hooks/useNewsCategory';

type NewsCardProps = {
  item: any;
  idx: number;
  handleNavigate: (slug: string) => void;
};

const NewsCard: React.FC<NewsCardProps> = ({ item, idx, handleNavigate }) => {
  const newsCategory = useNewsCategory();

  return (
    <div className={`flex flex-col sm:flex-row gap-5 pb-8 2xl:pl-8 ${idx !== 0 && 'pt-[15px] bg-light-blue-grey border-t-[1px] '} xl:max-w-[700px] 2xl:max-w-none`}>
      <img src={item.image_url || item.featured_image_src} alt='' className='w-full h-[196px] object-cover rounded sm:w-[279px]' />
      <div className='flex flex-col gap-2 cursor-pointer xl:max-w-[468px] 2xl:max-w-[478px]'>
        <a rel='noreferrer' className='cursor-pointer' href={item?.news_url} target='_blank'>
          <h2 className='font-medium text-2xl text-dark-blue' dangerouslySetInnerHTML={{ __html: item.title.rendered || item.title }} />
        </a>
        <div className='flex flex-col gap-3'>
          <span className='text-primary'>{newsCategory}</span>
          <div className='flex flex-col'>
            <span className='text-sm'>{moment(item?.date).format('MMMM D YYYY')}</span>
            <span className='text-sm leading-[23px] line-clamp-2'>{item.news_url ? item.text : item?.yoast_head_json?.description}</span>
          </div>
        </div>
        {item.news_url ? (
          <a rel='noreferrer' className='cursor-pointer w-fit' href={item?.news_url} target='_blank'>
            <span className='text-primary text-sm font-medium flex items-center gap-2'>
              Read on {item.source_name}
              <span className='text-primary text-3xl'>
                <RightIcon fill='#006fff' />
              </span>
            </span>
          </a>
        ) : (
          <div className='cursor-pointer w-fit' onClick={() => handleNavigate(item.slug)}>
            <span className='text-primary text-sm font-medium flex items-center gap-2'>
              Learn More
              <span className='text-primary text-3xl'>
                <RightIcon fill='#006fff' />
              </span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
