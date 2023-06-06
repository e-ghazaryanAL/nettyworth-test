import Link from 'next/link';
import { usePathname } from 'next/navigation';

import MobileStickyBottomNav from './MobileStickyBottomNav';
import logoDark from '../../../assets/images/nettyworth-beta-dark.png';
import logo from '../../../assets/images/nettyworthbeta.png';
import { useAppSelector } from '../../../hooks/redux';
import { sideBarLinks } from '../constants';

type TSideBar = {
  handleMoreBar: () => void;
  moreOpen: boolean;
  setMoreOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ handleMoreBar, moreOpen, setMoreOpen }: TSideBar) => {
  const pathname = usePathname();
  const { isVisible } = useAppSelector((state) => state.isVisible);
  const handleSideBarLinks = () => {
    setMoreOpen(false);
  };
  return (
    <>
      <div className={`hidden ${isVisible ? 'mt-[50px]' : 'mt-0'} max-w-[250px] min-w-[200px] h-full overflow-y-auto bg-primary border-r border-gray-200 md:block md:fixed`}>
        <div className='ml-6 mt-[15px] w-[140px]'>
          <img src={logo.src} alt='logo' className='h-[35px] object-cover dark:hidden' />
          <img src={logoDark.src} alt='logo' className='h-[35px] object-contain hidden dark:block' />
        </div>
        <div className='pl-5 pr-1 mt-11 '>
          {sideBarLinks.map(({ Icon, ...item }) => {
            const clone = { ...item };
            if (clone.link) {
              clone.link = `${item.link}`;
            }
            return item.title !== 'More' ? (
              <Link key={item.title} href={item.link} onClick={handleSideBarLinks} className={`py-3 my-3 flex items-center px-4 rounded text-xs ${clone.link ? (pathname === `${clone.link}` ? 'activeLink' : '') : pathname === `${clone.link}` ? 'activeLink' : ''}`}>
                <span className={`mr-4 ${item.link !== '/podcasts' ? 'p-1.5 ' : 'pl-[2px] mr-[21px]'} rounded max-w-[28px]`}>
                  <Icon fill={'#A9B0C4'} />
                </span>
                <span className='text-[12px] font-medium'>{item.title}</span>
              </Link>
            ) : (
              <Link href={pathname || ''} key={item.link} onClick={handleMoreBar} className={`cursor-pointer py-2 my-3 flex items-center px-4 rounded-sm text-xs h-10 ${moreOpen ? 'activeLink' : ''}`}>
                <span className='mr-4 px-1.5 rounded'>
                  <Icon fill={'#A9B0C4'} />
                </span>
                <span className='text-[12px] font-medium'>{item.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <MobileStickyBottomNav />
    </>
  );
};

export default Sidebar;
