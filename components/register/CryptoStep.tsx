import { useEffect } from 'react';

import StepLayout from './StepLayout';
import HeartIcon from '../../assets/icons/icon-fav-heart.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useDebounce } from '../../hooks/useDebounce';
import useFavourite from '../../hooks/useFavourites';
import useSearch from '../../hooks/useSearch';
import { fetchtCryptoMap } from '../../redux/crypto/cryptoSlice';
import { Loader } from '../Loader';

type CryptoStepProps = {
  nextStep: () => void;
};

const CryptoStep: React.FC<CryptoStepProps> = ({ nextStep }) => {
  const dispatch = useAppDispatch();
  const { cryptoMap, loading } = useAppSelector((state) => state.crypto);
  const { searchValue, handleSearch } = useSearch();
  const debouncedVal = useDebounce(searchValue);
  const { handleLikeToggle, favorites } = useFavourite();
  const favouriteCrypto = {
    symbol: ['APE', 'BTC', 'ADA', 'ETH', 'SOL'],
    name: ['ApeCoin', 'Bitcoin', 'Cardano', 'Ethereum', 'Solana'],
  };

  useEffect(() => {
    dispatch(
      fetchtCryptoMap({
        symbol: debouncedVal.toLocaleUpperCase() || favouriteCrypto.symbol.join(','),
      })
    );
  }, [debouncedVal]);

  return (
    <StepLayout search={searchValue} setSearch={handleSearch} nextStep={nextStep} placeholder='Search' projectName='CryptoCurrency'>
      <div className='flex flex-col gap-4'>
        {loading ? (
          <Loader />
        ) : (
          cryptoMap
            ?.filter((val) => (!searchValue ? favouriteCrypto.name.includes(val.name) : val))
            .sort((a, b) => a.name.localeCompare(b.name))
            .slice(0, 5)
            .map((crypto) => {
              return (
                <div key={crypto.id} className='max-w-[334px] w-full py-3 pl-[11px] pr-4 bg-primary-grey flex justify-between items-center rounded'>
                  <div className='flex justify-center items-center gap-[11px]'>
                    <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`} className='w-[25px] h-[25px] rounded-full object-cover' />
                    <span className='font-medium'>{crypto.name}</span>
                  </div>
                  <button onClick={(e) => handleLikeToggle(e, { itemId: crypto.id, category: 'CryptoSales' })}>
                    <HeartIcon className='w-4 h-4' fill={`${favorites.has(crypto.id) ? '#ff066a' : '#dfe3ee'}`} />
                  </button>
                </div>
              );
            })
        )}
      </div>
    </StepLayout>
  );
};

export default CryptoStep;
