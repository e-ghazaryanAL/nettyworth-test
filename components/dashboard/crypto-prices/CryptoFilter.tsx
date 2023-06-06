import { useEffect } from 'react';

import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, SubMenu } from 'rc-menu';

import { cryptoMenuItems } from '../../../constant';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import 'rc-menu/assets/index.css';
import 'rc-dropdown/assets/index.css';
import { fetchCryptofilters } from '../../../redux/crypto/cryptoSlice';

// import { ReactComponent as Heart } from '../../../assets/icons/icon-fave.svg';
interface ICryptoFilters {
  symbol: string;
  sign: string;
  name: string;
}
type CryptoFilterProps = {
  handleFilter: (interval: string, name: string) => void;
  handleCurr: (symbol: string, sign: string, name: string) => void;
  cryptoFilters: ICryptoFilters;
  filters: { interval: string; name: string };
};
const CryptoFilter: React.FC<CryptoFilterProps> = ({ handleFilter, filters, cryptoFilters, handleCurr }) => {
  const { filtersLoading, currencyData } = useAppSelector((state) => state.crypto);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCryptofilters());
  }, []);

  const menu = (
    <Menu className='top-sales-dropdown'>
      {cryptoMenuItems.map((item, idx) => {
        return (
          <MenuItem className='text-input bg-white flex items-center text-xs sm:text-sm hover:bg-light-gray' key={idx} onClick={() => handleFilter(item.date, item.name)}>
            {item.name}
          </MenuItem>
        );
      })}
    </Menu>
  );
  const popularCurrencies = [
    {
      id: 2781,
      name: 'United States Dollar',
      sign: '$',
      symbol: 'USD',
    },
    { id: 2790, name: 'Euro', sign: '€', symbol: 'EUR' },
    {
      id: 2791,
      name: 'Pound Sterling',
      sign: '£',
      symbol: 'GBP',
    },
  ];

  const filteredSymbols = popularCurrencies.map((item) => item.symbol);
  const currencyMenu = (
    <Menu className='top-sales-dropdown h-[200px] overflow-auto'>
      {filtersLoading && <span>Loading...</span>}
      <SubMenu title='Popular Currencies' key='1' className='p-0'>
        {popularCurrencies.map((currency, i) => {
          return (
            <MenuItem
              className='text-input bg-white flex items-center text-xs sm:text-sm hover:bg-light-gray'
              key={`1-${i + 1}`}
              onClick={() => {
                handleCurr(currency.symbol, currency.sign, currency.name);
              }}
            >
              {`${currency.symbol} - ${currency.name}`}
            </MenuItem>
          );
        })}
      </SubMenu>
      {currencyData.data
        .filter((item) => !filteredSymbols.includes(item.symbol))
        .map((currency) => {
          return (
            <MenuItem
              className='text-input bg-white flex items-center text-xs sm:text-sm hover:bg-light-gray'
              key={currency.id}
              onClick={() => {
                handleCurr(currency.symbol, currency.sign, currency.name);
              }}
            >
              {`${currency.symbol} - ${currency.name}`}
            </MenuItem>
          );
        })}
    </Menu>
  );

  return (
    <div>
      <div className='px-6 mt-[6px] flex flex-col md:flex-row gap-3'>
        <div className='w-[331px] bg-light-blue-grey justify-between flex border-light-gray border gap-[12px] items-center p-2'>
          <div className=''>
            <Dropdown animation='slide-up' overlay={menu} trigger={['click']}>
              <button type='button' className='h-[43px] w-[310px]  pl-[17px]  pr-3 text-input rounded-[2px] bg-white py-3 flex  justify-between custom-dropdown'>
                <span className='text-sm text-input font-normal'>{filters.name}</span>
                <span className='flex flex-col text-input'>
                  <FontAwesomeIcon icon={faChevronUp} className='text-[10px]' />
                  <FontAwesomeIcon icon={faChevronDown} className='-mt-[2px] text-[10px]' />
                </span>
              </button>
            </Dropdown>
          </div>

          {/* <button className='viewBtn h-[43px] flex items-center justify-center w-[43px] bg-white hover:text-white hover:bg-dark-blue focus:bg-off-blue disabled:bg-btn-disabled '>
            <Heart className='h-[20px] w-[20px] hover:fill-[#fff]' fill='#A9B0C4' />
          </button> */}
        </div>
        <div className='w-[331px] bg-light-blue-grey justify-between flex border-light-gray border gap-[12px] items-center p-2'>
          <div className=''>
            <Dropdown animation='slide-up' overlay={currencyMenu} trigger={['click']}>
              <button type='button' className='h-[43px] w-[310px]  pl-[17px]  pr-3 text-input rounded-[2px] bg-white py-3 flex  justify-between custom-dropdown'>
                <span className='text-sm text-input font-normal'>{cryptoFilters.symbol ? `${cryptoFilters.symbol} - ${cryptoFilters.name}` : 'Select Currency'}</span>
                <span className='flex flex-col text-input'>
                  <FontAwesomeIcon icon={faChevronUp} className='text-[10px]' />
                  <FontAwesomeIcon icon={faChevronDown} className='-mt-[2px] text-[10px]' />
                </span>
              </button>
            </Dropdown>
          </div>

          {/* <button className='viewBtn h-[43px] flex items-center justify-center w-[43px] bg-white hover:text-white hover:bg-dark-blue focus:bg-off-blue disabled:bg-btn-disabled '>
            <Heart className='h-[20px] w-[20px] hover:fill-[#fff]' fill='#A9B0C4' />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default CryptoFilter;
