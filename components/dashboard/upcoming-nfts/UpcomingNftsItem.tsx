import moment from 'moment';
import momentTz from 'moment-timezone';
import Image from 'next/image';
import ApiCalendar from 'react-google-calendar-api';

import IconCalendar from '../../../assets/icons/icon-calendar.svg';
import IconDiscord from '../../../assets/icons/icon-discord.svg';
import IconTwitter from '../../../assets/icons/icon-twitter.svg';
import IconWebsite from '../../../assets/icons/icon-website.svg';
import { FilterNfts, IUpcomingPost } from '../../../redux/news/model';

type UpcomingNftItemProps = {
  item: IUpcomingPost;
  filterNfts: FilterNfts;
  idx: number;
};

const UpcomingNftsItem: React.FC<UpcomingNftItemProps> = ({ item, idx }) => {
  const config = {
    clientId: '607171961754-p2jofcf3b2s41antl4q8ignti2v3n00j.apps.googleusercontent.com',
    apiKey: 'AIzaSyBYT5ojs9Pvj24ddkLy6Z10JiJw2bOXJso',
    scope: 'https://www.googleapis.com/auth/calendar',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
  };
  const apiCalendar = new ApiCalendar(config);

  const handleCalendar = (date: any, name: string) => {
    const event = {
      summary: name,
      description: name,
      start: {
        dateTime: date,
      },
      end: {
        dateTime: moment(date).utc().endOf('day'),
      },
    };

    apiCalendar.handleAuthClick();

    // @ts-ignore
    apiCalendar.createEvent(event);
  };

  const date = moment.utc(item.saleDate).local();

  return (
    <div className={`${idx > 0 && idx % 4 === 1 ? 'mt-[14px]' : ''} w-full flex gap-[14px] flex-col lg:flex-row pb-5`}>
      <Image src={item?.mainImage?.url} alt='Profile Picture' className='rounded-[11px] object-cover w-full max-h-[210px] md:max-w-none lg:max-w-[409px]' width={409} height={210} priority={idx === 0} />
      <div className='pt-5 pl-[26px] pr-5 pb-[18px] bg-primary rounded-lg w-full dark:border'>
        <div className='flex justify-between flex-wrap gap-2 pb-3 sm:pb-0 sm:gap-0'>
          <span className='text-2xl sm:text-[28px] font-semibold leading-[42px]'>{item.name}</span>
          <div className='flex gap-[10px]'>
            <div className='bg-white flex justify-center items-center w-[35px] h-[35px] rounded'>
              <a href={item.discord} target='_blank' rel='noreferrer'>
                <IconDiscord fill='#006fff' className='w-[18px] h-[18px]' />
              </a>
            </div>
            <div className='bg-white flex justify-center items-center w-[35px] h-[35px] rounded'>
              <a href={item.twitter} target='_blank' rel='noreferrer'>
                <IconTwitter fill='#006fff' className='w-[18px] h-[18px]' />
              </a>
            </div>
            <div className='bg-white flex justify-center items-center w-[35px] h-[35px] rounded'>
              <a href={item.website} target='_blank' rel='noreferrer'>
                <IconWebsite fill='#006fff' className='w-[18px] h-[18px]' />
              </a>
            </div>
            <div className='bg-white flex justify-center items-center w-[35px] h-[35px] rounded' onClick={() => handleCalendar(item.saleDate, item.name)}>
              <IconCalendar fill='#006fff' className='w-[18px] h-[18px]' />
            </div>
          </div>
        </div>
        <div className='max-w-[502px] pb-3'>
          <span className='text-base leading-6'>{item.description}</span>
        </div>
        <div className='grid grid-cols-2 gap-4 sm:gap-0 sm:grid-cols-8 lg:grid-cols-9 max-w-[520px] justify-between'>
          <div className='flex flex-col justify-center sm:col-span-2'>
            <div className='flex flex-col sm:col-span-2 items-start'>
              <span className='text-sm font-semibold leading-6'>Collection</span>
              <span className='text-lg font-light leading-6'>{item.totalSupply}</span>
            </div>
          </div>
          <div className='flex flex-col sm:col-span-2 justify-center'>
            <div className='flex flex-col sm:col-span-2 items-start'>
              <span className='text-sm font-semibold leading-6'>Sale</span>
              <span className='text-lg font-light leading-6'>{date.format('MM.DD.YYYY')}</span>
            </div>
          </div>
          <div className='flex flex-col sm:col-span-3 justify-center'>
            <div className='flex flex-col sm:col-span-2 items-start'>
              <span className='text-sm font-semibold leading-6'>Time</span>
              <span className='text-lg font-light leading-6'>{item.saleTimeTbd ? 'TBD' : `${date.format('h:mm A')} ${momentTz.tz(momentTz.tz.guess()).format('z')}`}</span>
            </div>
          </div>
          <div className='flex flex-col sm:col-span-2 justify-center'>
            <div className='flex flex-col sm:col-span-2 items-start'>
              <span className='text-sm font-semibold leading-6 justify-center'>Cost</span>
              <span className='text-lg font-light leading-6'>{item.mintPriceTbd ? 'TBD' : `${Number(item.mintPrice.toFixed(0)) === item.mintPrice ? item.mintPrice : item.mintPrice.toFixed(4)} ${item.blockchain?.symbol ?? ''}`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { UpcomingNftsItem };
