import { useState } from 'react';

import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn } from 'next-auth/react';

import { StepPropsType } from './model';
import AccountIcon from '../../assets/icons/icon-account.svg';
import Email from '../../assets/icons/icon-email.svg';
import { validatePassword } from '../../utils/helper';

const FormStep: React.FC<StepPropsType> = ({ nextStep }) => {
  const [values, setValues] = useState({ username: '', email: '', pwd: '', confirmPwd: '' });
  const [regErr, setRegErr] = useState('');
  const [validateErr, setValidateError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (regErr) {
      setRegErr('');
    }
    if (e.target.name === 'pwd') {
      if (!validatePassword(e.target.value)) {
        setValidateError('Password must contain at least 12 characters, including uppercase, lowercase, symbol and number');
      } else {
        setValidateError('');
      }
    }
    if (e.target.name === 'confirmPwd') {
      if (e.target.value !== values.pwd) {
        setValidateError("The password confirmation doesn't match");
      } else {
        setValidateError('');
      }
    }
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (regErr || validateErr) return;
      const token = await signIn('signup', {
        ...values,
        redirect: false,
      });
      if (token?.error) {
        const errorMessage = token.error === 'AxiosError: Request failed with status code 409' ? `An account with Email ${values.email} already exists.` : 'Registration Failed please try again';
        setRegErr(errorMessage);
      } else {
        setRegErr('');
        nextStep();
      }
    } catch (e) {
      setRegErr('Something went wrong please try again');
    }
  };
  return (
    <div className='py-[65px]'>
      <form onSubmit={handleRegister}>
        <div className='flex flex-col gap-[18px]'>
          <div className='relative w-full h-[50px]'>
            <input type='text' value={values.username} required onChange={handleChange} className='bg-primary-grey w-full h-[50px] border border-lighter-gray-300 rounded placeholder:text-sm placeholder:text-[#465272] pl-12' placeholder='Username' name='username' />
            <AccountIcon className='absolute left-[15px] top-[17px] w-[20px] h-[20px] text-primary' />
          </div>
          <div className='relative w-full h-[50px]'>
            <input type='email' value={values.email} required onChange={handleChange} className='bg-primary-grey w-full h-[50px] border border-lighter-gray-300 rounded placeholder:text-sm placeholder:text-[#465272] pl-12' placeholder='Email' name='email' />
            <Email className='absolute left-[15px] top-[17px] w-[18px] h-[18px] ' fill='#006fff' />
          </div>
          <div className='relative w-full h-[50px]'>
            <input type='text' value={values.pwd} required onChange={handleChange} className='bg-primary-grey w-full h-[50px] border border-lighter-gray-300 rounded placeholder:text-sm placeholder:text-[#465272] pl-12' placeholder='Password' name='pwd' />
            <FontAwesomeIcon icon={faLock} className='absolute left-[15px] top-[17px] w-[18px] h-[18px] text-primary' />
          </div>
          <div className='relative w-full h-[50px]'>
            <input type='text' value={values.confirmPwd} required onChange={handleChange} className='bg-primary-grey w-full h-[50px] border-[1px] border-input rounded placeholder:text-sm placeholder:text-[#465272] pl-12' placeholder='Confirm Password' name='confirmPwd' />
            <FontAwesomeIcon icon={faLock} className='absolute left-[15px] top-[17px] w-[18px] h-[18px] text-primary' />
          </div>
          {validateErr && <span className='text-red-400'>{validateErr}</span>}
        </div>
        <div className='mt-[19px] flex items-center flex-col gap-4'>
          <button className={`bg-primary-blue focus:bg-off-blue ${validateErr ? 'bg-off-blue' : ''} hover:bg-dark-blue  flex items-center justify-center w-full h-[50px] rounded text-white`}>REGISTER</button>
        </div>
        {regErr && <span className='text-red-400'>{regErr}</span>}
      </form>
      <div className='mt-6 text-center'>
        <span className='text-sm leading-[23px] text-dark-blue'>
          By creating an account, you agree to NettyWorth's{' '}
          <a href='#' className='text-primary text-sm'>
            Terms and Conditions
          </a>
        </span>
      </div>
    </div>
  );
};
export default FormStep;
