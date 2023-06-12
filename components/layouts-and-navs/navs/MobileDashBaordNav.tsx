import React, { useRef, useState } from 'react';

import { faFingerprint, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useAccount } from 'wagmi';

// import { ReactComponent as AlertIcon } from '../../../assets/icons/icon-alerts.svg';
import MoreNav from './MoreNav';
import CloseIcon from '../../../assets/icons/icon-close.svg';
import LogoutIcon from '../../../assets/icons/icon-logout.svg';
import SearchIcon from '../../../assets/icons/icon-search.svg';
import SettingsIcon from '../../../assets/icons/icon-settings.svg';
import WalletIcon from '../../../assets/icons/icon-wallet.svg';
import logoDark from '../../../assets/images/nettyworth-beta-dark.png';
import logo from '../../../assets/images/nettyworthbeta.png';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import useMobileSearch from '../../../hooks/useMobileSearch';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { setIsOpen } from '../../../redux/auth/portfolioSlice';
import { removeCookie } from '../../../utils/cookies';
import { WalletModal } from '../../dashboard/portfolio/WalletModal';
import MobileSearch from '../../dashboard/search-nfts/MobileSearch';
import AccountSettings from '../AccountSettings';

interface IMobileTopNav {
  handleLogout?: () => void;
  isConnected: boolean;
  walletDisconnect: (e: React.SyntheticEvent) => void;
  connectedWalletLogo: string;
  showLogout: boolean;
  setShowLogout: React.Dispatch<React.SetStateAction<boolean>>;
  walletModalHandler: () => void;
  seeWalletModal: boolean | undefined;
}

const MobileTopNav: React.FC<IMobileTopNav> = ({ handleLogout, walletModalHandler, seeWalletModal, isConnected, walletDisconnect, connectedWalletLogo, showLogout, setShowLogout }) => {
  const [showAccount, setShowAccount] = useState<boolean>(false);
  const { mobileSearchVisible, searchModalHandler } = useMobileSearch();
  const [showMore, setShowMore] = useState<boolean>(false);
  const [pageLogout, setPageLogOut] = useState<boolean>(false);
  const loggedRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const { connector } = useAccount();
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.isOpen);
  const { data: session } = useSession();

  const { userImage } = useAppSelector((state) => state.user);
  const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const { isVisible } = useAppSelector((state) => state.isVisible);
  const modalHandler = () => {
    setShowAccount((prev) => !prev);
    setPageLogOut(false);
  };
  const setShowMoreHandler = () => {
    setShowMore((prev) => !prev);
    if (!showMore) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  };

  useOnClickOutside(loggedRef, (e: React.SyntheticEvent<EventTarget>) => {
    if (!(e.target as Element).classList.contains('logged')) setPageLogOut(false);
  });
  useOnClickOutside(settingsRef, () => {
    setShowAccount(false);
  });
  const handleLogOut = () => {
    dispatch(setIsOpen(''));
    removeCookie('isOpen');
  };

  return (
    <>
      {mobileSearchVisible && (
        <div>
          <MobileSearch modalHandler={searchModalHandler} />
        </div>
      )}
      <div className={`fixed w-full md:w-[calc(100%-200px)] ${isVisible ? ' mt-[50px]' : ''}  md:hidden ${showAccount ? 'z-0' : 'z-10'}`}>
        {/* <Banner /> */}
        <nav className='flex w-full backdrop-blur-[273px] md:hidden items-center justify-between py-6 pl-6 pr-5 border-b border-light-gray h-16'>
          <Link href='/' onClick={handleLogOut} className='w-[125px]'>
            <Image src={logo} alt='logo' className='h-[32px] object-cover dark:hidden' />
            <Image src={logoDark} alt='logo' className='h-[32px] object-contain hidden dark:block' />
          </Link>
          <div className='flex items-center'>
            <div className='flex mr-[17px]'>
              <button className='h-[42px] flex items-center px-3 mr-4 rounded-sm' onClick={searchModalHandler}>
                <SearchIcon fill='#006FFF' />
              </button>
              <button className={`flex w-[42px] mr-4 h-[42px] rounded relative line justify-center items-center ${isConnected ? (showLogout ? 'bg-white border' : 'bg-primary-blue') : 'bg-primary'}`} onClick={() => !isMobile && (!isConnected ? walletModalHandler() : setShowLogout((prev: boolean) => !prev))}>
                {showLogout ? <CloseIcon fill='#006FFF' /> : <WalletIcon fill={`${isConnected ? '#FFFFFF' : '#006FFF'}`} />}
                {showLogout && (
                  <div className='absolute top-[40px] -right-[1px] z-10 px-[10px] py-3 bg-white border border-light-gray rounded-b rounded-tl flex gap-4 flex-col'>
                    <div className='p-3 flex justify-between bg-light-gray rounded'>
                      <div className='flex justify-center'>
                        <img src={connectedWalletLogo} alt='pic' className='w-[31px] h-[18px] object-cover' />
                        <span className='font-semibold'>{connector?.name}</span>
                      </div>
                      <FontAwesomeIcon icon={faFingerprint} className='text-light-green' />
                    </div>
                    <div className='py-3 px-16 bg-dark-blue rounded text-white text-sm cursor-pointer' onClick={!isMobile ? walletDisconnect : undefined}>
                      Disconnect
                    </div>
                  </div>
                )}
              </button>
              {/* <button className={`h-[42px] flex items-center px-3 mr-4 rounded-sm  text-primary relative ${showAlerts ? 'bg-primary-blue' : 'bg-primary'}`} onClick={handleShowAlerts}>
              <span className='w-[6px] h-[6px] absolute bg-light-green rounded-full top-1 right-1'></span>
              <AlertIcon fill={`${showAlerts ? '#FFF' : '#006FFF'}`} />
            </button> */}
              <button className='focus:outline-none md:hidden dark-primary' onClick={setShowMoreHandler}>
                <div className='h-0.5 w-[14px] bg-gray-600 mb-1 dark-latest dark:bg-white'></div>
                <div className='h-0.5 w-[14px] bg-gray-600 mb-1 dark-latest dark:bg-white'></div>
                <div className='h-0.5 w-[14px] bg-gray-600 mb-1 dark-latest dark:bg-white'></div>
              </button>
            </div>
            <div className='relative mt-[22px] z-20'>
              <div className='bg-dark-blue w-11 h-16 flex flex-col gap-2 justify-center items-center rounded' onClick={() => setPageLogOut((prev) => !prev)}>
                <img src={`${userImage || '/profile.png'}`} className={`${isOpen && !session?.user ? 'hidden' : 'block'} w-7 h-7 rounded-full object-cover logged`} alt='' />
                <FontAwesomeIcon icon={faAngleDown} className='text-white w-3' />
              </div>
              {pageLogout && (
                <div>
                  <div className={'relative'}>
                    <div className='absolute bg-white border border-lighter-gray-500 top-3 shadow-md -left-[130px] rounded z-[60] flex flex-col p-[10px] gap-[7px] w-max justify-center'>
                      <button onClick={modalHandler} className='text-dark-blue flex gap-4 px-4 py-3 items-center bg-white rounded w-[140px]'>
                        <SettingsIcon />
                        <span className='text-primary text-xs font-medium'>Settings</span>
                      </button>
                      <button className='text-dark-blue text-sm flex gap-4 items-center py-3 px-4 bg-white rounded w-[140px]' onClick={handleLogout}>
                        <LogoutIcon />
                        <span className='text-primary text-xs font-medium'>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
      {showAccount && (
        <div ref={settingsRef}>
          <AccountSettings isShow={modalHandler} />
        </div>
      )}
      {seeWalletModal && <WalletModal isModalShow={walletModalHandler} />}
      <MoreNav isOpen={showMore} handleMoreBar={setShowMoreHandler} mobile={true} setMoreOpen={setShowMore} />
    </>
  );
};

export default MobileTopNav;
