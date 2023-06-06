import { useState } from 'react';

import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import marandaPic from 'assets/images/maranda.jpg';
import nettyDisplay from 'assets/images/nettydisplay.png';
import SwiperType, { Navigation, FreeMode, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import checkIcon from '../../assets/icons/check.png';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import PaymentCard from '../../components/dashboard/advertise/PaymentCard';
import { advertisePages, advertiseRules, nettyNotice, plans } from '../../constant';

const AdvertisePage = () => {
  const [activePlan, setActivePlan] = useState('Premium Package');
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const handleActivePlan = (plan: string) => {
    setActivePlan(plan);
  };
  const isCLientSide = typeof window !== 'undefined';

  return (
    <div className='advertise-background pt-5 md:px-8 pb-16 md:pb-4 max-w-[1300px] 2xl:mx-auto'>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-dark-blue text-[32px] md:text-[40px] font-bold'>
          Advertise Your<span className='text-primary text-[32px] md:text-[40px] font-bold'> NFTs</span>
        </h1>
        <p className='text-base md:text-[24px] font-normal leading-[26px]'>Connect with thousands of NFT Collectors</p>
        <p className='text-sm md:text-base font-normal leading-5 mt-6 text-center'>
          Advertise your NFT Collection Pre-launch and Post-launch.
          <br />
          Gain access to our daily site visitors, social media, YouTube,
          <br /> and NYC Time Square billboard
        </p>
      </div>
      <div className='homeGeneral'>
        <div className='border bg-white grid md:grid-cols-2 lg:grid-cols-4  border-lighter-gray-400 rounded-lg mt-[62px] md:mt-[121px] mx-8 md:mx-0 shadow-rgb-gray dark:border-none'>
          {plans.map((item, idx) => {
            return <PaymentCard withBorder key={idx} active={activePlan} setActive={handleActivePlan} paymentPlan={item} />;
          })}
        </div>
      </div>
      <div className='mt-[43px] md:mt-[66px] flex justify-center'>
        <h1 className='text-[33px] md:text-[33px] leading-[34px] font-semibold text-dark-blue'>
          How it <span className='text-[34px] md:text-[33px] leading-[34px] font-semibold text-primary'>Works</span>
        </h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-1 mt-[39px] md:mt-[27px] mx-8 md:mx-0'>
        {advertiseRules.map((rule, idx) => {
          return (
            <div className='bg-light-blue-grey py-16 md:py-[54px] flex justify-center items-center px-[41px] flex-col dark:border' key={idx}>
              <div className='bg-primary-blue rounded-full w-[44px] h-[44px] flex justify-center items-center'>
                <p className='text-white text-[21px] leading-[36px]'>{idx + 1}</p>
              </div>
              <p className='text-[20px] text-center leading-7 font-normal mt-[23px]'>{rule}</p>
            </div>
          );
        })}
      </div>
      <div className='mt-[63px] md:mt-[71px] w-full bg-light-blue-grey flex flex-col justify-center items-center pt-[59px] px-10 dark:border'>
        <h3 className='text-dark-blue text-[30px] md:text-[33px] leading-[39px] font-semibold text-center'>
          Get Noticed by
          <span className='text-primary text-[30px] md:text-[33px] leading-[39px] font-semibold'> NFT Collectors</span>
        </h3>
        <div className='mt-[23px] grid grid-cols-1 md:grid-cols-2 gap-[10px] pb-16'>
          {nettyNotice.map((notice, idx) => {
            return (
              <div key={idx} className='flex gap-5 items-center rounded bg-white py-[18px] pl-[22px] max-w-[349px] dark:border'>
                <img src={checkIcon.src} className='min-w-[20px] h-[15px] object-cover' />
                <h6 className='text-base text-dark-blue font-medium'>{notice}</h6>
              </div>
            );
          })}
        </div>
      </div>
      <div className='grid grid-cols-3 md:mt-[151px]'>
        <div className='hidden md:block'>
          <Swiper direction='vertical' onSwiper={setThumbsSwiper} spaceBetween={14} slidesPerView={4} freeMode={true} watchSlidesProgress={true} modules={[FreeMode, Navigation, Thumbs]} className='max-w-[300px] h-[590px] advertising-swiper-desktop'>
            {advertisePages.map((adv) => {
              return (
                <SwiperSlide key={adv.title}>
                  <div className='bg-light-blue-grey flex py-[35px] justify-center items-center rounded dark:border'>
                    <h6 className='text-[22px] leading-[26px] font-medium text-dark-blue text-center'>{adv.title}</h6>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className='relative col-span-3 md:col-span-2 max-w-max h-max pt-[200px] md:pt-0 dark-primary'>
          <img src={nettyDisplay.src} className='md:-mt-[53px]' />

          <div className='absolute top-[12.5%] md:top-[5%] left-[13%] w-[74%] h-full dark:h-[77%] overflow-hidden dark-primary'>
            <Swiper
              navigation
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              direction={`${isCLientSide && window.innerWidth < 768 ? 'horizontal' : 'vertical'}`}
              // autoplay={{
              //   delay: 3000,
              //   disableOnInteraction: false,
              // }}
              spaceBetween={30}
              modules={[Navigation, FreeMode, Thumbs]}
              className='w-full md:h-[79%] dark:md:h-full advertising-swiper dark-primary'
            >
              {advertisePages.map((adv) => {
                return (
                  <SwiperSlide key={adv.title} className='dark-primary'>
                    <div className='flex flex-col justify-between md:justify-center mt-[180px] md:mt-0 dark-primary'>
                      <div className='flex justify-center absolute top-[62px] md:hidden max-h-24 dark-primary'>
                        <div className='bg-primary-blue w-full px-10 py-[22px] flex justify-center items-center rounded dark:border'>
                          <h6 className='text-[22px] leading-[26px] font-normal text-white'>{adv.title}</h6>
                        </div>
                      </div>
                      <div className='flex justify-center'>
                        <img src={adv.img.src} className='h-full w-full' />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
      <div className='mt-6 bg-light-blue-grey pt-16 px-8 flex flex-col pb-20 justify-center items-center lg:flex-row lg:gap-12 lg:pb-8 homeGeneral dark:border'>
        <div>
          <img src={marandaPic.src} className='w-[240px] h-[187px] object-contain lg:h-[344px] lg:object-cover lg:w-[560px]' />
        </div>
        <div>
          <div className='mt-[35px] mr-auto'>
            <FontAwesomeIcon icon={faQuoteLeft} className='text-primary text-[36px]' />
          </div>
          <div className='mt-3'>
            <p className='font-normal text-[17px] leading-[30px] text-dark-blue'>NettyWorth is the only company I trust to partner with for the launch of my NFT Collection. I've worked with the team for over a year, and they are truly brilliant. I'm not only incredibly grateful for our partnership but energized.</p>
          </div>
          <div className='mt-[35px]'>
            <p className='text-[28px] leading-7 text-dark-blue font-normal'>Maranda Nichols</p>
          </div>
          <div>
            <p className='text-primary text-xl leading-7 font-normal'>Founder - Wild Wolf Witch NFTs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisePage;
