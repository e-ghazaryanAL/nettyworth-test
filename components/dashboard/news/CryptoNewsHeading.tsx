import CryptoHeadCard from './CryptoHeadCard';
import { useAppSelector } from '../../../hooks/redux';
import { Loader } from '../../Loader';

const CryptoNewsHeading = () => {
  const {
    cryptoNews: [firstItem],
    cryptoNewsLoading,
  } = useAppSelector((state) => state.news);

  return <div className='pt-[22px] px-8 max-w-[1300px] 2xl:mx-auto'>{cryptoNewsLoading ? <Loader /> : <CryptoHeadCard item={firstItem} />}</div>;
};

export default CryptoNewsHeading;
