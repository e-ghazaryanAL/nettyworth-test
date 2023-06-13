import React, { useEffect, useState } from 'react';

import { faChevronDown, faChevronUp, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from 'rc-dropdown';
import { useAccount } from 'wagmi';

import 'rc-dropdown/assets/index.css';
import { getMultipleAssets, getTopSalesCollection, getWalletUpshot } from '../../../api/api';
import IconDetection from '../../../assets/icons/icon-detection.svg';
import CopyIcon from '../../../assets/icons/icon-duplicate.svg';
import SearchIcon from '../../../assets/icons/icon-search.svg';
import { MenuDropdown, PriceDropDown } from '../../../components/dashboard/my-nfts/Dropdown';
import NFTCard from '../../../components/dashboard/my-nfts/NFTCard';
import { Paginataion } from '../../../components/dashboard/news/Pagination';
import { Loader } from '../../../components/Loader';
import useCopy from '../../../hooks/useCopy';
import { useDebounce } from '../../../hooks/useDebounce';
import usePaginate from '../../../hooks/usePaginate';
import { Collection } from '../../../redux/top-sales/model';
import { Asset, ITraitMetadata } from '../../../redux/top-sales/upshotmodel';
import { truncateAddress, USDDollarFormatter } from '../../../utils/formatter';

const initialFilter = [
  {
    name: 'price',
    val: '',
    selected: '',
  },
  {
    name: 'collection',
    val: '',
    selected: '',
  },
];

interface WalletAssets {
  assets: (Asset & { floor: number; traitFloor: number })[];
  count: number;
}

const MyNftsPage = () => {
  const { address } = useAccount();
  const [walletsOwned, setWalletsOwned] = useState<WalletAssets | null>(null);
  const [walletsCollections, setWalletCollections] = useState<Collection[] | null>(null);
  const { pageNumber, handlePageClick } = usePaginate();
  const limit = 20;
  const [filterCategory, setFilterCategory] = useState(initialFilter);
  const [searchValue, setSearchvalue] = useState('');
  const [searchCollection, setSearchCollection] = useState<string[]>([]);
  const debouncedVal = useDebounce(searchValue);
  const { copied, copyHandler, copyRef } = useCopy(address);

  const [priceFilter, collectionFilter] = filterCategory;
  const collectionSum = walletsOwned?.assets.reduce((prev, asset) => {
    const assetFloor = asset?.floor || 0;
    return prev + assetFloor;
  }, 0);
  useEffect(() => {
    const getWalletAssets = async () => {
      if (address) {
        const res = await getWalletUpshot<WalletAssets>(
          {
            walletAddress: address,
            limit,
            offset: (pageNumber - 1) * limit,
            include_count: true,
            ...((collectionFilter.val || searchCollection.length) && { collection_id_or_slugs: searchCollection.length ? searchCollection : [collectionFilter.selected] }),
            ...(priceFilter.val && { sort_direction: priceFilter.selected as 'ASC' | 'DESC' }),
          },
          'assets/owned'
        );
        if (!res) return;
        const filteredCollections = res.assets.map((coll) => coll.address);
        const filteredAssetsIds = res.assets.map((asset) => asset.id);

        const userCollections = await getTopSalesCollection<{ collections: Collection[] }>({
          collection_id_or_slugs: filteredCollections,
        });
        const assetsTraits = await getMultipleAssets<Asset<ITraitMetadata[]>[]>({
          asset_ids: filteredAssetsIds,
          include_trait_stats: true,
        });
        const assetsFloor = res.assets.map((asset) => {
          const existColl = userCollections.collections.find((nft) => nft.id === asset.address);
          const existTrait = assetsTraits.find((token) => token.id === asset.id);
          const highestTraitFloorUSD = existTrait?.traits.reduce((max, obj) => {
            const floorUsd = obj.floor?.usd || 0;
            return floorUsd > max ? obj.floor.usd : max;
          }, 0);

          return {
            ...asset,
            floor: existColl?.floor.usd || 0,
            traitFloor: highestTraitFloorUSD || 0,
          };
        });
        setWalletsOwned({
          assets: assetsFloor,
          count: res.count,
        });
      }
    };
    getWalletAssets();
  }, [address, pageNumber, priceFilter.val, collectionFilter.val, debouncedVal]);

  useEffect(() => {
    const getWalletCollections = async () => {
      if (address) {
        const res = await getWalletUpshot<{ collections: Collection[] }>(
          {
            walletAddress: address,
          },
          'collections/owned'
        );
        setWalletCollections(res.collections);
      }
    };
    getWalletCollections();
  }, []);

  const handleFilter = async (collectionName: string, collectAddress: string) => {
    setFilterCategory((prev) => {
      return prev.map((val) => (val.name === 'collection' ? { ...val, val: collectionName, selected: collectAddress } : val));
    });
  };
  const handleSort = async (sortOrder: 'ASC' | 'DESC', name: string) => {
    setFilterCategory((prev) => {
      return prev.map((val) => (val.name === name ? { ...val, selected: sortOrder, val: sortOrder === 'DESC' ? 'Highest' : 'Lowest' } : val));
    });
  };
  const handleCategoryFilter = (name: string) => {
    setFilterCategory((prev) => {
      return prev.map((val) => (val.name === name ? { ...val, val: '' } : val));
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchvalue(e.target.value);
    const searchName = e.target.value.toLowerCase();
    const uniqueSlugs = new Set<string>();

    walletsOwned?.assets.forEach((asset) => {
      if (asset.name.toLowerCase().includes(searchName)) {
        uniqueSlugs.add(asset.address);
      }
    });

    setSearchCollection(searchName ? [...uniqueSlugs] : []);
  };
  return (
    <div className='pt-5 px-8 pb-16 md:pb-4 max-w-[1300px] 2xl:mx-auto'>
      <div className=''>
        <h1 className='text-dark-blue text-[40px] font-bold'>
          MY <span className='text-[40px] font-bold text-primary'>NFTs</span>
        </h1>
        <div className='flex gap-[10px]'>
          <p className='text-sm font-medium'>
            Wallet <span className='text-sm text-primary'>{truncateAddress(address)}</span>
          </p>
          <div className='flex'>
            <button title={address} onClick={copyHandler}>
              <CopyIcon className='w-[13px] h-[13px]' />
            </button>
            <div className='relative' ref={copyRef}>
              <span className={` ${copied ? 'opacity-1 visible' : 'opacity-0 invisible'} w-[84px] flex justify-center items-center bg-[#222] text-white rounded-md absolute z-10 transition-all duration-[1s] ease -top-[14px] -right-8`}>Copied!</span>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col pl-[13px] lg:flex-row border rounded mt-[22px] bg-light-blue-grey py-4 px-[14px] gap-3 xl:flex-nowrap'>
        <div className='lg:max-w-[417px] py-[22px] w-full bg-white dark:border'>
          <Dropdown overlay={<MenuDropdown data={walletsCollections} handler={handleFilter} />} trigger={['click']}>
            <div className='pl-[18px] pr-[28px] flex justify-between items-center rounded'>
              <div className='flex justify-center items-center gap-5'>
                <span>
                  <IconDetection className='w-[26px] h-[26px]' />
                </span>
                <div className='flex flex-col'>
                  <span className='text-[14px] placeholder:text-base text-dark-blue'>{collectionFilter?.val || 'Filter By Collection'}</span>
                  {!collectionSum ? <div className='loader w-2 h-4'></div> : <p className='text-xs text-dark-blue font-normal'>{USDDollarFormatter(collectionSum)}</p>}
                  {/* {summaryErr ? <span>something went wrong</span> : null} */}
                </div>
              </div>
              <span className='flex flex-col text-input'>
                <FontAwesomeIcon icon={faChevronUp} className='text-[10px]' />
                <FontAwesomeIcon icon={faChevronDown} className='-mt-[3px] text-[10px]' />
              </span>
            </div>
          </Dropdown>
        </div>
        <div className='lg:max-w-[235px] w-full 2xl:max-w-[390px] dark:border'>
          <Dropdown overlay={<PriceDropDown handler={handleSort} />} trigger={['click']}>
            <div className='pl-6 pr-[28px] lg:pr-4 h-full py-[22px] bg-white flex gap-[85px] justify-between items-center rounded'>
              <span className='text-[14px] placeholder:text-base text-dark-blue'>Sort by Price</span>
              <span className='flex flex-col text-input'>
                <FontAwesomeIcon icon={faChevronUp} className='text-[10px]' />
                <FontAwesomeIcon icon={faChevronDown} className='-mt-[3px] text-[10px]' />
              </span>
            </div>
          </Dropdown>
        </div>
        <div className='relative w-full'>
          <input value={searchValue} className='h-full text-sm text-dark-blue px-[50px] rounded w-full lg:w-[424px] py-[22px]' onChange={handleSearch} placeholder='Type the NFT your looking for here' />
          <button className='absolute top-0 bottom-0 left-[17px]'>
            <SearchIcon fill='#006fff' className='w-[24px] h-[24px]' />
          </button>
        </div>
      </div>
      <div className='mt-6'>
        {filterCategory.some((item) => item.val) && (
          <div className='flex gap-2'>
            {filterCategory
              .filter((categ) => categ.val)
              .map((category) => {
                return (
                  <div key={category.name} className='flex gap-[18px] items-center bg-light-gray py-2 px-4 rounded w-max' onClick={() => handleCategoryFilter(category.name)}>
                    <span className='font-medium'>{category.val}</span>
                    <FontAwesomeIcon icon={faSquareXmark} className='text-dark-blue w-[13px] h-[13px]' />
                  </div>
                );
              })}
          </div>
        )}
      </div>

      <div className='mt-5 grid grid-cols-2 place-items-center lg:grid-cols-6 gap-x-3 gap-y-4'>
        {!walletsOwned?.assets.length ? (
          <Loader />
        ) : (
          walletsOwned?.assets.slice(0, 20).map((nft) => {
            return <NFTCard key={nft.id} asset={nft} />;
          })
        )}
      </div>
      <div className='mt-4'>
        <Paginataion className='flex' totalPages={walletsOwned?.count ? Math.ceil(walletsOwned.count / limit) : 1} handlePageClick={handlePageClick} />
      </div>
    </div>
  );
};

export default MyNftsPage;
