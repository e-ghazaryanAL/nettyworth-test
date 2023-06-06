import { useEffect } from 'react';

import { NavbarBanner } from '../../components/dashboard/navbar-banner/NavbarBanner';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setIsVisible } from '../../redux/banner/bannerSlice';

type BannerProps = {
  dashboard?: boolean;
};
const Banner: React.FC<BannerProps> = ({ dashboard }) => {
  const { isVisible } = useAppSelector((state) => state.isVisible);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const timeId = setTimeout(() => {
      if (!sessionStorage.getItem('show_banner')) {
        dispatch(setIsVisible(true));
      }
    }, 2000);
    return () => {
      clearTimeout(timeId);
    };
  }, []);
  return (
    <div className={`${isVisible ? 'h-full max-h-[50px]' : 'h-auto max-h-0'} transition-all 2s ease banner ${dashboard ? 'fixed w-full z-20' : ''}`}>
      <NavbarBanner />
    </div>
  );
};

export default Banner;
