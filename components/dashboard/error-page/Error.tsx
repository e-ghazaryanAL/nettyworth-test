import ErrorImage from '../../../assets/images/error.png';

const Error = () => {
  return (
    <>
      <div className='pt-5 flex gap-3 flex-col w-full h-full items-center pb-[250px]'>
        <img src={ErrorImage.src} className='max-w-[620px] w-full' />
        <span className='text-2xl md:text-3xl lg:text-[40px] font-bold leading-[52px]'>We were not able to find that page.</span>
      </div>
    </>
  );
};

export { Error };
