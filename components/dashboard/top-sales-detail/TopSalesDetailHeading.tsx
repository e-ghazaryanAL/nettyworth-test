import { useState } from 'react';

import { faAnglesUp, faArrowDown, faArrowUp, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SalesData from './SalesData';
import Discord from '../../../assets/icons/icon-discord.svg';
import Heart from '../../../assets/icons/icon-fave.svg';
import Twitter from '../../../assets/icons/icon-twitter.svg';
import Website from '../../../assets/icons/icon-website.svg';
import { useAppSelector } from '../../../hooks/redux';
import { Loader } from '../../Loader';

type TopSalesDetailHeadingProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  filterCategory: {
    category: string;
    val: string;
  }[];
};

const TopSalesDetailHeading: React.FC<TopSalesDetailHeadingProps> = ({ setIsOpen, filterCategory }) => {
  const { Collection, singleCollectionLoading } = useAppSelector((state) => state.sales);
  const { isAuth } = useAppSelector((state) => state.isAuth);
  const [openData, setIsOpenData] = useState(true);

  return (
    <>
      {singleCollectionLoading ? (
        <Loader />
      ) : (
        <div className='md:pl-6 md:pr-8'>
          <div className='grid grid-cols-1 divide-y xl:divide-y-0'>
            <div className='px-3 sm:px-0 pt-7 border-b-[1px] border-b-input pb-6 md:pb-[76px]'>
              <div className='hidden md:flex items-center'>
                <p className='text-primary text-sm leading-[24px] font-semibold'>NettyWorth</p>
                <p className='text-top-sales text-sm font-normal ml-1'>NFT Sales</p>
                <p className='text-top-sales text-sm font-normal ml-2'>{Collection?.name}</p>
              </div>
              <div className='flex-col sm:flex-row flex mt-5 gap-[14px] md:gap-6'>
                <div className='w-[219px] h-[210px] flex gap-[10px]'>
                  <img src={Collection?.banner_image_url} className='object-cover rounded-md w-full'></img>
                  <div className='gap-2 flex flex-col sm:hidden'>
                    {/* <button className='h-[43px] flex items-center justify-center w-[43px] bg-light-gray rounded-md'>
                  <Heart fill='#a9b0c4' className='text-[20px] w-[16.27px] h-[16.26px]' />
                </button> */}
                  </div>
                </div>
                <div>
                  <h4 className='font-semibold text-xl leading-[43px] md:text-[32px] md:leading-[48px] text-dark-blue'>{Collection?.name}</h4>
                  <div className='sm:max-w-[455px]'>
                    <p className='text-dark-blue text-sm font-normal line-clamp-4 sm:leading-[26px]'>{Collection?.description}</p>
                  </div>
                  <div className='flex gap-3 pt-[18px] items-center'>
                    <div className=''>
                      <a href={`https://opensea.io/collection/${Collection?.slug}`} target='_blank' className='bg-primary-blue w-[171px] h-[45px] flex justify-center items-center rounded-md hover:bg-dark-blue focus:bg-off-blue disabled:bg-btn-disabled'>
                        <span className='text-xs lg:text-lg leading-5 text-white'>Buy on OpenSea</span>
                      </a>
                    </div>
                    <div className='flex gap-2'>
                      {!isAuth ? (
                        <button className='w-[35px] h-[35px] md:h-[45px] md:w-[45px] flex items-center justify-center  bg-light-gray rounded-md'>
                          <Heart fill='#a9b0c4' className='text-[20px] w-[16.27px] h-[16.26px]' />
                        </button>
                      ) : null}
                      <div className='flex gap-2'>
                        {Collection?.discord_url && (
                          <a href={Collection.discord_url} target='_blank' className='w-[35px] h-[35px] md:w-[45px] md:h-[45px] bg-light-blue-grey flex items-center justify-center rounded'>
                            <Discord className=' w-4 h-4 sm:w-[22px] sm:h-[22px]' fill='#006FFF' />
                          </a>
                        )}
                        {Collection?.twitter_username && (
                          <a href={`https://twitter.com/${Collection.twitter_username}`} target='_blank' className='w-[35px] h-[35px] md:h-[45px] md:w-[45px] bg-light-blue-grey flex items-center justify-center rounded'>
                            <Twitter className='w-5 h-5' fill='#006FFF' />
                          </a>
                        )}
                        {Collection?.external_link && (
                          <a href={`${Collection.external_link}`} target='_blank' className='w-[35px] h-[35px] md:h-[45px] md:w-[45px] bg-light-blue-grey flex items-center justify-center rounded'>
                            <Website className=' w-4 h-4 sm:w-[22px] sm:h-[22px]' fill='#006FFF' />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col items-center md:items-stretch justify-center pb-[60px] pt-[23px] md:pb-[47px] '>
              <div className='flex justify-between items-center'>
                <p className='hidden md:block text-lg text-dark-blue font-semibold'>
                  Sales <span className='text-lg text-primary font-semibold'>Data</span>
                </p>
                <button className='bg-[#F8F9FC] rounded w-[97px] h-[39px] flex justify-between px-5 items-center' onClick={() => setIsOpenData((prev) => !prev)}>
                  <span className='font-normal text-sm '>{openData ? 'Close' : 'Open'}</span>
                  {openData ? <FontAwesomeIcon className='text-primary w-2' icon={faArrowUp} /> : <FontAwesomeIcon className='text-primary w-2' icon={faArrowDown} />}
                </button>
              </div>
              <div className={`transition-all duration-300 delay-100 ease-in-out ${openData ? 'max-h-[569px] lg:max-h-[228px]  overflow-auto' : 'max-h-0 overflow-hidden'}`}>
                <SalesData />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='fixed bottom-20 md:hidden right-3 left-3 flex items-center justify-between px-5 overflow-x-auto z-[90]  h-[61px] border-[1px] border-btn-disabled rounded-lg bg-white'>
        <div className='flex gap-4 items-center'>
          <FontAwesomeIcon icon={faSlidersH} className='rotate-[90deg] text-primary' />
          <div>
            <span className='text-base leading-7 font-semibold'> Filter </span>
            <span className='text-base leading-7 text-primary font-semibold'> NFTs </span>
          </div>
        </div>
        <div onClick={() => setIsOpen((prev) => !prev)} className='flex gap-[18px]'>
          <span>{filterCategory.length} applied</span>
          <span>
            <FontAwesomeIcon icon={faAnglesUp} className='text-primary text-[10px]' />
          </span>
        </div>
      </div>
    </>
  );
};

export { TopSalesDetailHeading };
