import { useState } from 'react';

import IconEmail from '../../../assets/icons/icon-email.svg';

type CustomFormProps = {
  status: string | null;
  message: string | Error | null;
  onValidated: (formData: { EMAIL: string }) => void;
};
const CustomForm: React.FC<CustomFormProps> = ({ status, message, onValidated }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    onValidated({
      EMAIL: email,
    });
    setEmail('');
  };
  return (
    <form onSubmit={handleSubmit} className='w-full'>
      <div className='relative w-full'>
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} id='mce-EMAIL' name='EMAIL' className='h-9 pl-[44px] text-black w-full focus:outline-none focus:bg-primary-blue text-[11px] focus:text-white focus:placeholder:text-white bg-light-blue-grey py-2 flex gap-[17px] items-center mb-3 placeholder:text-[11px] placeholder:text-dark-blue' placeholder='Email' />
        <span className='text-base font-semibold absolute top-[0.65rem] left-[14px]'>
          <IconEmail fill='#006fff' />
        </span>
        {status === 'sending' && <div style={{ color: 'blue' }}>sending...</div>}
        {status === 'error' && <div style={{ color: 'red' }}> {message as string}</div>}
        {status === 'success' && <div style={{ color: 'green' }}> {message as string}</div>}
        <button type='submit' className='h-10 font-medium  text-white mt-[6px] w-full bg-primary-blue hover:bg-dark-blue target:bg-off-blue rounded focus:border-[#006FFF] pb-3 pt-2 mb-3 text-sm'>
          Get Early Access
        </button>
      </div>
    </form>
  );
};

export { CustomForm };
