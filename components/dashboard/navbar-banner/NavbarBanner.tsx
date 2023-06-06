import CloseIcon from '../../../assets/icons/icon-close.svg';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setIsVisible } from '../../../redux/banner/bannerSlice';

const NavbarBanner = () => {
  const { isVisible } = useAppSelector((state) => state.isVisible);
  const dispatch = useAppDispatch();
  const handleCloseBanner = () => {
    dispatch(setIsVisible(false));
    sessionStorage.setItem('show_banner', 'false');
  };
  return (
    <>
      {isVisible && (
        <div className='h-[50px] w-full pr-[2.2rem] md:w-full banner bg-primary-blue text-white flex justify-between items-center md:pr-6'>
          <div className='flex-1'></div>
          <div onClick={handleCloseBanner} className='cursor-pointer'>
            <CloseIcon fill='#fff' />
          </div>
        </div>
      )}
    </>
  );
};

export { NavbarBanner };
