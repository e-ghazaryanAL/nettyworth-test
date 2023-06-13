import React, { ReactElement, useState } from 'react';

import { faFingerprint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSession, signIn, useSession } from 'next-auth/react';

import { LoginLayout } from '../../components/layouts-and-navs/landing/LoginLayout';
import { PublicRoute } from '../../utils/auth';
import { setCookie } from '../../utils/cookies';

const Login = () => {
  const [values, setValues] = useState({ email: '', pwd: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signIn('login', {
        ...values,
        redirect: false,
        callbackUrl: '/portfolio',
      });
      const session = await getSession();

      setCookie('jwt', session?.user?.jwt as string);

      router.push('/portfolio');
    } catch (e) {
      setError('Incorrect username or password');
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className='pt-9  pl-[33px] pr-[47px] pb-[35px] max-w-[385px] h-full'>
      <form action='' onSubmit={handleAuth}>
        <div className='flex flex-col gap-[18px]'>
          <div className='relative w-full h-[50px]'>
            <input type='email' name='email' required value={values.email} onChange={handleChange} className='bg-primary-grey w-full h-[50px] border-[1px] border-input rounded placeholder:text-sm placeholder:text-[#465272] pl-12' placeholder='Email' />
            <FontAwesomeIcon icon={faFingerprint} className='absolute left-[15px] top-[17px] w-[18px] h-[18px] text-primary' />
          </div>
          <div className='relative w-full h-[50px]'>
            <input type='password' name='pwd' required value={values.pwd} onChange={handleChange} className='bg-primary-grey w-full h-[50px] border-[1px] border-input rounded placeholder:text-sm placeholder:text-[#465272] pl-12' placeholder='Password' />
            <FontAwesomeIcon icon={faFingerprint} className='absolute left-[15px] top-[17px] w-[18px] h-[18px] text-primary' />
          </div>
        </div>
        <div className='mt-[19px] flex items-center flex-col gap-4'>
          <button className='bg-primary-blue focus:bg-off-blue hover:bg-dark-blue  flex items-center justify-center w-full h-[50px] rounded text-white'>SIGN IN</button>
        </div>
        {error && <span className='text-red-400'>{error}</span>}
      </form>
      <div className='mt-6  flex justify-end items-center gap-[14px]'>
        <Link href='/forgot-password' className='text-dark-blue text-xs'>
          Forgot Password
        </Link>
        <Link href='/register' className='text-dark-blue text-xs'>
          Register Today
        </Link>
      </div>
    </div>
  );
};

Login.getLayout = (page: ReactElement) => <LoginLayout label={['LOGIN']}>{page}</LoginLayout>;

export const getServerSideProps = PublicRoute;

export default Login;
