import Link from 'next/link';

import RightIcon from '../../../assets/icons/icon-arrow-right.svg';
import { useAppSelector } from '../../../hooks/redux';
import { Loader } from '../../Loader';
// import NFTimage from '../../../assets/images/nftpic.jpeg';

const NFTCollection: React.FC = () => {
  const {
    wallets: [data],
    loading,
  } = useAppSelector((state) => state.user);

  return (
    <div className='flex flex-col bg-light-gray border-lighter-gray-300 md:flex-row'>
      <div className='flex md:flex-col md:w-[30%] border-y-[1px]'>
        <div className='border-lighter-gray-300 border-r-[1px] w-1/2 pt-6 px-6 md:w-full md:h-full md:pb-11'>
          <p className='p-normal'>
            NFT <span className='p-normal text-primary font-semibold dark-primary'> Collections</span>
          </p>
          {loading ? <Loader /> : <h4 className='font-bold text-[26px]'>{data?.nftCollectionCount}</h4>}
        </div>
        <div className='pl-6 py-6 w-1/2 md:w-full md:h-full md:border-lighter-gray-300 md:border-r md:border-t md:pb-11'>
          <p className='p-normal'>
            Total <span className='p-normal text-primary font-semibold dark-primary'> NFTs</span>
          </p>
          <h4 className='font-bold text-[26px]'>{data?.nftCount}</h4>
        </div>
      </div>
      <div className='pt-6 px-6 md:border-y-[1px] md:w-[70%]'>
        <p className='p-normal'>
          My <span className='p-normal text-primary font-semibold dark-primary'> NFTs</span>
        </p>
        {loading ? (
          <Loader />
        ) : (
          <div className='grid grid-cols-4 gap-x-7 md:grid-cols-4 md:gap-x-5 lg:grid-cols-6'>
            {data?.ownedAssets
              ?.filter((nft) => nft.original_media_url)
              .map((item, idx) => {
                return <img src={item.original_media_url || ''} alt={'img'} key={idx} className={`w-[72px] h-[72px] object-cover mt-3 rounded ${idx > 11 ? 'hidden lg:block' : ''} `} loading='lazy' />;
              })}
          </div>
        )}
        <div className={`mt-5 mb-6 md:px-0 ${data?.ownedAssets?.length ? '' : 'hidden'}`}>
          <div className='flex items-center gap-2 justify-end'>
            <p className='p-small text-primary'>
              <Link href='portfolio/nfts'>View all</Link>
            </p>
            <RightIcon fill='#006FFF' />
          </div>
        </div>
      </div>
    </div>
  );
};
export { NFTCollection };
