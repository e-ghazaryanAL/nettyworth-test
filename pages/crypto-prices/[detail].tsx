import { useEffect } from 'react';

import CryptoDetailData from '../../components/dashboard/crypto-prices-detail/CryptoDetailData';
import CryptoDetailStats from '../../components/dashboard/crypto-prices-detail/CryptoDetailStats';
import { Loader } from '../../components/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchCrypoDetails, fetchCryptoMetadata } from '../../redux/crypto/cryptoSlice';
import { getCookie } from '../../utils/cookies';

const CryptoDetailPage = () => {
  const { detailsLoading } = useAppSelector((state) => state.crypto);
  const dispatch = useAppDispatch();
  const id = getCookie('id');
  const symbol = getCookie('symbol');

  useEffect(() => {
    if (id) {
      dispatch(fetchCrypoDetails({ id: id as string }));
    }
    if (symbol) {
      dispatch(fetchCryptoMetadata({ symbol: symbol as string }));
    }
  }, [id, symbol]);

  return (
    <div className='px-8 pb-[42px] md:pb-4 max-w-[1300px] 2xl:mx-auto'>
      {detailsLoading ? (
        <Loader />
      ) : (
        <>
          <CryptoDetailStats />
          <CryptoDetailData />
        </>
      )}
    </div>
  );
};

export default CryptoDetailPage;
