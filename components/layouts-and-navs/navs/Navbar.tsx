import React, { useEffect, useRef, useState } from 'react';

import { faFingerprint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { InstantSearch } from 'react-instantsearch-dom';
import { useAccount, useDisconnect } from 'wagmi';

import MobileTopNav from './MobileDashBaordNav';
import { getUserDetail, logoutUser, saveWallet, searchClient } from '../../../api/api';
import { Mixpanel } from '../../../api/mixpanel';
import AlertIcon from '../../../assets/icons/icon-alerts.svg';
import CloseIcon from '../../../assets/icons/icon-close.svg';
import LogoutIcon from '../../../assets/icons/icon-logout.svg';
import MoonIcon from '../../../assets/icons/icon-moon.svg';
import ProfileIcon from '../../../assets/icons/icon-profile.svg';
import SettingsIcon from '../../../assets/icons/icon-settings.svg';
import WalletIcon from '../../../assets/icons/icon-wallet.svg';
import coinbasePic from '../../../assets/images/coinbaselogo.png';
import metaMaskPic from '../../../assets/images/metamask.png';
import walletConnectPic from '../../../assets/images/WalletConnect.png';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import useScreenSize from '../../../hooks/useScreenSize';
import { useTheme } from '../../../hooks/useTheme';
import { setShowAnimation } from '../../../redux/auth/authSlice';
import { searchHandler } from '../../../redux/auth/portfolioSlice';
import { setUserImage } from '../../../redux/wallet/userSlice';
// import { ReactComponent as AddressIcon } from '../../../assets/icons/icon-address.svg';
// import  SunIcon } from '../../../assets/icons/icon-logged-sun.svg';
// import { ReactComponent as HeartIcon } from '../../../assets/icons/icon-fave.svg';
import AlertsModal from '../../dashboard/alerts/AlertsModal';
import { WalletModal } from '../../dashboard/portfolio/WalletModal';
import { SearchHits } from '../../dashboard/search-nfts/Search';
import { CustomSearchBox } from '../../dashboard/search-nfts/Searchbox';
import AccountSettings from '../AccountSettings';

const Navbar = () => {
  const { searchIsOpen } = useAppSelector((state) => state.isOpen);
  const { isVisible } = useAppSelector((state) => state.isVisible);
  const { showAnimation } = useAppSelector((state) => state.isAuth);
  const { trigger, userImage, nettyWorth, wallets, NFTValue } = useAppSelector((state) => state.user);
  const router = useRouter();
  const { mode, handleSetTheme } = useTheme();
  const [seeWalletModal, setWalletModal] = useState<boolean>();
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const [pageLogOut, setPageLogOut] = useState<boolean>(false);
  const [alertShow, setAlertShow] = useState<boolean>(false);
  const { screenWidth } = useScreenSize();
  const isMobileView = screenWidth < 768;
  const { isConnected, connector, address } = useAccount();
  const [settings, setSettings] = useState(false);
  const [navbar, setNavbar] = useState<boolean>(false);
  const logOutRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const alertsRef = useRef<HTMLDivElement>(null);
  const alertModalRef = useRef<HTMLButtonElement>(null);

  const dispatch = useAppDispatch();

  const { disconnect } = useDisconnect();
  let connectedWalletLogo: string = '';
  if (connector?.name === 'MetaMask') {
    connectedWalletLogo = metaMaskPic.src;
  } else if (connector?.name === 'Coinbase Wallet') {
    connectedWalletLogo = coinbasePic.src;
  } else {
    connectedWalletLogo = walletConnectPic.src;
  }
  const walletModalHandler = () => {
    window.scrollTo(0, 0);
    setWalletModal((prev) => !prev);
  };
  const walletDisconnect = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    disconnect();
    Mixpanel.track(`${connector?.name} - Disconnected`);
    // Mixpanel.reset();
    setShowLogout(false);
    dispatch(setShowAnimation(false));
  };

  useEffect(() => {
    const getUserImage = async () => {
      const userDetails = await getUserDetail();
      if (userDetails) {
        dispatch(setUserImage(userDetails.profile_picture));
      }
    };
    getUserImage();
  }, [userImage]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        if (window.scrollY >= 66) {
          setNavbar(true);
        } else {
          setNavbar(false);
        }
      });
    }
  }, []);
  useEffect(() => {
    if (seeWalletModal) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [seeWalletModal]);

  useEffect(() => {
    if (address && showAnimation) {
      Mixpanel.track('Wallet Connected', {
        wallet_connect_method: connector?.name,
        wallet_address: address,
        wallet_connection_state: isConnected,
        trigger,
      });
      Mixpanel.registerOnce({
        first_wallet_connect_date: new Date(),
        ignore: false,
      });
      Mixpanel.increment('total_wallet_connects');
      Mixpanel.setProperty({ Demography: 'Stuff' });
      saveWallet({
        address,
        cryptoValue: wallets[0] && wallets[0].ethUsdValue,
        nettyWorth,
        NFTValue,
      });
    }
  }, [address, showAnimation]);

  const handleShowAlerts = () => {
    setAlertShow((prev) => !prev);
    if (!alertShow) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  };

  useOnClickOutside(logOutRef, () => {
    setPageLogOut(false);
  });
  useOnClickOutside(settingsRef, () => setSettings(false));
  useOnClickOutside(searchRef, () => dispatch(searchHandler()));
  useOnClickOutside(alertsRef, () => setAlertShow(false), alertModalRef);
  const handleOpenLogOut = () => {
    setPageLogOut((prev) => !prev);
    if (alertShow) {
      setAlertShow(false);
    }
    if (settings) {
      setSettings(false);
    }
  };
  function deleteAllCookies() {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.slice(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  }
  const handleLogout = async () => {
    try {
      deleteAllCookies();
      // await logoutUser();
      disconnect();
      // router.push('/');
      await signOut({
        callbackUrl: '/',
        redirect: true,
      });
      return true;
    } catch (e) {
      return (e as AxiosError).message;
    }
  };
  const searchModalHandler = () => {
    dispatch(searchHandler());
  };

  const handleOpenSettings = () => {
    setSettings((prev) => !prev);
    setPageLogOut(false);
  };

  return (
    <>
      <div className={`fixed w-full md:w-[calc(100%-200px)] z-10 hidden md:block ${isVisible ? 'mt-[50px]' : ''}`}>
        {/* <Banner /> */}
        <nav className={`${navbar ? 'backdrop-blur-[273px]' : 'bg-white/85'} md:flex items-center py-3 border-b border-gray-200 pr-5 pl-4`}>
          <div className='flex-1 relative'>
            <InstantSearch searchClient={searchClient} indexName='nfts'>
              {/* @ts-ignore */}
              <CustomSearchBox modalHandler={searchModalHandler} />
              {searchIsOpen && (
                <div ref={searchRef}>
                  <SearchHits />
                </div>
              )}
            </InstantSearch>
          </div>
          <div className='flex gap-2 items-center h-full ml-5'>
            <button ref={alertModalRef} className={`relative flex w-[42px] h-[42px] rounded justify-center items-center ${alertShow ? 'bg-primary-blue ' : 'bg-primary'}`} onClick={handleShowAlerts}>
              <span className='w-[6px] h-[6px] rounded-full bg-light-green absolute top-1 right-1'></span>
              <AlertIcon fill={`${alertShow ? '#fff ' : '#006FFF'}`} />
            </button>
            {/* <button className='bg-primary flex w-[42px] h-[42px] rounded justify-center items-center'>
            <HeartIcon fill='#006FFF' />
          </button> */}
            {/* <button className='bg-primary flex w-[42px] h-[42px] rounded justify-center items-center'>
            <AddressIcon fill='#006FFF' />
          </button> */}
            <div className='w-[90px] h-[42px] flex justify-center items-center'>
              <button onClick={() => handleSetTheme(mode === 'light' ? 'dark' : 'light')} className={`flex h-[42px] min-w-[90px] rounded px-2 relative text-xs font-medium justify-center gap-[14px] items-center ${mode === 'light' ? 'bg-light-blue-grey border-primary border-2' : 'bg-dark-mode-btn border-2'}  hover:bg-primary-blue [&>svg]:hover:fill-white`}>
                <MoonIcon fill='#006fff' />
              </button>
            </div>
            <button className={`flex w-[42px] h-[42px] rounded relative line justify-center items-center hover:bg-primary-blue [&>svg]:hover:fill-white dark:hover:border dark:bg-dark-mode-bt ${isConnected ? (showLogout ? 'bg-white border' : 'bg-primary-blue') : 'bg-primary'}`} onClick={() => (!isConnected ? walletModalHandler() : setShowLogout((prev) => !prev))}>
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
                  <div className='py-3 px-16 bg-dark-blue rounded text-white text-sm cursor-pointer' onClick={walletDisconnect}>
                    Disconnect
                  </div>
                </div>
              )}
            </button>
            <div ref={logOutRef} className={'relative'}>
              {userImage ? <img src={userImage} className='w-9 h-9 border object-cover rounded-full cursor-pointer' alt='photo' onClick={handleOpenLogOut} /> : <ProfileIcon onClick={handleOpenLogOut} className='cursor-pointer' />}
              {pageLogOut && (
                <div>
                  <div className={'relative'}>
                    <div className='absolute backdrop-blur-[30px] border border-lighter-gray-500 top-3 shadow-md -left-[130px] rounded z-[60] flex flex-col p-[10px] gap-[7px] w-max justify-center'>
                      <button onClick={handleOpenSettings} className='text-dark-blue flex gap-4 px-4 py-3 items-center bg-white rounded w-[140px]'>
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
        {alertShow && (
          <div ref={alertsRef}>
            <AlertsModal />
          </div>
        )}
      </div>
      {seeWalletModal && <WalletModal isModalShow={walletModalHandler} />}
      {settings && (
        <div ref={settingsRef}>
          <AccountSettings isShow={handleOpenSettings} />
        </div>
      )}
      {isMobileView && <MobileTopNav seeWalletModal={seeWalletModal} walletModalHandler={walletModalHandler} setShowLogout={setShowLogout} showLogout={showLogout} handleLogout={handleLogout} isConnected={isConnected} walletDisconnect={walletDisconnect} connectedWalletLogo={connectedWalletLogo} />}
    </>
  );
};

export default Navbar;
