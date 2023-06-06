import EmailIcon from '../assets/icons/icon-email.svg';
import PersonIcon from '../assets/icons/icon-person.svg';

const Subscribe = () => {
  return (
    <div className='px-7'>
      <div className='px-5 pt-9 pb-5 bg-light-blue-grey rounded'>
        <h4 className='text-primary text-lg font-normal leading-7'>Subscribe to the Netty Newsletter</h4>
        <p className='p-small leading-6'>Get the latest NFT News, Sales, Rarity, and Upcoming Sales</p>
        <div className='mt-6'>
          <div className='relative'>
            <input type='text' className='bg-white py-3 pl-12 rounded-sm placeholder:text-dark-blue w-full' placeholder='Name' />
            <PersonIcon fill='#006FFF' className='absolute left-[18px] top-[32%] bottom-[25%]' />
          </div>
          <div className='relative mt-4'>
            <input type='text' className='bg-white py-3 pl-12 rounded-sm placeholder:text-dark-blue w-full' placeholder='Email' />
            <EmailIcon fill='#006FFF' className='absolute left-[18px] top-[32%] bottom-[25%]' />
          </div>
          <button className='mt-4 bg-primary-blue rounded text-white text-center py-4 w-full'>Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export { Subscribe };
