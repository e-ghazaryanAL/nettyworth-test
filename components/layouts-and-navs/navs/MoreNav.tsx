import { useEffect, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { useTheme } from 'next-themes';

import CloseIcon from '../../../assets/icons/icon-close.svg';
import MoonIcon from '../../../assets/icons/icon-moon.svg';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { useTheme } from '../../../hooks/useTheme';
import { setIsOpen } from '../../../redux/auth/portfolioSlice';
import { setCookie } from '../../../utils/cookies';
import { MORE_LINK_ITEMS as more_links, MORE_LEGAL_LINK_ITEMS as legal_links, socialMediaIcons, MORE_LINK_ITEMSMENU } from '../constants';

interface IMoreNav {
  isOpen: boolean;
  handleMoreBar: () => void;
  mobile?: boolean;
  setMoreOpen: (isOpen: boolean) => void;
}
const MoreNav: React.FC<IMoreNav> = ({ isOpen, handleMoreBar, mobile, setMoreOpen }) => {
  const { isVisible } = useAppSelector((state) => state.isVisible);
  const { isOpen: out } = useAppSelector((state) => state.isOpen);

  const { mode, handleSetTheme } = useTheme();
  const refMenu = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isOpen && mobile) {
      document.body.style.overflowY = 'hidden';
    }
    return () => {
      document.body.style.overflowY = 'auto';
      window.scrollTo(0, 0);
    };
  }, [isOpen, mobile]);

  const handleOpen = () => {
    router.push('/');
    dispatch(setIsOpen('true'));
    setCookie('isOpen', 'true');
  };

  useOnClickOutside(refMenu, () => setMoreOpen(false));

  return (
    <div ref={refMenu}>
      <div className={`more-container ${isVisible ? '-mt-[64px] md:mt-[53px]' : '-mt-[64px] md:mt-[3px]'} ${isOpen ? 'open' : ''} more-container-mobile bg-white/85`}>
        <div className='flex justify-end md:close-icon-btn'>
          <button onClick={handleMoreBar} className='p-4'>
            <CloseIcon fill='#006fff' className='font-light' />
          </button>
        </div>
        <div className='md:hidden border-b-[1px]'>
          <div className='more-wrappers'>
            <h3 className='text-xl text-dark-blue'>Menu</h3>
            <ul className='more-items'>
              {MORE_LINK_ITEMSMENU.map((link, id) => {
                return (
                  <li key={id} onClick={() => (link.link === 'Portfolio' && !out ? handleOpen() : handleMoreBar())}>
                    <Link href={`${link.path}`} className='text-dark-blue text-base'>
                      {link.link}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className='flex border-t-[1px] mt-6'>
          <button className={`w-[48px] h-[42px] flex justify-center items-center border-2 ${mode === 'dark' ? 'bg-light-blue-grey dark:bg-dark-mode-btn border-light-blue-grey' : 'bg-primary border-primary'}`} onClick={() => handleSetTheme(mode === 'dark' ? 'light' : 'dark')}>
            <MoonIcon className={`fill-[#0D1A3A] ${mode === 'dark' ? 'dark:fill-[#006FFF]' : 'fill-[#0D1A3A]'}`} />
          </button>
        </div>
        <div className='more-wrappers border-t-[1px] mt-4'>
          <h3 className='text-xl text-dark-blue'>Explore</h3>
          <ul className='more-items'>
            {more_links.map((link, id) => {
              return (
                <li key={id} onClick={handleMoreBar}>
                  <Link href={`${link.path}`} className='text-dark-blue text-base'>
                    {link.link}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className='more-wrappers follow'>
          <h4 className='text-base'>Follow us</h4>
          <div className='social-icons  more-items'>
            {socialMediaIcons.map((item, idx) => {
              return (
                <a href={item.path} target='_blank' key={idx} rel='noreferrer'>
                  <FontAwesomeIcon key={idx} icon={item.icon} className='icons' />
                </a>
              );
            })}
          </div>
        </div>
        <div className='more-wrappers more-footer'>
          <h3>Legal</h3>
          <ul className='more-items'>
            {legal_links.map((link, id) => {
              return (
                <li key={id}>
                  <Link href={link.path} onClick={handleMoreBar} className='text-dark-blue text-base'>
                    {link.link}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className='more-wrappers'>
          <p className='mobile md:more-copyrights'>
            <span className='text-sm text-dark-blue'>&copy; {new Date().getFullYear()} NettyWorth </span>
            <span className='text-sm text-dark-blue'>All Rights Reserved</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default MoreNav;
