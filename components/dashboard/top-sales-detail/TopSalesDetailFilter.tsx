import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from 'rc-dropdown';
import 'rc-dropdown/assets/index.css';
import Menu, { Item as MenuItem } from 'rc-menu';

import Search from '../../../assets/icons/icon-search.svg';
import { useAppSelector } from '../../../hooks/redux';
import { TraitType } from '../../../redux/top-sales/upshotmodel';
import { Loader } from '../../Loader';

interface IPropertiesDropDown {
  handler: (trait_type: string) => void;
  item: null | TraitType[];
}

type TopSalesDetailFilterProps = {
  filter: (category: string, val: string) => void;
  clearFilter: () => void;
  search: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchvalue: string;
};

interface FilterCategory {
  filterName: string;
  val: string;
}

type DropdownProps = {
  handler: (category: string, val: string) => void;
  item: FilterCategory[];
};

const FilterDropDown = ({ handler, item }: DropdownProps) => {
  return (
    <Menu className='top-sales-dropdown h-[110px] overflow-auto'>
      {item.map(({ filterName, val }, idx) => {
        return (
          <MenuItem key={idx} onClick={() => handler(filterName, val)}>
            {filterName}
          </MenuItem>
        );
      })}
    </Menu>
  );
};

const PropertiesDropDown = ({ handler, item }: IPropertiesDropDown) => {
  return (
    <Menu className='top-sales-dropdown h-[110px] overflow-auto'>
      {!item?.length ? (
        <Loader />
      ) : (
        item?.map((trait, idx) => {
          return (
            <MenuItem key={idx} onClick={() => handler(trait.type)}>
              <span>{`${trait.type} ${trait.count}`}</span>
            </MenuItem>
          );
        })
      )}
    </Menu>
  );
};

const rarityOptions = [
  {
    filterName: 'Most Rare',
    val: 'rarity',
  },
  {
    filterName: 'Least Rare',
    val: 'rarity',
  },
];

const priceOptions = [
  {
    filterName: 'Low',
    val: 'price',
  },
  {
    filterName: 'High',
    val: 'price',
  },
];

const TopSalesDetailFilter: React.FC<TopSalesDetailFilterProps> = ({ filter, clearFilter, search, searchvalue }) => {
  const { CollectionTraits } = useAppSelector((state) => state.sales);

  const handleFilter = (trait_type: string) => {};
  return (
    <div className='hr pt-7'>
      <div className='flex flex-col md:flex-row bg-white gap-4 items-center border w-full h-[400px] md:h-[61px]'>
        <div className='grid grid-cols-1 border-r md:grid-cols-3 max-w-[434px] w-full h-full'>
          <Dropdown animation='slide-up' overlay={<PropertiesDropDown item={CollectionTraits} handler={handleFilter} />} trigger={['click']}>
            <div className='bg-white md:border-r flex items-center justify-between px-3 md:pl-7 md:pr-[22px] placeholder:text-sm placeholder:text-[#465272]'>
              <div className='flex gap-[22px]'>
                <span className='text-xs text-[#465272] font-medium'>Properties</span>
              </div>
              <div className='flex flex-col'>
                <FontAwesomeIcon className='text-[10px] text-input' icon={faChevronUp} />
                <FontAwesomeIcon className='text-[10px] text-input' icon={faChevronDown} />
              </div>
            </div>
          </Dropdown>
          <Dropdown animation='slide-up' overlay={<FilterDropDown item={priceOptions} handler={filter} />} trigger={['click']}>
            <div className='bg-white md:border-r flex items-center justify-between px-3 md:px-6 placeholder:text-sm placeholder:text-[#465272]'>
              <div className='flex gap-[22px]'>
                <span className='text-xs text-[#465272] font-medium'>Price</span>
              </div>
              <div className='flex flex-col'>
                <FontAwesomeIcon className='text-[10px] text-input' icon={faChevronUp} />
                <FontAwesomeIcon className='text-[10px] text-input' icon={faChevronDown} />
              </div>
            </div>
          </Dropdown>
          <Dropdown animation='slide-up' overlay={<FilterDropDown item={rarityOptions} handler={filter} />} trigger={['click']}>
            <div className='bg-white flex items-center justify-between px-3 md:pl-4 md:pr-6 placeholder:text-sm placeholder:text-[#465272]'>
              <div className='flex gap-[22px]'>
                <span className='text-xs text-[#465272] font-medium'>Rarity</span>
              </div>
              <div className='flex flex-col'>
                <FontAwesomeIcon className='text-[10px] text-input' icon={faChevronUp} />
                <FontAwesomeIcon className='text-[10px] text-input' icon={faChevronDown} />
              </div>
            </div>
          </Dropdown>
        </div>
        <div className='flex h-full gap-[15px] border-t md:border-t-0 pr-[9px] justify-center items-center max-w-[665px] w-full'>
          <div className='relative w-full md:w-[535px] h-[43px] bg-light-blue-grey border border-input rounded-sm '>
            <input value={searchvalue} type='text' placeholder='Search NFTS in this Collection' className='pl-6 placeholder:text-sm bg-light-blue-grey w-full h-full placeholder:text-[#465272]' onChange={search} />
            <Search className='absolute right-0 top-[50%] transform -translate-x-1/2 -translate-y-1/2  w-[16px] h-[16px]' fill='#465272' />
          </div>
          <button className='bg-primary-blue h-[43px] max-w-[115px] w-full' onClick={clearFilter}>
            <span className='text-primary-grey text-xs'>Clear Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export { TopSalesDetailFilter };
