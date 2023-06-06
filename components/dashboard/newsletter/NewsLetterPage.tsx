import MailchimpSubscribe from 'react-mailchimp-subscribe';

import { NewsLetterForm } from './NewsLetterForm';

const url = 'https://nettyart.us5.list-manage.com/subscribe/post-json?u=231e2a6d374606653a3e22abe&id=0d65199a02&f_id=0062efe6f0&c=jQuery19005687377112970748_1667558282051&amp=&subscribe=Subscribe&_=1667558282052';
const NewsLetterPage = () => {
  return (
    <div className='h-full w-full flex justify-center pt-5 pb-20 md:pb-8 bg-white'>
      <div className='flex flex-col gap-8'>
        <h2 className='text-base font-bold'>Recieve Updates from NettyWorth right in your inbox!</h2>
        <MailchimpSubscribe url={url} render={({ subscribe, status, message }) => <NewsLetterForm status={status} message={message} onValidated={(formData: any) => subscribe(formData)} />} />
      </div>
    </div>
  );
};

export default NewsLetterPage;
