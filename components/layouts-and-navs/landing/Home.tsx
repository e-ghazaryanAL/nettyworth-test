import { ReactNode } from 'react';

import { useAppSelector } from '../../../hooks/redux';
import StaticFooter from '../navs/StaticFooter';
import StaticNavbar from '../navs/StaticNavbar';

// import { StaticTopNavbar } from 'components/layouts-and-navs';
// import { useAppSelector } from 'hooks/redux';

interface IHome {
  children: ReactNode;
}

const Home: React.FC<IHome> = ({ children }) => {
  const { isVisible } = useAppSelector((state) => state.isVisible);

  return (
    <div>
      <StaticNavbar />
      <div className={`min-h-[500px] ${isVisible ? 'pt-[117px]  md:pt-[170px]' : 'pt-[67px]  md:pt-[120px]'}`}>{children}</div>
      <div />
      <StaticFooter />
    </div>
  );
};

export default Home;
