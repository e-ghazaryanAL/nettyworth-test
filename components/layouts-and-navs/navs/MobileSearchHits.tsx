import { SearchResults } from '../../dashboard/search-nfts/SearchResults';

const MobileSearchHits = () => {
  return (
    <div className='backdrop-blur-md bg-white/5 h-full top-12 left-0 rounded z-50 w-full absolute'>
      <div className=''>
        <SearchResults />
      </div>
    </div>
  );
};

export { MobileSearchHits };
