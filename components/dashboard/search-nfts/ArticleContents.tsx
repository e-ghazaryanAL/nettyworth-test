import { useRouter } from 'next/router';

import RightIcon from '../../../assets/icons/icon-arrow-right.svg';
import WebsiteIcon from '../../../assets/icons/icon-website.svg';
import { useAppDispatch } from '../../../hooks/redux';
import { searchHandler } from '../../../redux/auth/portfolioSlice';

const HitArticleContent = ({ hit }: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleNavigate = () => {
    router.push(`nft-news/${hit.slug}`);
    dispatch(searchHandler());
  };

  return (
    <div className='flex justify-between pl-[25px] py-[11px] pr-[21px] border-b-2  border-lighter-gray cursor-pointer' onClick={() => handleNavigate()}>
      <div className='flex items-center'>
        <div className='w-[26px] h-[26px] bg-light-gray rounded flex items-center justify-center p-[6px]'>
          <WebsiteIcon fill='#006FFF' />
        </div>

        <div className='pl-3'>
          <span className='text-dark-blue'>{hit?.title}</span>
        </div>
      </div>
      <RightIcon fill='#006FFF' />
    </div>
  );
};

export { HitArticleContent };
