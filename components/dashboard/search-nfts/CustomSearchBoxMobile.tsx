import { connectSearchBox } from 'react-instantsearch-dom';

import IconClose from '../../../assets/icons/icon-close.svg';
import IconSearch from '../../../assets/icons/icon-search.svg';

const SearchBoxd = ({ modalHandler, showSearch }: any) => {
  return (
    <div className='relative'>
      <button className='focus:outline-none flex flex-col justify-center items-center text-white' onClick={modalHandler}>
        {showSearch ? <IconClose fill='#006fff' /> : <IconSearch fill='#006fff' />}
        <span className='text-white text-[10px]'>Search</span>
      </button>
    </div>
  );
};
const CustomSearchBoxMobile = connectSearchBox(SearchBoxd);

export { CustomSearchBoxMobile };
