import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useAppDispatch } from '../../../hooks/redux';
import { setIsOpen } from '../../../redux/auth/portfolioSlice';
import { setCookie } from '../../../utils/cookies';
import { mobileSideBarLinks } from '../constants';

const MobileStickyBottomNav = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const handleConnect = () => {
    dispatch(setIsOpen('true'));
    setCookie('isOpen', 'true');
  };
  return (
    <>
      <nav className='md:hidden fixed bottom-2 bg-dark-blue rounded right-3 left-3 flex items-center justify-between overflow-x-auto z-30 dark:border '>
        {mobileSideBarLinks.map(({ Icon, link, title }) => (
          <Link
            key={title}
            href={link}
            className={`focus:outline-none last:text-center last:min-w-[100px] last:px-0 flex flex-col justify-end items-center text-white h-full py-4 px-3 flex-1 ${pathname === `/dashboard/${link}` ? 'active-footer' : ''}`}
            onClick={() => {
              if (link === '/') {
                handleConnect();
              }
            }}
          >
            <div className='text-primary'>{<Icon fill='currentColor' className='w-[20px] h-[15px]' />}</div>
            <span className='text-[0.7rem] text-white mt-1'>{title}</span>
          </Link>
        ))}
      </nav>
    </>
  );
};

export default MobileStickyBottomNav;
