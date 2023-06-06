import { SearchResults } from './SearchResults';

const SearchHits = () => {
  return (
    <div className='backdrop-blur-md bg-white/85 top-12 left-0 rounded z-50 w-full absolute'>
      <div className=''>
        <SearchResults />
      </div>
    </div>
  );
};

export { SearchHits };
