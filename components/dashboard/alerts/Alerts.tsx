import { useEffect, useState } from 'react';

import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AlertCard from './AlertCard';
import { setNotifications } from '../../../api/api';
import IconRight from '../../../assets/icons/icon-arrow-right.svg';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchUserNotification } from '../../../redux/alerts/alertSlice';
import { AlertCategory } from '../../../redux/alerts/model';
import { Loader } from '../../Loader';

const Alerts = () => {
  const { notification, loading } = useAppSelector((state) => state.alert);
  const dispatch = useAppDispatch();
  const [toggleSwitch, setToggleSwitch] = useState({ CryptoSales: true, NFTSales: true, News: true, Upcoming: true });
  useEffect(() => {
    dispatch(fetchUserNotification());
  }, [dispatch]);

  useEffect(() => {
    if (notification?.settings) {
      const { CryptoSales, NFTSales, News, Upcoming } = notification.settings;
      setToggleSwitch({
        CryptoSales: !!CryptoSales,
        NFTSales: !!NFTSales,
        News: !!News,
        Upcoming: !!Upcoming,
      });
    }
  }, [notification]);

  const handleSwitchToggle = (alertType: AlertCategory) => {
    const toggleNotification = async () => {
      const res = await setNotifications({ category: alertType, value: !toggleSwitch[alertType] });
      return res;
    };
    toggleNotification();
    setToggleSwitch((prev) => {
      return {
        ...prev,
        [alertType]: !prev[alertType],
      };
    });
  };

  return (
    <div className='flex flex-col-reverse lg:flex-row h-auto md:h-full overflow-y-auto'>
      <div className='pt-[29px] px-[25px] w-full pb-7 lg:w-[60%] xl:w-[66%]'>
        <div className='pb-9'>
          <span className='text-lg font-semibold'>Recent </span>
          <span className='text-lg font-semibold text-primary'>Alerts</span>
        </div>
        <div className='flex flex-col gap-4'>
          {loading ? (
            <Loader />
          ) : (
            notification?.notifications?.map((item, i) => {
              return <AlertCard key={i} data={item} />;
            })
          )}
          {!notification?.notifications?.length ? <span className='text-sm'>There are no notifications to display</span> : null}
        </div>
        <div className='flex gap-4  pt-5 items-center'>
          <span className='text-sm text-primary font-medium'>Load More</span>
          <span className='text-2xl text-primary'>
            <IconRight fill='#006fff' />
          </span>
        </div>
      </div>
      <div className=' py-[27px]  bg-light-blue-grey pl-[22px] pr-[25px] w-full lg:w-[40%] xl:w-[34%] '>
        <div className='flex items-center gap-3 xl:max-w-[349px]'>
          <span className='text-top-sales text-base leading-7  font-semibold  '>Settings </span>
          <FontAwesomeIcon icon={faSliders} className='text-primary text-[15px]' />
        </div>
        <div className='flex flex-col gap-4 pt-4 sm:grid sm:grid-cols-2 md:flex  xl:max-w-[349px]'>
          {/* <div className='relative'>
            <input type='text' placeholder='Search NFT - Daily Floor Price ...' className='w-full bg-[#fff] h-[63px] border-2 pl-14 border-input rounded placeholder:text-sm placeholder:text-[#465272]' />
            <FontAwesomeIcon className='absolute top-5 left-4 text-primary text-xl' icon={faSearch} />
          </div> */}
          {/* <div className=' border-b-0 md:border-b-2 md:h-20 border-dotted'>
            <div className=' bg-[#fff] h-[63px] border-2 flex items-center justify-between pl-4 border-input rounded placeholder:text-sm placeholder:text-[#465272]'>
              <div className='flex gap-6'>
                <span className='text-sm text-[#465272]'>Bored Ape</span>
              </div>
              <div className='flex items-center gap-3'>
                <div className='w-[35px] h-[35px] flex items-center justify-center  bg-primary-grey'>
                  <IconClose className='w-[10px] h-[10px]' />
                </div>

                <label className='inline-flex relative items-center mr-5 cursor-pointer'>
                  <input type='checkbox' className='sr-only peer' checked={toggleSwitch.bored} readOnly />
                  <div
                    onClick={() => handleSwitchToggle('bored')}
                    className="w-11 h-[21px] bg-[#BFC8DF] rounded-full peer  peer-focus:ring-[#006FFF]  peer-checked:after:-translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[0.2rem] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[15px] after:w-[15px] after:transition-all peer-checked:bg-[#006FFF]"
                  ></div>
                </label>
              </div>
            </div>
          </div> */}

          <div className=' bg-[#fff] h-[63px] border-2 flex items-center justify-between pl-4 border-input rounded placeholder:text-sm placeholder:text-[#465272]'>
            <div className='flex gap-6'>
              <span className='text-sm text-[#465272]'>NFT News</span>
            </div>
            <div className='flex items-center gap-3'>
              <label className='inline-flex relative items-center mr-5 cursor-pointer rounded-full'>
                <input type='checkbox' className='sr-only peer' checked={toggleSwitch.News} readOnly />
                <div
                  onClick={() => handleSwitchToggle('News')}
                  className="w-11 h-[21px] bg-[#BFC8DF] rounded-full peer peer-focus:ring-[#006FFF] peer-checked:after:-translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[0.2rem] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[15px] after:w-[15px] after:transition-all peer-checked:bg-[#006FFF] dark:peer dark:!bg-dark-mode-btn dark:peer-checked:!bg-[#006FFF]"
                ></div>
              </label>
            </div>
          </div>

          <div className=' bg-[#fff] h-[63px] border-2 flex items-center justify-between pl-4 border-input rounded placeholder:text-sm placeholder:text-[#465272]'>
            <div className='flex gap-6'>
              <span className='text-sm text-[#465272]'>Upcoming NFTS</span>
            </div>
            <div className='flex items-center gap-3'>
              <label className='inline-flex relative items-center mr-5 cursor-pointer rounded-full'>
                <input type='checkbox' className='sr-only peer' checked={toggleSwitch.Upcoming} readOnly />
                <div
                  onClick={() => handleSwitchToggle('Upcoming')}
                  className="w-11 h-[21px] bg-[#BFC8DF] rounded-full peer peer-focus:ring-[#006FFF] peer-checked:after:-translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[0.2rem] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[15px] after:w-[15px] after:transition-all peer-checked:bg-[#006FFF] dark:peer dark:bg-dark-mode-btn dark:peer-checked:!bg-[#006FFF]"
                ></div>
              </label>
            </div>
          </div>
          <div className=' bg-[#fff] h-[63px] border-2 flex items-center justify-between pl-4 border-input rounded placeholder:text-sm placeholder:text-[#465272]'>
            <div className='flex gap-6'>
              <span className='text-sm text-[#465272]'>Crypto Prices</span>
            </div>
            <div className='flex items-center gap-3'>
              <label className='inline-flex relative items-center mr-5 cursor-pointer rounded-full'>
                <input type='checkbox' className='sr-only peer' checked={toggleSwitch.CryptoSales} readOnly />
                <div
                  onClick={() => handleSwitchToggle('CryptoSales')}
                  className="w-11 h-[21px] bg-[#BFC8DF] rounded-full peer peer-focus:ring-[#006FFF] peer-checked:after:-translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[0.2rem] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[15px] after:w-[15px] after:transition-all peer-checked:bg-[#006FFF] dark:peer dark:!bg-dark-mode-btn dark:peer-checked:!bg-[#006FFF]"
                ></div>
              </label>
            </div>
          </div>
          <div className=' bg-[#fff] h-[63px] border-2 flex items-center justify-between pl-4 border-input rounded placeholder:text-sm placeholder:text-[#465272]'>
            <div className='flex gap-6'>
              <span className='text-sm text-[#465272]'>NFT Sales</span>
            </div>
            <div className='flex items-center gap-3'>
              <label className='inline-flex relative items-center mr-5 cursor-pointer rounded-full'>
                <input type='checkbox' className='sr-only peer' checked={toggleSwitch.NFTSales} readOnly />
                <div
                  onClick={() => handleSwitchToggle('NFTSales')}
                  className="w-11 h-[21px] bg-[#BFC8DF] rounded-full peer peer-focus:ring-[#006FFF] peer-checked:after:-translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[0.2rem] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[15px] after:w-[15px] after:transition-all peer-checked:bg-[#006FFF] dark:peer dark:!bg-dark-mode-btn dark:peer-checked:!bg-[#006FFF]"
                ></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Alerts };
