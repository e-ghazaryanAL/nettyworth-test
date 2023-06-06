import { useState } from 'react';

import { faChevronDown, faChevronUp, faListDots } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';

import { TopSalesItemsPerPage } from '../../../api/gqlQueries';
import { menuItems } from '../../../constant';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchCollectionsByPage, /* fetchSalesByDate */ selectDay } from '../../../redux/top-sales/topSalesSlice';
import 'rc-dropdown/assets/index.css';

// import { ReactComponent as Heart } from '../../../assets/icons/icon-fave.svg';

interface IButtons {
  id: number;
  title: string;
}

interface IFilteredButtons {
  setView: React.Dispatch<React.SetStateAction<string>>;
  view: string;
  filteredButtons: IButtons[];
  listBoxActive: number;
  handleFilter: (id: number) => void;
}

const FilteredButtons: React.FC<IFilteredButtons> = ({ filteredButtons, handleFilter, listBoxActive, setView, view }) => {
  const dispatch = useAppDispatch();
  const [selectedNft, setSelectedNft] = useState('All NFTs');
  const { selectedDay } = useAppSelector((state) => state.sales);
  const fetchDatabyDays = (day: string, name: string) => {
    dispatch(selectDay([day, name]));
  };

  const menu = (
    <Menu className='top-sales-dropdown'>
      {menuItems.map((item, idx) => {
        return (
          <MenuItem className='text-input bg-white flex items-center text-xs sm:text-sm hover:bg-light-gray' key={idx} onClick={() => fetchDatabyDays(item.date, item.name)}>
            {item.name}
          </MenuItem>
        );
      })}
    </Menu>
  );

  const nftMenu = (
    <Menu className='top-sales-dropdown'>
      {filteredButtons.map((item, idx) => {
        return (
          <MenuItem className='text-input bg-white flex items-center text-xs sm:text-sm hover:bg-light-gray' key={idx} onClick={() => setSelectedNft(item.title)}>
            {item.title}
          </MenuItem>
        );
      })}
    </Menu>
  );

  return (
    <div className='px-6 mt-[6px]'>
      <div className='bg-light-blue-grey flex-wrap xl:flex-nowrap	xl:justify-between flex border-light-gray border-[1px] rounded-[3px]  gap-[12px] items-center p-2 justify-center'>
        <div className='max-w-[125px] w-full h-[43px] hidden md:flex bg-white border-light-gray border-[1px]'>
          {filteredButtons.map((el, idx) => {
            return (
              <button type='button' key={idx} className={`text-xs sm:text-sm text-center border-r-light-gray border-r-[1px] last:border-0  rounded-[2px] w-full text-[#A9B0C4] ${listBoxActive === el.id ? 'active-top-sales hover:bg-dark-blue focus:bg-off-blue disabled:bg-btn-disabled ' : null}  `} onClick={() => handleFilter(el.id)}>
                {el.title}
              </button>
            );
          })}
        </div>
        <Dropdown animation='slide-up' overlay={nftMenu} trigger={['click']}>
          <button type='button' className='max-w-[161px] md:max-w-max md:hidden h-[43px] w-[249px]  pl-[17px]  pr-3 text-input rounded-[2px] bg-white py-3 flex  justify-between'>
            <span className='text-sm  text-primary font-semibold'>{selectedNft}</span>
            <span className='flex flex-col text-input'>
              <FontAwesomeIcon icon={faChevronUp} className='text-[10px]' />
              <FontAwesomeIcon icon={faChevronDown} className='-mt-[2px] text-[10px]' />
            </span>
          </button>
        </Dropdown>
        <div className='flex gap-[15px] flex-wrap xl:flex-nowrap justify-center lg:ml-auto'>
          <Dropdown animation='slide-up' overlay={menu} trigger={['click']}>
            <button type='button' className='max-w-[161px] h-[43px] w-[249px]  pl-[17px]  pr-3 text-input rounded-[2px] bg-white py-3 flex  justify-between custom-dropdown'>
              <span className='text-sm  text-input'>{selectedDay}</span>
              <span className='flex flex-col text-input'>
                <FontAwesomeIcon icon={faChevronUp} className='text-[10px]' />
                <FontAwesomeIcon icon={faChevronDown} className='-mt-[2px] text-[10px]' />
              </span>
            </button>
          </Dropdown>
        </div>
        <div className='flex gap-4 flex-wrap xl:flex-nowrap justify-center'>
          <div className='flex gap-[15px] flex-wrap xl:flex-nowrap justify-center'>
            <button type='button' className='max-w-[161px] h-[43px] w-[182px] pl-[17px] pr-3 text-input rounded-[2px] bg-white py-3 flex justify-between custom-dropdown'>
              <span className='text-sm  text-input'>Ethereum</span>
              <span className='flex flex-col text-input'>
                <FontAwesomeIcon icon={faChevronUp} className='text-[10px]' />
                <FontAwesomeIcon icon={faChevronDown} className='-mt-[2px] text-[10px]' />
              </span>
            </button>
          </div>
          <div className='flex justify-center items-center gap-[14px] md:gap-[7px] '>
            {/* <button className='viewBtn h-[43px] flex items-center justify-center w-[43px] bg-white hover:text-white hover:bg-dark-blue focus:bg-off-blue disabled:bg-btn-disabled '>
              <Heart className='h-[20px] w-[20px] hover:fill-[#fff] ' fill='#A9B0C4' />
            </button> */}
            <button className='viewBtn h-[43px] flex md:hidden btn items-center justify-center w-[43px]'></button>
            <button className={`viewBtn h-[43px] btn  flex items-center justify-center w-[43px]  ${view === 'list' ? 'active-top-sales' : ''}`} onClick={() => setView('list')}>
              <FontAwesomeIcon className={`text-white text-6 w-5 h-5 ${view === 'list' ? 'text-white' : 'text-btn-disabled'}`} icon={faListDots} />
            </button>
            <button className={`viewBtn h-[43px] flex btn items-center justify-center w-[43px] ${view === 'card' ? 'active-top-sales' : ''}`} onClick={() => setView('card')}>
              <svg xmlns='http://www.w3.org/2000/svg' width='16.012' height='16.012' className={`font-light w-[24px] h-[26px] ${view === 'card' ? 'fill-white' : 'fill-[#A9B0C4]'}`} viewBox='0 0 16.012 16.012'>
                <g data-name='Group 2744'>
                  <path data-name='Path 4354' d='M5.336 7.116H1.778A1.781 1.781 0 0 1-.001 5.337V1.779A1.781 1.781 0 0 1 1.778 0h3.558a1.781 1.781 0 0 1 1.779 1.779v3.558a1.781 1.781 0 0 1-1.779 1.779M1.778 1.779v3.558h3.559V1.779Z'></path>
                  <path data-name='Path 4355' d='M14.231 7.116h-3.558a1.781 1.781 0 0 1-1.779-1.779V1.779A1.781 1.781 0 0 1 10.673 0h3.558a1.781 1.781 0 0 1 1.779 1.779v3.558a1.781 1.781 0 0 1-1.779 1.779m-3.558-5.337v3.558h3.559V1.779Z'></path>
                  <path data-name='Path 4356' d='M5.336 16.011H1.778a1.781 1.781 0 0 1-1.779-1.779v-3.558a1.781 1.781 0 0 1 1.779-1.779h3.558a1.781 1.781 0 0 1 1.779 1.779v3.558a1.781 1.781 0 0 1-1.779 1.779m-3.558-5.337v3.558h3.559v-3.558Z'></path>
                  <path data-name='Path 4357' d='M14.231 16.011h-3.558a1.781 1.781 0 0 1-1.779-1.779v-3.558a1.781 1.781 0 0 1 1.779-1.779h3.558a1.781 1.781 0 0 1 1.779 1.779v3.558a1.781 1.781 0 0 1-1.779 1.779m-3.558-5.337v3.558h3.559v-3.558Z'></path>
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export { FilteredButtons };
