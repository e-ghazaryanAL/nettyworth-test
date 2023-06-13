import { useEffect, useRef, useState } from 'react';

import moment from 'moment';
// import Mailchimp from 'react-mailchimp-subscribe';
import { useRouter } from 'next/router';
import { LinkedinShareButton, FacebookShareButton, TwitterShareButton } from 'react-share';

import { NewsEmail } from './NewsEmail';
import { NewsListButtons } from './NewsListButtons';
import LeftIcon from '../../../assets/icons/icon-arrow-left.svg';
// import   RightIcon  from '../../../assets/icons/icon-arrow-right.svg';
import FacebookIcon from '../../../assets/icons/icon-facebook.svg';
import LinkedinIcon from '../../../assets/icons/icon-linkedin.svg';
import ShareIcon from '../../../assets/icons/icon-share.svg';
import TwitterIcon from '../../../assets/icons/icon-twitter.svg';
// import { CustomForm } from './MailForm';
import { useAppSelector } from '../../../hooks/redux';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { INettyNews } from '../../../redux/news/model';
import { Loader } from '../../Loader';

// const url = 'https://nettyart.us5.list-manage.com/subscribe/post-json?u=231e2a6d374606653a3e22abe&id=0d65199a02&f_id=0062efe6f0&c=jQuery19005687377112970748_1667558282051&amp=&subscribe=Subscribe&_=1667558282052';

interface INewsDetail {
  categoryId: number;
  detail: INettyNews;
}

const NewsDetail = ({ categoryId, detail }: INewsDetail) => {
  const router = useRouter();
  const { slug } = router.query;
  const [copied, setCopied] = useState<boolean>(false);
  const copyRef = useRef<HTMLDivElement>(null);
  const { detailLoading } = useAppSelector((state) => state.news);
  const handleBack = () => {
    router.back();
  };

  const link = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';
  useEffect(() => {}, [slug]);

  const copyHandler = (url: string) => {
    setCopied(true);
    navigator?.clipboard?.writeText(url);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };
  useOnClickOutside(copyRef, () => setCopied(false));

  return (
    <div className='w-full h-full'>
      {' '}
      <div className='col-lg-4 col-sm-9 twitter-container'>
        <div className='blog-sidebar mt-70 rmy-100'>
          <div className='widget widget-recent-post wow fadeInUp delay-0-4s animated' style={{ visibility: 'visible', animationName: 'fadeInUp' }}>
            <div id='twitterScript'></div>
          </div>
        </div>
      </div>
      <div className='bg-white'>
        <NewsListButtons categoryId={categoryId} detail='true' />
      </div>
      {detailLoading ? (
        <div className='flex justify-center'>
          <Loader />
        </div>
      ) : (
        <>
          <div className='bg-white '>
            <div className='flex bg-white gap-3 cursor-pointer items-center pl-8 pt-[13px] max-w-[1300px] 2xl:mx-auto 2xl:pl-0' onClick={handleBack}>
              <LeftIcon fill='#006FFF' className='w-[17px] h-[16px]' />
              <span className='text-lg'>Back to </span>
              <span className='text-lg font-bold'>News</span>
            </div>
            <div className='pt-6 h-[28rem] sm:h-auto bg-white'>
              <div className='px-8 2xl:px-0'>
                <h1 className='text-[40px] text-primary font-bold pt max-w-[1300px] 2xl:mx-auto' dangerouslySetInnerHTML={{ __html: detail?.title.rendered }} />
                <div className='flex pt-3 justify-between max-w-[1168px] 2xl:mx-auto'>
                  <span className='text-sm'>{moment(detail?.date).format('MMMM D YYYY')}</span>
                  <span className='text-sm '>By {detail?.author_info.display_name}</span>
                </div>
              </div>
              <div className='flex flex-col xl:max-w-[1300px] 2xl:mx-auto'>
                <div className='flex-col-reverse lg:flex-row flex justify-between gap-3 pt-[21px] relative px-8 2xl:px-0 xl:mb-[90px]'>
                  <div className='flex-row flex lg:flex-col gap-3 '>
                    <FacebookShareButton url={link} title={detail?.title.rendered}>
                      <FacebookIcon className='w-9 h-9 p-[10px] bg-light-blue-grey' fill='#006FFF' />
                    </FacebookShareButton>
                    <ShareIcon className='w-9  h-9 p-2 bg-light-blue-grey' fill='#006FFF' onClick={() => copyHandler(link)} />
                    <div className={`relative ${copied ? 'inline-block' : 'hidden'}`} ref={copyRef}>
                      <span
                        className={`text-medium after:content-[""] after:border-t-transparent  after:border-l-transparent after:border-r-transparent after:border-b-transparent after:border-t-[#222] after:absolute after:border-[8px] after:ml-[6px] after:-bottom-[39%] after:left-[28px] py-3 font-bold ${
                          copied ? 'opacity-1 visible' : 'opacity-0 invisible'
                        } w-[84px] flex justify-center items-center bg-[#222] text-white rounded-md absolute z-10 transition-all duration-[1s] ease -top-[100px] -left-[84px] ml-[60px]`}
                      >
                        Copied!
                      </span>
                    </div>
                    <TwitterShareButton url={link} title={detail?.title.rendered}>
                      <TwitterIcon className='w-9 h-9 p-[10px] bg-light-blue-grey' fill='#006FFF' />
                    </TwitterShareButton>
                    <LinkedinShareButton url={link} title={detail?.title.rendered}>
                      <LinkedinIcon className='w-9 h-9 p-[10px] bg-light-blue-grey' fill='#006FFF' />
                    </LinkedinShareButton>
                  </div>
                  <div className='w-full h-auto sm:h-[324px] xl:absolute xl:h-[324px] xl:right-[35px] xl:w-[90%] 2xl:right-[42px] 2xl:w-[93%]'>
                    <img src={detail?.featured_image_src} alt='' className='w-full sm:h-[324px] lg:h-[324px] object-cover rounded' />
                  </div>
                </div>
              </div>
              <div className='bg-light-blue-grey w-full px-8 border-t-2'>
                <div className='flex pb-20 sm:pb-8 flex-col xl:pr-0 gap-10 lg:pl-12 md:pr-8 lg:flex-row lg:flex bg-light-blue-grey xl:max-w-[1300px] xl:mt-[60px] 2xl:mx-auto news_detail 2xl:pl-12'>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: detail?.content.rendered,
                    }}
                    className='news_article'
                  ></div>
                  <NewsEmail />
                  {/* <div className='flex flex-col gap-0 pb-32 md:pb-6  lg:pb-0 '>
                <div className='sm:flex flex-col justify-center lg:block m-auto  sm:m-0'>
                  <span className='text-[11px] '>ADVERTISERS</span>
                  <img src='/profile.jpg' alt='' className='w-full min-h-[400px] lg:w-72 object-cover lg:h-[588px] pt-2' />
                </div>
                <div className='sm:flex flex-row items-center gap-5 lg:block m-auto  sm:m-0'>
                  <div className='w-full m-auto  pb-4 sm:pb-20 lg:pb-4'>
                    <div className='pt-0 mt-8 mb-6'>
                      <span className='text-lg font-semibold '>Recent </span>
                      <span className='text-lg font-semibold text-primary'>News</span>
                    </div>
                  <div className='flex gap-4  flex-col'>
                    {recentNews.map((el: any, idx: any) => {
                      return (
                        <div key={idx} className={`flex gap-4 items-center ${idx !== 2 ? 'border-b-[#DFE3EE] border-b-2' : null} pb-3`}>
                          <img src={'/static/media/newpic.540411b58a513ed2b64b.jpg'} alt='' className='w-16 h-16 rounded object-cover' />
                          <div className='flex flex-col'>
                            <span className='text-sm'>{el.title}</span>
                            <button onClick={() => handleNavigateDetails(el.id)} className='w-fit flex items-center gap-2'>
                              <span className='text-sm text-primary font-medium'>Read </span>
                              <span className='text-2xl text-primary font-medium'>
                                <RightIcon fill='#006fff' />
                              </span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className='w-full lg:w-72 bg-white flex flex-col border-[1px]  border-solid rounded mx-auto mt-4 pt-5 pr-5 pl-4 gap-[5px] sm:m-0'>
                    <span className='text-[22px] font-medium text-primary leading-[26px]'>Subscribe to the Netty Newsletter</span>
                    <span className='leading-[17px] mb-5'>Get the latest NFT News, Sales, Rarity, and Upcoming Sales</span>
                    <div className='relative'>
                      <Mailchimp url={url} render={({ subscribe, status, message }) => <CustomForm status={status} message={message} onValidated={(formData: any) => subscribe(formData)} />} />
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export { NewsDetail };
