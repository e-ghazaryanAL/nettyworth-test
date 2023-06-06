import Menu, { Item as MenuItem } from 'rc-menu';

import { IAssets } from '../../../redux/wallet/model';

const MenuDropdown = ({ data, handler }: { data: IAssets[]; handler: (collectionName: string, collectAddress: string) => void }) => {
  const modified = data?.filter((val, i, self) => {
    return i === self.findIndex((nft) => nft.collectionName === val.collectionName && nft.collectionName);
  });

  return (
    <Menu className='top-sales-dropdown h-[150px] overflow-auto'>
      {modified?.map((item, idx) => {
        return (
          <MenuItem key={idx} onClick={() => handler?.(item.collectionName, item.collectionAddress)}>
            {item.collectionName}
          </MenuItem>
        );
      })}
    </Menu>
  );
};

const PriceDropDown = ({ handler }: { handler: (order: string, filterName: 'price' | 'collection') => void }) => {
  return (
    <Menu className='top-sales-dropdown h-[110px] overflow-auto'>
      <MenuItem key='low' onClick={() => handler('low', 'price')}>
        Lowest Price
      </MenuItem>
      <MenuItem key='high' onClick={() => handler('high', 'price')}>
        Highest Price
      </MenuItem>
    </Menu>
  );
};

export { MenuDropdown, PriceDropDown };
