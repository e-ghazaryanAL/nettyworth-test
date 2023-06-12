import { useEffect } from 'react';

import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import bayc from '../../../assets/homeImages/bayc.png';
import proof from '../../../assets/homeImages/brand.png';
import calendar from '../../../assets/homeImages/calendar.png';
import crypto from '../../../assets/homeImages/cyrpto.png';
import details from '../../../assets/homeImages/detail.png';
import doodle from '../../../assets/homeImages/doodle.png';
import mobile from '../../../assets/homeImages/mobile.png';
import nftDetail from '../../../assets/homeImages/nft-detail.png';
import portfolioFirst from '../../../assets/homeImages/portfolio-1.png';
import portfolioChart from '../../../assets/homeImages/portfolio-chart.png';
import portfolio from '../../../assets/homeImages/portfolio-new.png';
import portfolioPage from '../../../assets/homeImages/portfolio-page.png';
import tablet from '../../../assets/homeImages/tablet.png';
import time from '../../../assets/homeImages/time.png';
import topSales from '../../../assets/homeImages/top-sales-new.png';
import value from '../../../assets/homeImages/value.png';
import wow from '../../../assets/homeImages/wow.png';
import RightIcon from '../../../assets/icons/icon-arrow-right.svg';
import baycDark from '../../../assets/images/BAYC-light.png';
import { homeFeedback } from '../../../constant';
// import nftMonkey from '../../../assets/homeImages/nft-monkey.png';
// import nftRobot from '../../../assets/homeImages/nft-robot.png';
import 'animate.css/animate.min.css';
import { useTheme } from '../../../hooks/useTheme';
// const nftLoanCard = [
//   {
//     title: 'Loan 10 ETH',
//     price: 'APR 20%',
//     date: 'Due Date 2.3.2023',
//     imgUrl: nftMonkey,
//   },
//   {
//     title: 'Loan 10 ETH',
//     price: 'APR 20%',
//     date: 'Due Date 2.3.2023',
//     imgUrl: nftRobot,
//   },
// ];

const MainPage = () => {
  const pathname = usePathname();
  const { mode } = useTheme();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.style.overflowX = 'hidden';
      window.scrollTo(0, 0);
    }

    return () => {
      document.body.style.overflowX = 'auto';
    };
  }, [pathname]);

  return (
    <>
      <div className='lg:pt-0 flex items-center flex-col pb-8 sm:pb-0'>
        <div className='flex w-full lg:pr-[50px] pt-5 md:pt-[57px] md:mb-0 pl-[34px] md:pl-[87px] lg:pl-[34px] flex-col max-w-[1366px] lg:pt-0 pr-10 md:pr-0 h-full max-h-[761px] pb-[205px] sm:pb-[14px] overflow-hidden md:overflow-visible md:pb-0 min-h-[590px] sm:justify-around items-center lg:gap-[50px] lg:flex-row homeGeneral'>
          <div className='max-w-[533px] md:ml-20 lg:ml-0 items-center md:items-start flex flex-col gap-[14px]'>
            <p className='text-[28px] text-center md:text-left leading-8 md:text-[40px] md:leading-[46px] font-bold text-dark-blue w-full'>
              <span className='text-center text-[28px] leading-8 md:text-[40px] md:leading-[46px] font-bold text-primary'>View</span> Your <span className='text-[28px] leading-8 md:text-[40px] md:leading-[46px] font-bold text-primary'>Total</span> Crypto <br />& <span className='text-center text-[28px] leading-8 md:text-[40px] md:leading-[46px] font-bold text-primary'>NFT Value</span> Today!
            </p>
            <p className='text-center font-medium text-lg leading-[26px] md:text-left md:text-[22px] md:leading-9 text-dark-blue'>Portfolio, News, Sales, and Drops in one Dashboard.</p>
            <div className='flex mt-1 flex-col md:flex-row md:gap-6 w-full items-center'>
              <Link href='/portfolio' className='border-[3px] max-w-[221px] text-md text-dark-blue w-full hover:bg-primary-blue hover:text-white target:bg-off-blue border-primary rounded h-[49px] flex justify-center items-center'>
                View Your NFT Portfolio
              </Link>
              <Link href='/portfolio' className='bg-primary-blue my-3 text-md text-white w-full hover:bg-dark-blue hover:text-white target:bg-off-blue max-w-[221px] md:max-w-[200px] rounded h-[49px] hidden md:flex justify-center items-center'>
                Connect Wallet
              </Link>
            </div>
          </div>
          <div className='relative max-w-[240px] sm:max-w-[540px]'>
            <img src={tablet.src} className='max-h-[500px] opacity-0 md:opacity-[1]' loading='lazy' />
            <img src={mobile.src} className='absolute top-8 sm:left-8 sm:pl-[5.5rem] md:pl-0 md:top-[115px] md:-left-[43px] max-h-[577px] md:max-h-[92%]' loading='lazy' />
          </div>
        </div>
        <div className='md:mt-[99px] bg-primary pt-14 md:pt-[53px] pb-[80px] md:pb-[99px] w-full flex flex-col justify-center items-center dark:border-y'>
          <h6 className='text-[24px] md:text-[32px] font-medium text-dark-blue leading-[29px] md:leading-[38px] text-center'>
            Where collectors manage their <br />
            <span className='text-primary text-[24px] md:text-[32px] md:leading-[38px] font-medium'>digital assets</span>
          </h6>
          <div className='flex flex-col md:flex-row justify-center items-center gap-12 mt-10'>
            <img src={mode === 'light' ? bayc.src : baycDark.src} alt='bayc' className='w-[290px] h-[70px] object-contain' loading='lazy' />
            <img src={doodle.src} alt='doodle' className='w-[290px] h-[70px] object-contain' loading='lazy' />
            <img src={proof.src} alt='proof' className='w-[290px] h-[70px] object-contain' loading='lazy' />
            <img src={wow.src} alt='wow' className='w-[290px] h-[70px] object-cover' loading='lazy' />
          </div>
          <section className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-[17px] mt-[79px]'>
            {homeFeedback.map((item) => {
              return (
                <div key={item.name} className='bg-white rounded-lg px-6 pt-7 pb-[65px] md:pb-[26px]  w-[349px] md:w-[463px] dark:border'>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-[9px]'>
                      <Image alt={item.name} src={item.img} width={45} height={45} />
                      <p className='font-normal text-[18px] leading-[48px] text-dark-blue'>{item.name}</p>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faTwitter} className='w-[21px] h-[17px] text-light-blue' />
                    </div>
                  </div>
                  <p className='mt-[18px] font-normal text-[16px] leading-6 md:text-[18px] md:leading-7 text-dark-blue' dangerouslySetInnerHTML={{ __html: item.text }} />
                </div>
              );
            })}
          </section>
        </div>
        <div className='mb-[51px] pt-9 lg:pt-0 gap-4 md:gap-0 flex w-full lg:pr-[50px] pl-[30px] flex-col pr-14 sm:pr-0 max-w-[1366px] h-full max-h-[761px] md:mb-[100px] min-h-[590px] sm:justify-around sm:items-center lg:gap-[50px] lg:flex-row lg:mb-5'>
          <div className='relative max-w-[75vw] sm:max-w-[567px] lg:max-w-max h-max w-max mt-[66px]'>
            <img src={portfolioPage.src} className='max-h-[500px]' loading='lazy' />
            <img src={portfolioChart.src} className='h-full absolute top-[-49px] md:top-[-59px] right-[-6px] flex justify-end max-h-[85%] md:max-h-[75%] md:aspect-[4/2] object-cover' loading='lazy' />
            <div className='absolute max-w-[30vw] right-[-15%] gap-3 sm:max-w-[45%] flex flex-col md:gap-[17px] top-[-24px] sm:-right-[25px] md:-right-[50px] dark-primary'>
              <img src={portfolioFirst.src} />
              <img src={value.src} />
              <img src={crypto.src} />
            </div>
          </div>
          <div className='sm:max-w-[565px] md:max-w-[574px] lg:max-w-[545px] pt-5 lg:pt-0 flex flex-col gap-2 lg:pl-[50px]'>
            <div className='flex gap-2'>
              <span className='text-[34px] leadin-[48px] text-dark-blue'>NFT</span>
              <span className='text-[34px] leadin-[48px] text-primary'>Portfolio</span>
            </div>
            <div>
              <span className='text-lg leading-[30px] text-dark-blu'>Track your Web3 NettyWorth. One dashboard that keeps you updated on trending news, top sales, upcoming drops, and the ability to view your total crypto and NFT value.</span>
            </div>
            <div className='w-full md:mt-4'>
              <Link href='/' className='text-dark-blue gap-[22px] homeBtn hover:bg-primary-blue hover:text-white target:bg-off-blue flex justify-center items-center rounded w-full max-w-[160px] h-[49px] border-[3px] border-primary'>
                Learn More <RightIcon fill='#006fff' />
              </Link>
            </div>
          </div>
        </div>

        <hr className='h-[2px] bg-mid-blue-grey w-full mb-[55px] md:mb-0'></hr>
        <div className='flex overflow-hidden lg:overflow-visible w-full gap-[8.5rem] lg:pr-[50px] pl-[30px] flex-col-reverse max-w-[1366px] md:pt-[77px] h-full max-h-[761px] pb-[52px] md:mb-[43px] min-h-[590px] sm:justify-around sm:items-center lg:items-start lg:pt-[103px] sm:gap-[100px] md:gap-[33px] lg:flex-row'>
          <div className='pr-[41px] md:pr-0 sm:max-w-[574px] lg:max-w-[541px] flex flex-col gap-2'>
            <div className='flex gap-2'>
              <span className='text-[34px] leadin-[48px] text-dark-blue'>NFT</span>
              <span className='text-[34px] leadin-[48px] text-primary'>Top Sales</span>
            </div>
            <div>
              <span className='leading-[31px] text-lg md:leading-9 text-dark-blue'>Discover the latest NFT tops sales, including blue chip NFTs like Cryptopunks, Bored Apes, and some of the most expensive NFT collections, including mid-cap and small-cap NFTs.</span>
            </div>
            <div className='w-full md:mt-4'>
              <Link href='/nft-top-sales' className='text-dark-blue gap-[22px] homeBtn hover:bg-primary-blue hover:text-white target:bg-off-blue flex justify-center items-center rounded w-full max-w-[160px] h-[49px] border-[3px] border-primary'>
                Learn More <RightIcon fill='#006fff' />
              </Link>
            </div>
          </div>
          <div className='relative max-w-[94%] sm:max-w-[723px] lg:max-w-max h-max w-max lg:min-w-[400px] lg:min-h-[309px]'>
            <img src={topSales.src} className='max-h-[294px] sm:max-h-[356px] lg:max-h-[444px]' />
            <div className='absolute -bottom-[94px] sm:-bottom-[70px] w-[186%] sm:w-[143%] lg:right-0 md:bottom-0 md:w-[128%]'>
              <img src={portfolio.src} className='w-full h-full max-h-[45%] max-w-[228%]' />
            </div>
          </div>
        </div>
        <hr className='h-[2px] bg-mid-blue-grey w-full' />
        <div className='flex w-full pl-[30px] sm:items-center flex-col mt-[55px] gap-9 max-w-[1366px] h-full max-h-[761px] mb-[55px] md:mt-[30px] min-h-[590px] sm:justify-around pr-0 sm:pr-10 lg:pr-0 lg:gap-[50px] lg:flex-row md:items-center xl:gap-0'>
          <div className='relative max-w-[90%] sm:max-w-[542px] lg:max-w-max h-max w-max'>
            <img src={calendar.src} className='max-h-[510px]' loading='lazy' />
            <img src={time.src} className='max-h-[96px] absolute top-[50%] right-4 sm:right-unset left-4' loading='lazy' />
          </div>
          <div className='sm:max-w-[544px] lg:max-w-[557px] flex flex-col gap-2 pr-[41px]'>
            <div className='flex gap-2'>
              <span className='text-[34px] leadin-[48px] text-dark-blue'>NFT</span>
              <span className='text-[34px] leadin-[48px] text-primary'>Calendar</span>
            </div>
            <div>
              <span className='leading-[31px] text-lg md:leading-9 text-dark-blue'>Get the latest upcoming NFT projects for Ethereum, Solana, and Cardano. Never miss an NFT drop or Free NFT mint again.</span>
            </div>
            <div className='w-full md:mt-4'>
              <Link href='/upcoming-Ethereum-nft-launches' className='text-dark-blue gap-[22px] homeBtn hover:bg-primary-blue hover:text-white target:bg-off-blue flex justify-center items-center rounded w-full max-w-[160px] h-[49px] border-[3px] border-primary'>
                Learn More <RightIcon fill='#006fff' />
              </Link>
            </div>
          </div>
        </div>
        <hr className='h-[2px] bg-mid-blue-grey w-full' />
        <div className='flex w-full gap-[4.75rem] sm:gap-7 mb-[58px] md:pl-[29px] items-center overflow-y-hidden sm:overflow-visible lg:pr-[50px] flex-col-reverse max-w-[1366px] h-full max-h-[761px] sm:mb-[137px] min-h-[590px] sm:justify-around md:items-center md:pt-[200px] lg:gap-[50px] lg:flex-row sm:pb-[240px] lg:pb-0 lg:mb-0 lg:pt-[85px]'>
          <div className='pl-[30px] pr-[41px] sm:pl-0 sm:max-w-[569px] lg:max-w-[494px] flex flex-col gap-2 mt-80 md:mt-10 lg:mt-0'>
            <div className='flex gap-2'>
              <span className='text-[34px] leadin-[48px] text-dark-blue'>NFT</span>
              <span className='text-[34px] leadin-[48px] text-primary'>Collections</span>
            </div>
            <div>
              <span className='leading-[31px] text-lg md:leading-9 text-dark-blue'>View multiple sales data points, social media sentiments, and NFT rarity. Access the information you need to buy and trade NFTs.</span>
            </div>
            <div className='w-full md:mt-4'>
              <Link href='/nft-top-sales' className='text-dark-blue gap-[22px] homeBtn hover:bg-primary-blue hover:text-white target:bg-off-blue flex justify-center items-center rounded w-full max-w-[160px] h-[49px] border-[3px] border-primary'>
                Learn More <RightIcon fill='#006fff' />
              </Link>
            </div>
          </div>
          <div className='flex justify-center lg:block relative w-full md:max-w-[75vw] pt-[259px] sm:pt-[178px] md:pt-0 sm:max-w-[567px] lg:max-w-max h-max mt-[66px] max-h-[474px] md:max-h-max top-[115px] lg:mt-0 lg:top-0 sm:pb-[200px]'>
            <img src={nftDetail.src} className='h-full max-h-[477px] max-w-[574px] overflow-hidden md:overflow-auto' />
            <img src={details.src} className='h-full absolute top-[63%] sm:top-[59%] flex justify-center items-center sm:block sm:pl-[7%] md:top-[16%] md:pl-[5%] lg:pl-[25%] sm:w-auto object-cover object-left max-h-[86%] sm:max-w-[89%] md:max-h-[70%] lg:max-h-[78%]' />
          </div>
        </div>
        {/* <hr className='h-[2px] bg-mid-blue-grey w-full' />
        <div className='mt-[141px]'>
          <div className='flex w-full pl-[30px] sm:items-center flex-col mt-[55px] gap-9 max-w-[1366px] h-full max-h-[761px] mb-[55px] md:mt-[30px] min-h-[590px] sm:justify-around pr-0 sm:pr-10 lg:pr-0 lg:gap-[50px] lg:flex-row md:items-center xl:gap-[67px]'>
            <div className='flex flex-wrap justify-center xl:justify-start gap-6'>
              {nftLoanCard.map((nft) => {
                return (
                  <div className='border rounded px-3 pt-[11px] '>
                    <div>
                      <img src={nft.imgUrl} alt='img' />
                    </div>
                    <div className='my-[22px]'>
                      <p className='text-dark-blue text-[23px] font-medium'>{nft.title}</p>
                      <p className='text-dark-blue-100 text-[19px] font-medium'>{nft.price}</p>
                      <p className='text-dark-blue-100 text-[19px] font-medium'> {nft.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className='sm:max-w-[544px] lg:max-w-[557px] flex flex-col gap-2 pr-[41px]'>
              <div className='flex gap-2'>
                <span className='text-[34px] leadin-[48px] font-medium text-dark-blue'>NFT</span>
                <span className='text-[34px] leadin-[48px] font-medium text-primary'>Loans</span>
              </div>
              <div>
                <span className='leading-[31px] text-lg md:leading-9 text-dark-blue'>Access the liquidity you need, lend or borrow against valuable NFT assets in our peer-to-peer NFT lending platform.</span>
              </div>
              <div className='w-full md:mt-4'>
                <Link to='/' className='text-dark-blue gap-[22px] homeBtn hover:bg-primary-blue hover:text-white target:bg-off-blue flex justify-center items-center rounded w-full max-w-[160px] h-[49px] border-[3px] border-primary'>
                  Learn More <RightIcon fill='#006fff' />
                </Link>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default MainPage;
