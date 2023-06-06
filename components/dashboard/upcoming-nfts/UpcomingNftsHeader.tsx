import { useEffect } from 'react';

import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';

import IconCalendar from '../../../assets/icons/icon-calendar.svg';
import IconDiscord from '../../../assets/icons/icon-discord.svg';
import IconTwitter from '../../../assets/icons/icon-twitter.svg';
import IconWebsite from '../../../assets/icons/icon-website.svg';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { FilterNfts } from '../../../redux/news/model';
import { fetchBlockChainMenu, fetchCategoryMenu, fetchUpcomingNfts } from '../../../redux/news/newsSlice';
import 'rc-dropdown/assets/index.css';

type UpcomingNftsHeaderProps = {
  handleFilter: (name: string, item: string | boolean) => void;
  filterNfts: FilterNfts;
};
const UpcomingNftsHeader: React.FC<UpcomingNftsHeaderProps> = ({ handleFilter, filterNfts }) => {
  const { upcomingBlockchainMenu, upcomingCategoryMenu, upcomingNfts } = useAppSelector((state) => state.news);
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBlockChainMenu());
    dispatch(fetchCategoryMenu());
  }, []);

  useEffect(() => {
    dispatch(
      fetchUpcomingNfts({
        dateStart: moment().utc().startOf('day'),
        dateEnd: moment().utc().endOf('week').format(),
        symbol: filterNfts.symbol,
        postsPerPage: 20,
      })
    );
  }, [filterNfts]);

  const categoryMenu = (
    <Menu className='top-sales-dropdown h-[150px] overflow-y-auto'>
      {upcomingCategoryMenu?.map((item, idx) => {
        return (
          <MenuItem className='text-input bg-white flex items-center text-xs sm:text-sm hover:bg-light-gray' key={idx} onClick={() => handleFilter('category', item.name)}>
            {item.name}
          </MenuItem>
        );
      })}
    </Menu>
  );

  const blockChainMenu = (
    <Menu className='top-sales-dropdown h-[150px] overflow-y-auto'>
      {upcomingBlockchainMenu?.map((item, idx) => {
        return (
          <MenuItem
            className='text-input bg-white flex items-center text-xs sm:text-sm hover:bg-light-gray'
            key={idx}
            onClick={() => {
              router.push(`${item.name === 'All Blockchains' ? 'upcoming-nft-launches' : `upcoming-${item.name}-nft-launches`}`);
            }}
          >
            {item.name}
          </MenuItem>
        );
      })}
    </Menu>
  );

  return (
    <div>
      <div className='flex justify-center items-center pr-[6px] flex-wrap gap-4 md:justify-between pb-4'>
        <div>
          <h4 className='font-semibold mb-[6px] text-center'>Upcoming {upcomingBlockchainMenu?.map((blockChain) => (blockChain.symbol === filterNfts.symbol ? blockChain.name : ''))} NFT Projects</h4>
        </div>
        <Link href='/nft-advertising' className='bg-dark-blue py-[14px] max-h-[49px] pl-6 pr-[25px] w-full rounded text-white text-sm font-normal max-w-[232px] lg:w-auto hover:bg-primary-blue dark:border dark:border-dark-border'>
          Submit Upcoming Launch
        </Link>
      </div>
      <div className=' max-w-[550px]'>
        <span className='text-sm leading-[26px] text-center'>
          Get the latest drops, free mints, and upcoming NFTs for {upcomingBlockchainMenu?.map((blockChain) => (blockChain.symbol === filterNfts.symbol ? blockChain.name : ''))}. From collectible PFP projects to generative art, photography, and more, the NettyWorth NFT calendar keeps you updated with the latest {filterNfts.symbol} collections.
        </span>
      </div>
      <div className='flex flex-col items-center gap-4 pt-[19px] flex-wrap lg:flex-row md:items-start'>
        <Dropdown animation='slide-up' overlay={blockChainMenu} trigger={['click']}>
          <button type='button' className='h-[49px] max-w-[294px] w-full text-input rounded bg-primary-grey py-[14px] pl-[23px] border-input border-[1px] flex justify-between custom-dropdown'>
            {upcomingBlockchainMenu?.map((item) => {
              if (item.symbol === filterNfts.symbol) {
                return (
                  <span key={item.name} className='text-xs sm:text-sm  text-input'>
                    {item.name}
                  </span>
                );
              }
              return null;
            })}
            <span className='flex flex-col text-input pr-6'>
              <FontAwesomeIcon icon={faChevronUp} className='text-[10px]' />
              <FontAwesomeIcon icon={faChevronDown} className='-mt-[2px] text-[10px]' />
            </span>
          </button>
        </Dropdown>
        <Dropdown animation='slide-up' overlay={categoryMenu} trigger={['click']}>
          <button type='button' className='h-[49px] max-w-[294px] w-full text-input rounded bg-primary-grey pt-[12px] pb-[14px] pl-[23px] border-input border-[1px] flex justify-between custom-dropdown'>
            {upcomingCategoryMenu?.map((val) => {
              if (val.name === filterNfts.category) {
                return (
                  <span key={val.name} className='text-xs sm:text-sm  text-input'>
                    {val.name}
                  </span>
                );
              }
              return null;
            })}
            <span className='flex flex-col text-input pr-6'>
              <FontAwesomeIcon icon={faChevronUp} className='text-[10px]' />
              <FontAwesomeIcon icon={faChevronDown} className='-mt-[2px] text-[10px]' />
            </span>
          </button>
        </Dropdown>
        <button className={`border-[3px] border-primary hover:bg-primary-blue hover:text-white w-full ${filterNfts.freeMint ? 'bg-off-blue text-white' : 'text-dark-blue'} pt-[12px] pb-[14px] h-[49px] pl-6 pr-[25px] rounded text-sm font-normal max-w-[294px] lg:max-w-[182px]`} onClick={() => handleFilter('freeMint', !filterNfts.freeMint)}>
          Free Mint
        </button>
      </div>
      <div className='flex gap-[40px] pt-[19px] w-full flex-wrap xl:flex-nowrap'>
        {upcomingNfts?.posts.map((val) => {
          return (
            val.featured && (
              <div>
                <span className='text-[22px] text-dark-blue font-semibold'>{val.name}</span>
                <div>
                  <div className=' bg-primary rounded'>
                    <div className=' px-[7px] pt-[7px] relative w-full'>
                      <img src={val.mainImage.url} alt='' className='h-[280px] sm:h-auto max-h-[290px] w-full object-cover rounded ' />
                      <div className='bg-primary-blue pt-3 sm:pt-0 min-h-[96px] flex pr-[33px] gap-[10px] pl-[20px] justify-center sm:justify-between rounded-lg absolute -bottom-[55px] sm:-bottom-[47px] left-[15px] w-[calc(100%-31px)] items-center flex-wrap sm:flex-wrap'>
                        <div className='flex gap-x-[34px] sm:gap-[23px] justify-center flex-wrap sm:flex-nowrap'>
                          <div className='flex flex-col'>
                            <span className='text-white sm:text-sm w-max'>{val.category.name}</span>
                            <span className='text-white text-sm sm:text-base font-semibold max-w-max'>{val.totalSupply}</span>
                          </div>
                          <div className='flex flex-col'>
                            <span className='text-white sm:text-sm max-w-max'>Cost</span>
                            <span className='text-white text-sm sm:text-base font-semibold max-w-max'>{Math.ceil(val.mintPrice)}</span>
                          </div>
                          <div className='flex flex-col'>
                            <span className='text-white sm:text-sm max-w-max'>Sale Date</span>
                            <span className='text-white text-sm sm:text-base font-semibold max-w-max'>{moment(val.saleDate).format('MM.DD.YYYY, h A')}</span>
                          </div>
                        </div>
                        <div>
                          <span className='text-xl sm:text-[30px] font-bold text-white'>{}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='pb-[22px] pt-12 bg-light-blue-grey pl-[15px] pr-9'>
                  <div className='flex gap-[10px] pt-[14px] pb-2'>
                    <div className='bg-btn-disabled flex justify-center items-center w-[35px] h-[35px] rounded'>
                      <a href={val.discord} target='_blank' rel='noreferrer'>
                        <IconDiscord fill='#006fff' className='w-[18px] h-[18px]' />
                      </a>
                    </div>
                    <div className='bg-btn-disabled flex justify-center items-center w-[35px] h-[35px] rounded'>
                      <a href={val.twitter} target='_blank' rel='noreferrer'>
                        <IconTwitter fill='#006fff' className='w-[18px] h-[18px]' />
                      </a>
                    </div>
                    <div className='bg-btn-disabled flex justify-center items-center w-[35px] h-[35px] rounded'>
                      <a href={val.website} target='_blank' rel='noreferrer'>
                        <IconWebsite fill='#006fff' className='w-[18px] h-[18px]' />
                      </a>
                    </div>
                    <div className='bg-btn-disabled flex justify-center items-center w-[35px] h-[35px] rounded'>
                      <IconCalendar fill='#006fff' className='w-[18px] h-[18px]' />
                    </div>
                  </div>
                  <span className='dark-blue'>{val.description}</span>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export { UpcomingNftsHeader };
