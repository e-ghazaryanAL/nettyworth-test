import { Dispatch, SetStateAction } from 'react';

import { connectSearchBox, SearchBoxProps } from 'react-instantsearch-dom';

import SearchIcon from '../../../assets/icons/icon-search.svg';

type Props = SearchBoxProps & {
  modalHandler: () => void;
  currentRefinement: string;
  refine: Dispatch<SetStateAction<string>>;
};

const SearchBox: React.FC<Props> = ({ modalHandler, currentRefinement, refine }) => {
  return (
    <div className='relative' onClick={modalHandler}>
      <input className='block w-full bg-[#F5F6FB] py-2 px-5 text-gray-800  outline-none focus:outline-none border-[1px] border-light-gray h-[60px] rounded placeholder:text-input md:pr-10 md:border-none md:h-[42px]' placeholder='Search NFTs, News, and Users...' value={currentRefinement} onChange={(e) => refine(e.currentTarget.value)} />
      <button className='mobile-search-icon md:desktop-search-icon border-y md:border-none'>
        <SearchIcon fill='#465272' className='w-[18px] h-[18px]' />
      </button>
    </div>
  );
};
const CustomSearchBox = connectSearchBox(SearchBox);

export { CustomSearchBox };
