import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import 'rc-dropdown/assets/index.css';

import { breadcrumbs } from '../../../constant';

const filteredButtons = [
  { id: 1, title: 'NFT News', path: 'nft-news', name: 'NFT News' },
  { id: 41, title: 'Crypto News', path: 'crypto-news', name: 'Crypto' },
  { id: 26, title: 'Metaverse', path: 'metaverse', name: 'Metaverse' },
  { id: 24, title: 'Education', path: 'nft-education', name: 'Education' },
  { id: 32, title: 'Interviews', path: 'meet-the-creator', name: 'Interviews' },
  { id: 39, title: 'Podcasts', path: 'podcasts', name: 'Podcasts' },
];

interface IButton {
  id: number;
  title: string;
  path: string;
  name: string;
}

type NewsListButtonsProps = {
  categoryId: number;
  detail?: string;
};

const MenuDropdown = ({ handleFilter }: { handleFilter: (el: IButton) => void }) => {
  const dropdownName = (items: IButton) => {
    handleFilter(items);
  };

  return (
    <Menu className='top-sales-dropdown h-[150px] overflow-auto'>
      {filteredButtons?.map((item) => {
        return (
          <MenuItem onClick={() => dropdownName(item)} key={item.id} className='text-input bg-white flex items-center text-xs sm:text-sm hover:bg-light-gray'>
            {item.name}
          </MenuItem>
        );
      })}
    </Menu>
  );
};

const NewsListButtons: React.FC<NewsListButtonsProps> = ({ categoryId, detail }) => {
  const router = useRouter();
  const breadcrumb = breadcrumbs[router.pathname];
  const handleFilter = (el: IButton) => {
    router.push(`/${el.path}`);
  };
  return (
    <div className={`pl-8 max-w-[1300px] 2xl:mx-auto ${detail ? '2xl:pl-0 pt-2' : 'pl-8 pt-5'}`}>
      <div className='flex gap-1 pl-3 pb-5 2xl:pl-0'>
        <span className='text-primary text-sm font-semibold'>{breadcrumb?.blue}</span>
        <span className='text-top-sales text-sm '>{breadcrumb?.text}</span>
      </div>
      <div className='w-full max-w-[649px]  hidden bg-white rounded border-light-gray border  md:grid grid-cols-6'>
        {filteredButtons.map((el, idx) => {
          return (
            <button type='button' onClick={() => handleFilter(el)} key={idx} className={`h-[32px] sm:h-[61px] w-full  bg-light-blue-grey text-sm border-r last-of-type:border-none  text-center text-input ${categoryId === el.id ? 'active-news ' : null} `}>
              {el.title}
            </button>
          );
        })}
      </div>
      <div className='w-full pr-8 md:hidden'>
        <Dropdown animation='slide-up' overlay={<MenuDropdown handleFilter={handleFilter} />} trigger={['click']}>
          <div className='bg-[#fff]  h-[60px] border-2 flex items-center justify-between pl-4 pr-6  border-input rounded placeholder:text-sm placeholder:text-[#465272]'>
            <div className='flex gap-[22px]'>
              {filteredButtons.map((el, idx) => {
                if (el.id === categoryId) {
                  return (
                    <span key={idx} className='text-sm text-[#465272]'>
                      {el.title}
                    </span>
                  );
                }
                return null;
              })}
            </div>
            <div className='flex flex-col'>
              <FontAwesomeIcon className='text-[10px] text-input' icon={faChevronUp} />
              <FontAwesomeIcon className='text-[10px] text-input' icon={faChevronDown} />
            </div>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export { NewsListButtons };
