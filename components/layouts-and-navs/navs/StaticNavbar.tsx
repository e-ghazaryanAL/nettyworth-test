import { useRef, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Banner from 'pages/banner-top/Banner';
import { InstantSearch } from 'react-instantsearch-dom';
import { useDispatch } from 'react-redux';

import MobileStickyBottomNav from './MobileStickyBottomNav';
import MoreNav from './MoreNav';
import { searchClient } from '../../../api/api';
import MoonIcon from '../../../assets/icons/icon-moon.svg';
import IconSearch from '../../../assets/icons/icon-search.svg';
import WalletIcon from '../../../assets/icons/icon-wallet.svg';
import logoDark from '../../../assets/images/nettyworth-beta-dark.png';
import logo from '../../../assets/images/nettyworthbeta.png';
import { useAppSelector } from '../../../hooks/redux';
import useMobileSearch from '../../../hooks/useMobileSearch';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { useTheme } from '../../../hooks/useTheme';
import { searchHandler, setIsOpen } from '../../../redux/auth/portfolioSlice';
import { setCookie } from '../../../utils/cookies';
// import { ReactComponent as CloseIcon } from '../../../assets/icons/icon-close.svg';
// import { ReactComponent as SunIcon } from '../../../assets/icons/icon-sun.svg';
import MobileSearch from '../../dashboard/search-nfts/MobileSearch';
import { SearchHits } from '../../dashboard/search-nfts/Search';
import { CustomSearchBox } from '../../dashboard/search-nfts/Searchbox';
import { staticNavbarLinks } from '../constants';

const StaticNavbar = () => {
  const { searchIsOpen } = useAppSelector((state) => state.isOpen);
  const { mode, handleSetTheme } = useTheme();

  const { mobileSearchVisible, searchModalHandler } = useMobileSearch();
  const dispatch = useDispatch();
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  // const [showSearchMobile, setShowSearchMobile] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleLogin = () => {
    router.push('/login');
  };

  const handleResultShow = () => {
    dispatch(searchHandler());
  };
  useOnClickOutside(searchRef, () => dispatch(searchHandler()));

  // const handleMobileResultShow = () => {
  //   setShowSearchMobile((prev) => !prev);
  // };

  const handleOpen = (item?: string) => {
    setMobileNavOpen(false);
    if (item === 'Portfolio') {
      router.push('/portfolio');
      dispatch(setIsOpen('true'));
      setCookie('isOpen', 'true');
    }
  };

  return (
    <>
      <div className='fixed z-50 w-full dark:bg-dark-mode'>
        {/* <Banner /> */}
        <nav className='w-full backdrop-blur-[60px]'>
          <div className='flex items-center justify-between md:justify-start pl-6 pr-[38px] md:px-5 border-b-2 border-gray-100 h-[64px] w-full'>
            <Link href='/' className='py-1.5 flex justify-center w-[125px] md:w-[140px]'>
              <img src={logo.src} alt='logo' className='h-[32px] md:h-[35px] object-cover dark:hidden' />
              <img src={logoDark.src} alt='logo' className='h-[32px] md:h-[35px] object-contain hidden dark:block' />
            </Link>
            <div className='hidden relative md:block flex-1 px-3 md:px-5 lg:px-10 py-[10px] md:mx-5 md:border-x border-gray-200 dark:border-dark-border'>
              <div className='relative'>
                <InstantSearch searchClient={searchClient} indexName='nfts'>
                  {/* @ts-ignore */}
                  <CustomSearchBox modalHandler={handleResultShow} />
                  {searchIsOpen && (
                    <div ref={searchRef}>
                      <SearchHits />
                    </div>
                  )}
                </InstantSearch>
              </div>
            </div>
            <div className='flex items-center py-[10px] gap-4'>
              <button onClick={() => handleSetTheme(mode === 'light' ? 'dark' : 'light')} className={`hidden md:flex h-[42px] min-w-[90px] rounded px-2 relative text-xs font-medium justify-center gap-[14px] items-center border-2 ${mode === 'light' ? 'bg-light-blue-grey border-primary' : 'bg-dark-mode-btn'} hover:bg-primary-blue [&>svg]:hover:fill-white`}>
                <MoonIcon fill='#006fff' />
              </button>
              <button className='flex h-[42px] md:hidden  rounded px-2 justify-center items-center bg-white dark:bg-dark-mode-btn dark:border-dark-border' onClick={searchModalHandler}>
                <IconSearch fill='#006fff' />
              </button>
              <button className='flex h-[42px] hover:bg-primary-blue hover:text-white border-[2px] homeBtn border-primary rounded px-2 gap-1 relative line justify-center items-center bg-white dark:bg-dark-mode-btn dark:border-dark-border' onClick={handleLogin}>
                <WalletIcon fill='#006FFF' />
                <span className='hidden md:block text-sm font-medium'>Sign In</span>
              </button>
              <button className='focus:outline-none md:hidden' onClick={() => setMobileNavOpen((prev) => !prev)}>
                <div className='h-0.5 w-[14px] bg-gray-600 mb-1 dark:bg-white dark-primary'></div>
                <div className='h-0.5 w-[14px] bg-gray-600 mb-1 dark:bg-white dark-primary'></div>
                <div className='h-0.5 w-[14px] bg-gray-600 mb-1 dark:bg-white dark-primary'></div>
              </button>
            </div>
          </div>
          <ul className='hidden md:flex items-center gap-11 py-3 justify-center border-b border-light-gray dark:border-dark-border'>
            {staticNavbarLinks.map((item, idx) => {
              return (
                <li key={idx}>
                  <Link href={item.link} onClick={() => handleOpen(item.title)} className='text-sm font-medium'>
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {!mobileNavOpen && <MobileStickyBottomNav />}
        {mobileSearchVisible && (
          <div>
            <MobileSearch modalHandler={searchModalHandler} />
          </div>
        )}
      </div>
      <MoreNav isOpen={mobileNavOpen} handleMoreBar={handleOpen} mobile={true} setMoreOpen={setMobileNavOpen} />
    </>
  );
};

export default StaticNavbar;
