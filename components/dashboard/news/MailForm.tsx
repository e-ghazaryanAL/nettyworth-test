import React, { useState } from 'react';

import IconEmail from '../../../assets/icons/icon-email.svg';

interface ICustomForm {
  status: string | null;
  message: string | Error | null;
  onValidated: (formData: { EMAIL: string }) => void;
}

const CustomForm: React.FC<ICustomForm> = ({ status, message, onValidated }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    onValidated({
      EMAIL: email,
    });
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} id='mce-EMAIL' name='EMAIL' className='pl-[44px] text-black w-full focus:outline-none focus:bg-primary-blue text-[11px] bg-light-blue-grey py-2 flex gap-[17px] items-center mb-3 placeholder:text-[11px]' placeholder='Email' />
        <span className='text-base font-semibold absolute top-2 left-[14px]'>
          <IconEmail fill='#006fff' />
        </span>
        {status === 'sending' && <div style={{ color: 'blue' }}>sending...</div>}
        {status === 'error' && <div style={{ color: 'red' }}> {message as string}</div>}
        {status === 'success' && <div style={{ color: 'green' }}> {message as string}</div>}
        <button type='submit' className='text-white mt-[6px] w-full bg-primary-blue uppercase hover:bg-dark-blue target:bg-off-blue rounded focus:border-[#006FFF] py-3 mb-3 text-[11px]'>
          Subscribe
        </button>
      </div>
    </form>
  );
};

export { CustomForm };
