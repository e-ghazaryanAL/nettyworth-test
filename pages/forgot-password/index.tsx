import React, { ReactElement, useState } from 'react';

import { faFingerprint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { forgotPassword } from '../../api/api';
import FormSubmittedModal from '../../components/dashboard/upcoming-nfts/upcoming-form/FormSuccesModal';
import { LoginLayout } from '../../components/layouts-and-navs/landing/LoginLayout';
import { PublicRoute } from '../../utils/auth';
import { validateEmail } from '../../utils/helper';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [validationErr, setValidateError] = useState('');
  const [isOpen, setIsopen] = useState(false);
  const [mess, setMess] = useState({ err: '', success: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!validateEmail(e.target.value)) {
      setValidateError('Email address should be valid');
    } else {
      setValidateError('');
    }
    setEmail(e.target.value);
  };

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validationErr) return;
    setIsopen(true);
    try {
      const res = await forgotPassword({
        email,
      });
      setMess({ err: '', success: res.message });
    } catch (err) {
      setMess({ err: 'Oops something went wrong', success: '' });
    }
  };

  return (
    <div className='pt-[43px] pl-[33px] pr-[42px] pb-[60px] max-w-[385px] h-full'>
      <form onSubmit={handleReset}>
        <FormSubmittedModal onClose={() => setIsopen(false)} message={mess} isOpen={isOpen} />
        <div className='pr-8'>
          <span className='text-dark-blue text-xs'>Please enter your email address. You will receive an email with instructions on resetting your password.</span>
        </div>
        <div className='flex flex-col gap-2 mt-[17px]'>
          <div className='relative w-full h-[50px]'>
            <input type='email' onChange={handleChange} className='bg-primary-grey w-full h-[50px] border-[1px] border-input rounded placeholder:text-sm placeholder:text-[#465272] pl-12' placeholder='Email' />
            <FontAwesomeIcon icon={faFingerprint} className='absolute left-[15px] top-[17px] w-[18px] h-[18px] text-primary' />
          </div>
          {validationErr && <span className='text-red-400'>{validationErr}</span>}
        </div>
        <div className='mt-[19px] flex items-center flex-col gap-4'>
          <button className='bg-primary-blue focus:bg-off-blue hover:bg-dark-blue flex items-center justify-center w-full h-[50px] rounded text-white'>Reset Password</button>
        </div>
      </form>
    </div>
  );
};

ForgotPassword.getLayout = (page: ReactElement) => <LoginLayout label={['RESET']}>{page}</LoginLayout>;

export const getServerSideProps = PublicRoute;

export default ForgotPassword;
