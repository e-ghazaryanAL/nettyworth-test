import loaderIcon from '../assets/images/loader.gif';

const Loader = () => {
  return (
    <div className='m-auto h-full'>
      <img src={loaderIcon.src} alt='photo' className='w-16 h-16' />
    </div>
  );
};

export { Loader };
