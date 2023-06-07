import Menu, { Item as MenuItem } from 'rc-menu';
import { Collection } from '../../../redux/top-sales/model';

import { IAssets } from '../../../redux/wallet/model';

const MenuDropdown = ({ data, handler }: { data: null | Collection[]; handler: (collectionName: string, collectAddress: string) => void }) => {
  return (
    <Menu className='top-sales-dropdown h-[150px] overflow-auto'>
      {data?.map((item, idx) => {
        return (
          <MenuItem key={idx} onClick={() => handler?.(item.name, item.slug)}>
            {item.name}
          </MenuItem>
        );
      })}
    </Menu>
  );
};

const PriceDropDown = ({ handler }: { handler: (sortOrder: 'ASC' | 'DESC', name: string) => void }) => {
  return (
    <Menu className='top-sales-dropdown h-[110px] overflow-auto'>
      <MenuItem key='low' onClick={() => handler('ASC', 'price')}>
        Lowest Price
      </MenuItem>
      <MenuItem key='high' onClick={() => handler('DESC', 'price')}>
        Highest Price
      </MenuItem>
    </Menu>
  );
};

export { MenuDropdown, PriceDropDown };
