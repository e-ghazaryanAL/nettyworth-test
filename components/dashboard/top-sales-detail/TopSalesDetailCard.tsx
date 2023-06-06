import TokenCard from './TokenCard';

import { Loader } from '../../Loader';
import { Paginataion } from '../news/Pagination';
import { useAppSelector } from '../../../hooks/redux';

type TopSalesDetailCardProps = {
  pageHandler: (e: { selected: number }) => void;
};

export const TopSalesDetailCard: React.FC<TopSalesDetailCardProps> = ({ pageHandler }) => {
  const { CollectionsAssets, CollectionAssetLoading } = useAppSelector((state) => state.sales);
  return (
    <div className='mt-[15px]'>
      <div className='w-max m-auto gap-x-7 lg:w-full grid gap-3 grid-cols-2 md:grid-cols-3  lg:grid-cols-6'>
        {CollectionAssetLoading ? (
          <Loader />
        ) : (
          CollectionsAssets?.assets?.map((token) => {
            return <TokenCard key={token.token_id} token={token} />;
          })
        )}
      </div>
      <div className='mt-4'>
        <Paginataion className='flex flex-wrap' totalPages={CollectionsAssets?.count || 1} handlePageClick={pageHandler} />
      </div>
    </div>
  );
};
