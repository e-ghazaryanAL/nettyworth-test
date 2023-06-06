import dynamic from 'next/dynamic';

const CannyWidget = dynamic(() => import('react-canny').then((mod) => mod.CannyWidget), { ssr: false });
const CannyProvider = dynamic(() => import('react-canny').then((mod) => mod.CannyProvider), { ssr: false });

const APP_ID = '';
const BOARD_TOKEN = '2b31ae28-e6ac-f5f3-3d17-59fcd7cade4c';

const FeedbackPage = () => {
  return (
    <div className='pt-5 pb-20 md:pb-8 dark-feedback'>
      <div className='max-w-[1300px] xl:mx-auto '>
        <CannyProvider appId={APP_ID}>
          <CannyWidget basePath='/feedback' boardToken={BOARD_TOKEN} />
        </CannyProvider>
      </div>
    </div>
  );
};
export default FeedbackPage;
