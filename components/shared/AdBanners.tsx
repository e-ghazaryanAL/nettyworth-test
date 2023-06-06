import Image from 'next/image';

import lindosAd from '../../assets/images/lindos-horizontal-banner.gif';

const AdBanners = () => {
  return (
    <div className='w-full'>
      <a href='https://www.lindosnft.com/' target='_blank' rel='noreferrer' className='cursor-pointer'>
        <span className='text-[11px]'>ADVERTISERS</span>
        <Image src={lindosAd} alt='adbaner' className='w-full' />
      </a>
    </div>
  );
};

export default AdBanners;
