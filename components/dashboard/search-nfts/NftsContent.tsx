import { useRouter } from 'next/router';

import RightIcon from '../../../assets/icons/icon-arrow-right.svg';
import { useAppDispatch } from '../../../hooks/redux';
import { searchHandler } from '../../../redux/auth/portfolioSlice';

const HitNftsContent = ({ hit }: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleNavigate = (slug: string) => {
    router.push(`/nft-top-sales/${slug}`);
    dispatch(searchHandler());
  };
  return (
    <div className='flex justify-between pl-[25px] pt-[11px] pr-[21px] pb-[15px] border-b-2  border-lighter-gray cursor-pointer' onClick={() => handleNavigate(hit.slug)}>
      <div className='flex items-center'>
        <img src={hit.image} alt='' className='w-[26px] h-[26px] rounded object-cover' />
        <div className='pl-3 flex flex-col'>
          <span className='text-dark-blue'>{hit.name}</span>
          <span className='text-primary '>{hit.total_volume} nfts</span>
        </div>
      </div>
      <RightIcon fill='#006FFF' />
    </div>
  );
};

export { HitNftsContent };
