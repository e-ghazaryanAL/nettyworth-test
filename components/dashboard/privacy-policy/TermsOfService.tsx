import { content } from '../../../mock_database/termsContent';

const TermsOfService = () => {
  return (
    <>
      <div className='pt-4 px-4 flex flex-col gap-3 pb-12 bg-white border-b-light-blue-gray border-b-2 sm:pl-[106px] sm:pr-[153px]'>
        <h2 className='text-[40px] text-dark-blue leading-[52px] font-bold'>TERMS OF SERVICE</h2>
        <div className='flex flex-col gap-5'>
          <span className='text-[22px] leading-9 text-dark-blue font-medium'>Last updated: August 19, 2022</span>
          <span className='text-[22px] leading-9 text-dark-blue font-medium'>
            <p>
              Please read these Terms of Service (the “Terms”) and our Privacy Policy (“
              <a href='https://nettyworth.io/privacy-policy/' data-wpel-link='internal'>
                Privacy Policy
              </a>
              ”) carefully because they govern your use of the website located at Nettyart.io. (the “Site”) and services, such as content, accessible via the Site offered by NettyWorth (“NettyWorth”).
            </p>
          </span>
        </div>
      </div>
      <div className='flex flex-col gap-3 px-4 sm:pl-[106px] sm:pr-[153px] pt-[60px] pb-[50px]'>
        <span className='text-[20px] leading-8 text-dark-blue mb-12'>
          IMPORTANT NOTICE REGARDING ARBITRATION FOR U.S. CUSTOMERS: WHEN <br /> YOU AGREE TO THESE TERMS YOU ARE AGREEING (WITH LIMITED <br /> EXCEPTION) TO RESOLVE ANY DISPUTE BETWEEN YOU AND NETTYWORTH <br /> THROUGH BINDING, INDIVIDUAL ARBITRATION RATHER THAN IN COURT.
        </span>
        <div className='mb-[38px]'>
          <div className='flex max-w-[783px] flex-col gap-7 lg:max-w-max'>
            {content.map((el, idx) => {
              return (
                <div key={idx} className='flex gap-4 items-start'>
                  <div className='w-[12px] min-w-[12px] aspect-[1] rounded-full border-[4px] border-primary mt-[6px]'></div>
                  <span className='text-base' dangerouslySetInnerHTML={{ __html: el.title }}></span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export { TermsOfService };
