import { FC, ReactNode, useState } from 'react';

// import { Navbar, Sidebar, MoreNav } from 'components/layouts-and-navs';
// import { useAppSelector } from 'hooks/redux';
// import Banner from 'pages/banner-top/Banner';
// import useScreenSize from 'hooks/useScreenSize';

import { usePathname } from 'next/navigation';

import { MoreNav, Navbar } from '..';
import { useAppSelector } from '../../../hooks/redux';
import Sidebar from '../navs/Sidebar';

interface IDashboardLayout {
  children: ReactNode;
}
const DashboardLayout: FC<IDashboardLayout> = ({ children }) => {
  const [moreOpen, setMoreOpen] = useState<boolean>(false);
  // const { screenWidth }: any = useScreenSize();
  const pathname = usePathname();
  // const mobileView = screenWidth < 480;
  // const otherView = screenWidth > 480;
  const { isVisible } = useAppSelector((state) => state.isVisible);
  const handleToggleMoreBar = () => {
    setMoreOpen((prev) => !prev);
  };

  return (
    <>
      {/* <Banner dashboard /> */}
      <div className='h-screen w-full flex'>
        {/* {mobileView && <MoreNavMobile isOpen={moreOpen} handleMoreBar={handleToggleMoreBar} />} */}
        <Sidebar handleMoreBar={handleToggleMoreBar} moreOpen={moreOpen} setMoreOpen={setMoreOpen} />
        <div className={'flex-1 flex flex-col md:pl-[200px]'}>
          <Navbar />
          <div className='flex h-full'>
            <MoreNav isOpen={moreOpen} handleMoreBar={handleToggleMoreBar} setMoreOpen={setMoreOpen} />
            <div className={`flex-1 ${isVisible ? 'pt-[117px] ' : 'pt-[67px]'} h-full ${pathname?.startsWith('/news') ? 'bg-light-blue-grey' : 'bg-white'}`}>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
