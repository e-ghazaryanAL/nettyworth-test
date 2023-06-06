import { useState } from 'react';

import EmailIcon from '../../assets/icons/icon-email.svg';

const FooterMailForm = ({ status, message, onValidated }: any) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onValidated({
      EMAIL: email,
    });

    event.currentTarget.reset();
  };

  return (
    <form className='flex items-center mt-1 pt-0.5 flex-col gap-3 xl:flex-row' onSubmit={handleSubmit}>
      <div className='relative'>
        <input
          type='text'
          placeholder='Email'
          className='xl:max-w-[286px] rounded-sm h-[60px] pl-11 block input-field w-full pt-[0.9rem] pb-[0.8rem] bg-[#0D1A3A] placeholder:text-white px-7 text-sm text-input hover:bg-mid-blue-grey hover:border-btn-disabled hover:text-dark-blue focus:bg-primary-blue duration-200 focus:border-primary focus:text-white focus:outline-none dark:pl-[58px]'
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className='absolute top-0 left-0 bottom-0 px-5 flex items-center icon'>
          <EmailIcon fill='currentColor' className='h-[18px] w-[18px]' />
        </button>
      </div>
      <div className='flex flex-col'>
        {status === 'error' && <div className='text-red-500' dangerouslySetInnerHTML={{ __html: message }} />}
        {status === 'success' && <div style={{ color: 'green' }} dangerouslySetInnerHTML={{ __html: message }} />}
      </div>
      <button className='xl:max-w-[148px] rounded-sm h-[60px] flex-1 bg-primary-blue text-white hover:bg-dark-blue py-[0.9rem] flex justify-center items-center w-full text-sm font-medium duration-200 hover:text-white focus:text-white focus:bg-off-blue focus:border-off-blue disabled:bg-btn-disabled disabled:text-btn-disabled disabled:border-btn-disabled '>Subscribe</button>
    </form>
  );
};

export default FooterMailForm;
