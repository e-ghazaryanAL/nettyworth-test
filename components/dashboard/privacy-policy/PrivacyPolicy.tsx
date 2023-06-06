import { data, dots, category, ccpa, requestDots } from '../../../mock_database/privacyContent';

const PrivacyPolicy = () => {
  return (
    <>
      <div className='pt-4 px-9 privacy flex flex-col gap-3 pb-12 bg-white border-b-light-blue-gray border-b-2 md:pl-[106px] md:pr-[153px]'>
        <h2 className='text-[40px] text-dark-blue leading-[52px] font-bold'>Privacy Policy</h2>
        <div className='flex flex-col gap-5'>
          <span className='text-[22px] leading-9 text-dark-blue font-medium'>Last updated: November 01, 2020</span>
          <span className='text-[22px] leading-9 text-dark-blue font-medium'>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</span>
          <span className='text-[22px] leading-9 text-dark-blue font-medium'>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.</span>
          <span className='text-[22px] leading-9 text-dark-blue font-medium'>Interpretation and Definitions</span>
        </div>
      </div>
      <div className='px-0 flex flex-col gap-3 md:pl-[106px] md:pr-[153px] pt-[60px]'>
        <span className='text-[20px] leading-8 text-dark-blue mb-12'>Interpretation and Definitions</span>
        <div className='mb-[38px]'>
          <div className='flex max-w-[783px] flex-col gap-7 lg:max-w-max'>
            {data.map((el, idx) => {
              return (
                <div key={idx} className='flex gap-4 items-start w-full'>
                  <div className='w-[12px] min-w-[12px] aspect-[1] rounded-full border-[4px] border-primary mt-[6px]'></div>
                  <span className='text-base max-w-[100%]' dangerouslySetInnerHTML={{ __html: el.title }} />
                </div>
              );
            })}
            <div className='flex gap-4 items-start'>
              <div className='w-[12px] min-w-[12px] aspect-[1] rounded-full'></div>
              <span className='flex flex-col gap-1 text-base'>
                <strong>Tracking Technologies and Cookies</strong>
                <span className='text-base max-w-[100%]'>We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:</span>
              </span>
            </div>
            {dots.map((el, idx) => {
              return (
                <div key={idx} className='flex gap-4 items-start'>
                  <span className='text-base max-w-[100%]' dangerouslySetInnerHTML={{ __html: el.title }} />
                </div>
              );
            })}
            <div className='flex gap-4 items-start'>
              <div className='w-[12px] min-w-[12px] aspect-[1] rounded-full'></div>
              <span className='flex flex-col gap-1 text-base'>
                <strong>Sale of Personal Information</strong>
                <span className='text-base max-w-[100%]'>
                  As defined in the CCPA, “sell” and “sale” mean selling, renting, releasing, disclosing, disseminating, making available, transferring, or otherwise communicating orally, in writing, or by electronic or other means, a consumer’s personal information by the business to a third party for valuable consideration. This means that We may have received some kind of benefit in return for
                  sharing personal Information, but not necessarily a monetary benefit.
                </span>
                <br />
                <span className='text-base max-w-[100%]'>
                  Please note that the categories listed below are those defined in the CCPA. This does not mean that all examples of that category of personal information were in fact sold, but reflects our good faith belief to the best of our knowledge that some of that information from the applicable category may be and may have been shared for value in return. <br />
                  We may sell and may have sold in the last twelve (12) months the following categories of personal information:
                </span>
              </span>
            </div>
            {category.map((el, idx) => {
              return (
                <div key={idx} className='flex gap-4 items-start'>
                  <div className='w-[12px] min-w-[12px] aspect-[1] rounded-full border-[4px] border-primary mt-[6px]'></div>
                  <span className='text-base max-w-[100%]' dangerouslySetInnerHTML={{ __html: el.title }} />
                </div>
              );
            })}
            <div className='flex gap-4 items-start'>
              <div className='w-[12px] min-w-[12px] aspect-[1] rounded-full'></div>
              <span className='flex flex-col gap-1 text-base'>
                <strong>Your Rights under the CCPA</strong>
                <span className='text-base max-w-[100%]'>The CCPA provides California residents with specific rights regarding their personal information. If You are a resident of California, You have the following rights:</span>
                <br />
              </span>
            </div>
            {ccpa.map((el, idx) => {
              return (
                <div key={idx} className='flex gap-4 items-start'>
                  <div className='w-[12px] min-w-[12px] aspect-[1] rounded-full border-[4px] border-primary mt-[6px]'></div>
                  <span className='text-base max-w-[100%]' dangerouslySetInnerHTML={{ __html: el.title }} />
                </div>
              );
            })}
            <div>
              <span className='text-base max-w-[100%]'>
                <strong>Your request to Us must:</strong>
              </span>
            </div>
            {requestDots.map((el, idx) => {
              return (
                <div key={idx} className='flex gap-4 items-start'>
                  <div className='w-[12px] min-w-[12px] aspect-[1] rounded-full border-[4px] border-primary mt-[6px]'></div>
                  <span className='text-base max-w-[100%]' dangerouslySetInnerHTML={{ __html: el.title }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export { PrivacyPolicy };
