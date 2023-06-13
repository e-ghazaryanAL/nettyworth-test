import moment from 'moment';

import IconAlerts from '../../../assets/icons/icon-alerts.svg';
import IconClose from '../../../assets/icons/icon-close.svg';
import { IAlert } from '../../../redux/alerts/model';

interface AlertCardProps {
  data: IAlert;
}

const AlertCard: React.FC<AlertCardProps> = ({ data }) => {
  const notificationCategory: Record<string, string> = {
    Upcoming: 'Upcoming NFTs Releasing Today -',
    News: 'Daily NettyWorth News -',
    NFTSales: "Favourite NFT's -",
  };

  const notifDescription: Record<string, string | undefined> = {
    Upcoming: `${data.name} - ${moment(data.saleDate).format('h A')}`,
    News: data.title,
    NFTSales: `${data.collection_name} - ${data.floor_price} ETH`,
  };

  return (
    <div className='bg-light-blue-grey px-10 py-4 relative'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2'>
          <IconAlerts fill='#006FFF' className='absolute left-4 w-[13px] h-4' />
          {notificationCategory[data.category] ? <span className={`text-sm ${data.seen ? 'text-btn-disabled' : ''} font-semibold`}>{notificationCategory[data.category]}</span> : null}
          <span className={`text-sm ${data.seen ? 'text-btn-disabled' : ''}`}>{notifDescription[data.category] || data.description}</span>
        </div>
        <IconClose fill='#006FFF' className='absolute right-[18px] w-2 h-2' />
      </div>
    </div>
  );
};
export default AlertCard;
