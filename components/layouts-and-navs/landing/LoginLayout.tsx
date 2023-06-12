import { ReactNode } from 'react';

import Image from 'next/image';

import logoDark from '../../../assets/images/nettyworth-beta-dark.png';
import logo from '../../../assets/images/nettyworth-white.png';

type Prop = {
  children: ReactNode;
  label?: string[];
  steps?: boolean;
};

const LoginLayout = ({ children, label, steps }: Prop) => {
  const [bluetext, blackText] = label as string[];

  return (
    <div className='flex-col w-full h-screen flex md:flex-row'>
      <div className='w-full justify-center md:w-[50%] lg:w-[40%] h-full bg-primary-blue flex items-center md:pl-16 md:justify-start lg:pl-0 lg:justify-center'>
        <Image src={logo} alt='logo' className='w-[287px] h-[60px] object-cover dark:hidden' priority />
        <Image src={logoDark} alt='logodark' className='w-[200px] h-[60px] invert hidden dark:block' priority />
      </div>
      <div className='w-full md:w-[50%] lg:w-[60%] h-full bg-primary-grey flex items-center justify-center relative loginBackground'>
        <div className='top-[-87px] flex-col flex md:flex-row absolute md:top-auto md:-left-[101px]'>
          <div className='relative flex-row-reverse gap-2 w-full items-center md:w-[101px] bg-primary flex justify-start pt-[60px] rounded md:rounded-none md:rounded-bl-lg md:rounded-tl-lg md:flex-col'>
            <span className={`text-primary text-base bg-primary relative z-10 gap-1 leading-7 font-semibold md:-rotate-90 px-2 flex items-center whitespace-nowrap ${steps ? 'mt-10' : ''}`}>
              {bluetext} {blackText ? <span className='text-base leading-7 font-semibold'> {blackText}</span> : ''}
            </span>
            <div className='custom-line'></div>
          </div>
          <div className={`h-full w-full ${steps ? 'pr-5' : ''} bg-white`}>{children}</div>
        </div>
      </div>
    </div>
  );
};
export { LoginLayout };
