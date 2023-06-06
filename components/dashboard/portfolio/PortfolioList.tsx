import moment from 'moment';

import { IUpcomingPost } from '../../../redux/news/model';

interface IPortfolioList {
  data: IUpcomingPost;
}

const PortfolioCardList: React.FC<IPortfolioList> = ({ data }) => {
  const upcomingDate = moment(data.saleDate).format('MM.DD.YY');
  return (
    <div className='border-b-[1px] last:border-b-0'>
      <div className='flex justify-between items-center px-3 py-2 border-light-gray'>
        <div className='flex items-center'>
          <img className='w-[25px] h-[25px] rounded' src={data.mainImage.url} alt='logo_image' />
          <span className='font-medium text-xs ml-2'>{data.name}</span>
        </div>
        <span className='text-xs font-normal'>{upcomingDate}</span>
      </div>
    </div>
  );
};

export { PortfolioCardList };
