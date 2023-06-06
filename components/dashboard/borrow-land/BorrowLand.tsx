import { useState } from 'react';

import MailchimpSubscribe, { EmailFormFields } from 'react-mailchimp-subscribe';
// import ReactPlayer from 'react-player';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import IconEmail from '../../../assets/icons/icon-email.svg';
import { loanBenefits, loanCondit, nftLoanCard } from '../../../constant';

const url = 'https://nettyworth.us5.list-manage.com/subscribe/post?u=231e2a6d374606653a3e22abe&amp;id=c4868499e1&amp;f_id=00f650e9f0';
const BorrowLand = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (evt: React.SyntheticEvent, subscribe: (form: EmailFormFields) => void) => {
    evt.preventDefault();
    subscribe({
      EMAIL: email,
    });
    setEmail('');
  };
  return (
    <div className='w-full h-full flex flex-col'>
      <div className='mt-[51px]'>
        <div className='flex flex-col justify-center items-center'>
          <div className='flex flex-col justify-center items-center w-full homeGeneral'>
            <h1 className='text-[38px] md:text-[55px] font-semibold text-dark-blue leading-[44px] md:leading-[51px] text-center'>
              <span className='text-[38px] md:text-[55px] font-semibold text-primary leading-[44px] md:leading-[51px]'>NFT</span> Loans <br /> Coming Soon
            </h1>
            <div className='max-w-[417px] mt-3'>
              <p className='text-[17px] leading-[26px] font-normal text-center'>Borrow & Lend against valuable NFTs. Access the liquidity you need by borrowing against your NFTs with up to 90 days to repay.</p>
            </div>
            <div className='mt-11 custom-swiper'>
              <Swiper
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay, Pagination]}
                className='max-w-[328px] h-[614px] md:max-w-[778px] md:h-[300px]'
              >
                {nftLoanCard.map((nft, idx) => {
                  return (
                    <SwiperSlide key={idx}>
                      <div className='border rounded bg-white border-lighter-gray-300 flex flex-col md:flex-row w-full'>
                        <div className='border-b md:border-b-0 md:border-r border-lighter-gray-300 px-4 md:px-2 pb-[19px] md:pb-0 pt-[16px] md:pt-[6px]'>
                          <div className='flex flex-col gap-2 justify-center items-center'>
                            <img className='w-[297px] h-[286px] md:w-[179px] md:h-[172px]' src={nft.image.src} />
                            <span className='hidden md:block font-medium'>{nft.tokenId}</span>
                          </div>
                        </div>
                        <div className='flex flex-col justify-center items-center py-[21px] px-[11px] md:pl-[13px]'>
                          <p className='p-large'>{nft.name}</p>
                          <div className='grid grid-cols-2 gap-x-[25px] gap-y-[10px] md:gap-[10px] mt-4'>
                            <div className='bg-primary-grey rounded py-[10px] pl-[23px] w-[155px] md:w-[267px] dark:border'>
                              <p className='text-[14px] font-semibold leading-7'>Payback</p>
                              <p className='p-small text-primary'>{nft.payback}</p>
                            </div>
                            <div className='bg-primary-grey rounded py-[10px] pl-[23px] w-[141px] md:w-[267px] dark:border'>
                              <p className='text-[14px] font-semibold leading-7'>Term</p>
                              <p className='p-small text-primary'>{nft.Term}</p>
                            </div>
                            <div className='bg-primary-grey rounded py-[10px] pl-[23px] w-[155px] md:w-[267px] dark:border'>
                              <p className='text-[14px] font-semibold leading-7'>Loan</p>
                              <p className='p-small text-primary'>{nft.Loan}</p>
                            </div>
                            <div className='bg-primary-grey rounded py-[10px] pl-[23px] w-[141px] md:w-[267px] dark:border'>
                              <p className='text-[14px] font-semibold leading-7'>APR</p>
                              <p className='p-small text-primary'>{nft.APR}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
          <div className='mt-5 md:mt-10 max-w-[374px] md:max-w-none bottom-4 rounded-lg bg-dark-blue flex gap-14 flex-col md:flex-row justify-center items-center px-[69px] md:pl-[37px] md:pr-[22px] py-[23px] dark:border'>
            <p className='text-white text-[20px] text-center md:text-start font-medium leading-[26px]'>Join our Lending Waitlist</p>
            <MailchimpSubscribe
              url={url}
              render={({ subscribe, status, message }) => {
                return (
                  <form className='flex flex-col gap-5 md:flex-row md:gap-8' onSubmit={(e) => handleSubmit(e, subscribe)}>
                    <div className='relative'>
                      <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} id='mce-EMAIL' name='EMAIL' className='w-full md:w-[239px] py-[15px] pl-[37px] text-white bg-dark-mode-100 placeholder:text-white focus:outline-none rounded' placeholder='Email' />
                      <span className='text-base font-semibold absolute top-1/2 left-5 transform -translate-x-1/2 -translate-y-1/2'>
                        <IconEmail fill='#006fff' />
                      </span>
                    </div>
                    <button type='submit' className='w-full md:w-[183px] py-[15px] bg-primary-blue hover:bg-dark-blue hover:border text-white text-[13px] font-medium leading-4 rounded'>
                      Get Early Access
                    </button>
                    <div className=''>
                      {status === 'sending' && <div style={{ color: 'blue' }}>sending...</div>}
                      {status === 'error' && <div style={{ color: 'red' }}> {message as string}</div>}
                      {status === 'success' && <div style={{ color: 'green' }}> {message as string}</div>}
                    </div>
                  </form>
                );
              }}
            />
          </div>
          <div className='mt-[30px] md:mt-[43px]'>
            <h1 className='text-[34px] md:text-[37px] leading-[34px] font-semibold text-dark-blue'>
              How it <span className='text-[34px] md:text-[37px] leading-[34px] font-semibold text-primary'>Works</span>
            </h1>
          </div>
          <div className='mt-[34px] px-[27px] flex flex-col gap-[34px] pb-[25px]'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-1'>
              {loanCondit.map((laon, idx) => {
                return (
                  <div className='bg-light-blue-grey py-[54px] flex justify-center items-center px-[41px] flex-col dark:border' key={idx}>
                    <div className='bg-dark-blue rounded-full w-[56px] h-[56px] flex justify-center items-center'>
                      <p className='text-white text-[30px] leading-[34px]'>{idx + 1}</p>
                    </div>
                    <p className='text-[16px] text-center leading-5 font-semibold mt-[23px]'>{laon.title}</p>
                    <p className='text-[14px] text-center leading-5 font-normal mt-2'>{laon.text}</p>
                  </div>
                );
              })}
            </div>
            <div className='pt-[67px] pb-[20px] md:pb-[86px] bg-light-blue-grey flex flex-col rou justify-center items-center px-[36px] md:px-[123px]'>
              <h1 className='text-[34px] md:text-[37px] text-center leading-[40px] md:leading-[38px] text-dark-blue font-semibold'>
                The benefits of
                <br />
                <span className='text-[34px] md:text-[37px] leading-[40px] md:leading-[38px]  text-primary font-semibold'>an NFT Loan</span>
              </h1>
              <div className='mt-[33px] grid grid-cols-1 md:grid-cols-2 gap-[10px]'>
                {loanBenefits.map((item, idx) => {
                  return (
                    <div key={idx} className='bg-white rounded-lg py-8 pl-[21px] pr-[29px] md:pl-[34px] flex gap-4 items-center dark:border'>
                      <div>
                        <img src={item.img.src} className='min-w-[30px] h-[30px] object-contain' />
                      </div>
                      <div className='flex flex-col'>
                        <p className='font-semibold leading-5'>{item.title}</p>
                        <span>{item.text}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* <div className='flex flex-wrap md:flex-nowrap gap-[60px]'>
              <div>
                <h1 className='text-[37px] leading-[34px] font-semibold text-dark-blue'>
                  Common Questions <br />
                  About <span className='text-[37px] leading-[38px] text-primary font-semibold'>NFT Loans</span>
                </h1>
                <div className='w-[499px] h-[280px] mt-[14px]'>
                  <ReactPlayer url={'https://www.youtube.com/watch?v=o8bVGGLTwZw'} width='100%' height='100%' playing muted />
                </div>
                <div className='mt-[17px] max-w-[403px]'>
                  <p className='text-[14px] font-normal leading-[23px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur vulputate neque id interdum. Donec sed odio lorem. Pellentesque at erat non nulla tempus tincidunt. Suspendisse sit amet aug.</p>
                </div>
              </div>
              <div className='flex flex-col gap-[23px]'>
                {nftRules.map((item, idx) => {
                  return (
                    <div className='flex flex-col' key={idx}>
                      <p className='text-[19px] leading-5 font-semibold'>{item.title}</p>
                      <p className='text-[14px] leading-6 mt-4 font-normal'>{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export { BorrowLand };
