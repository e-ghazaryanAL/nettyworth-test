import { InstantSearch } from 'react-instantsearch-dom';

import { CustomSearchBox } from './Searchbox';
import { SearchResults } from './SearchResults';
import { searchClient } from '../../../api/api';
import CloseIcon from '../../../assets/icons/icon-close.svg';

interface IMobileSearch {
  modalHandler: (e: React.SyntheticEvent) => void;
}

const MobileSearch: React.FC<IMobileSearch> = ({ modalHandler }) => {
  return (
    <div className='fixed top-0 right-0 left-0 z-30 backdrop-blur-[30px] h-full md:hidden'>
      <div className='mx-4 mt-4 pb-20'>
        <div className='flex justify-end md:hidden'>
          <button className='bg-primary-blue p-4 rounded' onClick={modalHandler}>
            <CloseIcon fill='#FFFFFF' />
          </button>
        </div>
        <InstantSearch searchClient={searchClient} indexName='nfts'>
          <div className='flex-1 relative mt-4 md:hidden'>
            {/* @ts-ignore */}
            <CustomSearchBox modalHandler={() => ''} />
          </div>
          <div className='mt-4'>
            <SearchResults modalHandler={modalHandler} />
          </div>
        </InstantSearch>
      </div>
    </div>
  );
};
export default MobileSearch;
