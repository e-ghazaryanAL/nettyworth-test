import Image from 'next/image';
import { useRouter } from 'next/router';
import Mailchimp from 'react-mailchimp-subscribe';

import { CustomForm } from './MailForm';
import { MAIL_CHIMP_URL } from '../../../api/api';
import lindosBanner from '../../../assets/images/lindos-vertical-banner.gif';
import { useAppDispatch } from '../../../hooks/redux';
import { setIsOpen } from '../../../redux/auth/portfolioSlice';
import { setCookie } from '../../../utils/cookies';

const NewsEmail = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleNavigate = () => {
    router.push('/portfolio');
    dispatch(setIsOpen('true'));
    setCookie('isOpen', 'true');
  };
  return (
    <>
      <div className='-order-1 xl:order-1 flex-col items-center sm:items-stretch w-full flex sm:justify-center sm:flex-row lg:justify-start  xl:items-end xl:flex-col 2xl:items-start cursor-pointer'>
        <div className='w-full h-full xl:h-auto sm:w-[40%] xl:w-[294px]' onClick={handleNavigate}>
          <span className='text-[11px] '>ADVERTISERS</span>
          <a href='https://www.lindosnft.com/' target='_blank' rel='noreferrer'>
            <Image src={lindosBanner} alt='lindos-banner' className='w-full h-72 sm:h-full xl:w-[294px] xl:h-[588px] object-contain xl:mt-2' priority />
          </a>
        </div>
        <div className='w-full h-auto justify-start md:w-[60%] bg-white sm:h-full sm:justify-between xl:w-[294px] xl:h-auto  xl:justify-start   flex flex-col border-[1px]  border-light-gray rounded mt-6 xl:mt-4 pt-[22px] pr-3 pl-4 gap-[5px] '>
          <span className='text-[22px] md:text-lg font-medium text-primary lg:text-[22px]'>Subscribe to the Netty Newsletter</span>
          <span>Get the latest NFT News, Sales, Rarity, and Upcoming Sales</span>
          <div className='relative'>
            <Mailchimp url={MAIL_CHIMP_URL} render={({ subscribe, status, message }) => <CustomForm status={status} message={message} onValidated={(formData: any) => subscribe(formData)} />} />
          </div>
        </div>
      </div>
    </>
  );
};

export { NewsEmail };
