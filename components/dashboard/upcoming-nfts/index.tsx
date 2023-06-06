import { useState } from 'react';

import { UpcomingNftsHeader } from './UpcomingNftsHeader';
import { UpcomingNftsPage } from './UpcomingNftsPage';

type UpcomingNftsProps = {
  blockChain: string;
  freeMint?: boolean;
};

const UpcomingNfts: React.FC<UpcomingNftsProps> = ({ blockChain, freeMint = false }) => {
  const [filterNfts, setFilterNfts] = useState({ symbol: blockChain, category: 'All NFTs', freeMint });

  const handleFilters = (name: string, item: string | boolean) => {
    setFilterNfts((prev) => (prev[name as keyof typeof filterNfts] !== item ? { ...prev, [name]: item } : prev));
  };
  return (
    <div key={blockChain} className='pt-5 px-8 pb-16 md:pb-4 max-w-[1300px] 2xl:mx-auto'>
      <UpcomingNftsHeader handleFilter={handleFilters} filterNfts={filterNfts} />
      <UpcomingNftsPage filterNfts={filterNfts} />
    </div>
  );
};

export { UpcomingNfts };
