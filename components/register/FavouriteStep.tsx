import { useEffect } from 'react';

import StepLayout from './StepLayout';
import HeartIcon from '../../assets/icons/icon-fav-heart.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useDebounce } from '../../hooks/useDebounce';
import useFavourite from '../../hooks/useFavourites';
import useSearch from '../../hooks/useSearch';
import { fetchCollectionsByPage } from '../../redux/top-sales/topSalesSlice';
import { Loader } from '../Loader';

type FavouriteStepProps = {
  nextStep: () => void;
};

const FavouriteStep: React.FC<FavouriteStepProps> = ({ nextStep }) => {
  const { NftTopSalesCollections, loading } = useAppSelector((state) => state.sales);
  const { searchValue, handleSearch } = useSearch();
  const debouncedVal = useDebounce(searchValue);
  const dispatch = useAppDispatch();
  const { handleLikeToggle, favorites } = useFavourite();

  const favourtesNFT = ['0xed5af388653567af2f388e6224dc7c4b3241c544', '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d', '0x23581767a106ae21c074b2276d25e5c3e136a68b', '0x8a90cab2b38dba80c64b7734e58ee1db38b8992e', '0x60e4d786628fea6478f785a6d7e704777c86a7c6'];
  useEffect(() => {
    dispatch(
      fetchCollectionsByPage({
        ...(!debouncedVal ? { collection_id_or_slugs: favourtesNFT } : { search_term: debouncedVal }),
        limit: 5,
      })
    );
  }, [debouncedVal]);

  return (
    <StepLayout search={searchValue} setSearch={handleSearch} nextStep={nextStep} placeholder='Search' projectName='NFT Projects'>
      <div className='flex flex-col gap-4'>
        {loading ? (
          <Loader />
        ) : (
          NftTopSalesCollections?.collections
            ?.slice()
            .sort((a, b) => {
              const aName = a.name || '';
              const bName = b.name || '';
              return aName.localeCompare(bName);
            })
            ?.map((nft) => {
              return (
                <div key={nft.name} className='w-[334px] py-3 pl-[11px] pr-4 bg-primary-grey flex justify-between items-center rounded'>
                  <div className='flex justify-center items-center gap-[11px]'>
                    <img src={nft.image_url} className='w-[25px] h-[25px] rounded' />
                    <span className='font-medium'>{nft?.name}</span>
                  </div>
                  <button onClick={(e) => handleLikeToggle(e, { category: 'NFTSales', itemId: nft.contract_address })}>
                    <HeartIcon className='w-4 h-4' fill={`${favorites.has(nft.contract_address) ? '#ff066a' : '#dfe3ee'}`} />
                  </button>
                </div>
              );
            })
        )}
      </div>
    </StepLayout>
  );
};
export default FavouriteStep;
