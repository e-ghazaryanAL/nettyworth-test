import React, { useEffect, useState } from 'react';

import { faChevronDown, faChevronUp, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from 'rc-dropdown';
import { useAccount } from 'wagmi';

import { getCollectionFloorPrice, getEthCurrency, getSummaryTokenStats } from '../../../api/api';
import 'rc-dropdown/assets/index.css';
import IconDetection from '../../../assets/icons/icon-detection.svg';
import CopyIcon from '../../../assets/icons/icon-duplicate.svg';
import SearchIcon from '../../../assets/icons/icon-search.svg';
import { MenuDropdown, PriceDropDown } from '../../../components/dashboard/my-nfts/Dropdown';
import NFTCard from '../../../components/dashboard/my-nfts/NFTCard';
import { Paginataion } from '../../../components/dashboard/news/Pagination';
import { Loader } from '../../../components/Loader';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import useCopy from '../../../hooks/useCopy';
import usePaginate from '../../../hooks/usePaginate';
import { ICollection, ISummaryTokens } from '../../../redux/my-nfts/model';
import { fetchMyNfts } from '../../../redux/my-nfts/myNftsSlice';
import { IAssets, IEthCurrency } from '../../../redux/wallet/model';
import { truncateAddress, USDDollarFormatter } from '../../../utils/formatter';

const initialFilter = [
  {
    name: 'price',
    val: '',
  },
  {
    name: 'collection',
    val: '',
  },
];

type FilterTypes = 'price' | 'collection';

const MyNftsPage = () => {
  const { address } = useAccount();
  const { myNfts } = useAppSelector((state) => state.myNfts);
  const [myNftsData, setMyNftsData] = useState<IAssets[] | null>();
  const [filteredData, setFilteredData] = useState<IAssets[] | null>();
  const [ethCurrency, setEthCurrency] = useState<IEthCurrency | null>();
  const [collectionSumm, setCollectionSumm] = useState(0);
  const [loading, setLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryErr, setSummErr] = useState(false);
  const { pageNumber, handlePageClick } = usePaginate();
  const [error, setError] = useState('');
  const [filterCategory, setFilterCategory] = useState(initialFilter);
  const [searchValue, setSearchvalue] = useState('');

  const dispatch = useAppDispatch();
  const { copied, copyHandler, copyRef } = useCopy(address);

  const [priceFilter, collectionFilter] = filterCategory;

  const convertCollectionTokens = () => {
    const collectionsToken: Record<string, string[]> = {};
    myNfts.assets.forEach((item) => {
      if (!collectionsToken[item.collectionAddress]) {
        collectionsToken[item.collectionAddress] = [item.collectionTokenId];
      } else {
        collectionsToken[item.collectionAddress] = [...collectionsToken[item.collectionAddress], item.collectionTokenId];
      }
    });
    return collectionsToken;
  };

  const handleCategoryFilter = (value: string, filterName: FilterTypes) => {
    setFilterCategory((prev) => {
      return prev.map((val) => (val.name === filterName ? { ...val, val: value } : val));
    });
  };

  const handleFilter = async (collectionName: string, collectAddress: string) => {
    handleCategoryFilter(collectionName, 'collection');
    const collectionAddTokens = convertCollectionTokens();
    if (myNftsData?.length) {
      const myNFTsCopy = [...myNftsData].filter((item) => item.collectionName === collectionName);
      setFilteredData(myNFTsCopy);
    }
    try {
      setSummaryLoading(true);
      const summaryData: ISummaryTokens[] = await getSummaryTokenStats(collectAddress, collectionAddTokens[collectAddress].slice(0, 10), 'usd');
      const collSum = summaryData.reduce((aggr, coll) => aggr + coll.price, 0);
      setCollectionSumm(collSum);
    } catch (e) {
      setSummErr(true);
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchvalue(e.target.value);
    if (myNftsData?.length) {
      const dataCopy = [...myNftsData].filter((item) => item.collectionName.toLowerCase().includes(e.target.value.toLowerCase()));

      setFilteredData(dataCopy);
    }
  };

  useEffect(() => {
    setFilterCategory(initialFilter);
    dispatch(fetchMyNfts({ address: address as string, page: pageNumber }));
    const ethCurrencyUsd = async () => {
      const res = await getEthCurrency();
      setEthCurrency(res);
    };
    ethCurrencyUsd();
  }, [address, pageNumber]);

  useEffect(() => {
    if (myNfts.assets.length) {
      setLoading(true);
      const collectAddress = myNfts.assets.map((item) => item.collectionAddress);
      const uniqueCollectionAddress = [...new Set(collectAddress)];
      // const collectionAddressTok = convertCollectionTokens();

      try {
        const getFloorPrice = async () => {
          const chunkedArr = [];
          let i = 0;
          while (i < uniqueCollectionAddress.length) {
            chunkedArr.push(uniqueCollectionAddress.slice(i, i + 10));
            i += 10;
          }

          // const rarityPromise: Promise<IRarityTokens[]>[] = [];

          // Object.entries(collectionAddressTok).forEach(([key, value]) => {
          //   let j = 0;
          //   while (j < value.length) {
          //     rarityPromise.push(getTokenRarityByCollection(key, value.slice(j, j + 10)));
          //     j += 10;
          //   }
          // });
          // const rarityData = await Promise.allSettled(rarityPromise);

          const promises = chunkedArr.map((chunk) => getCollectionFloorPrice(chunk));
          const results = await Promise.allSettled(promises);

          const resultValues = results.reduce((agg: ICollection[], rar) => {
            if (rar.status === 'fulfilled' && rar.value) {
              agg.push(...rar.value.collections);
            }
            return agg;
          }, []);

          const modified = myNfts.assets.map((item) => {
            const filtered = resultValues.find((val) => val.collection_address === item.collectionAddress.toLocaleLowerCase());
            return {
              ...item,
              floor: filtered?.marketplaces.find((market) => market.marketplace === 'OpenSea' || market.marketplace === 'Blur')?.floor_price,
            };
          });

          // const rarityTokens = rarityData.reduce((agg: IRarityTokens[], rar) => {
          //   if (rar.status === 'fulfilled' && rar.value) {
          //     agg.push(...rar.value);
          //   }
          //   return agg;
          // }, []);

          // const updatedAssets = modified?.map((prevState) => {
          //   const findToken = rarityTokens?.find((item) => item.token_id === prevState.collectionTokenId);
          //   return {
          //     ...prevState,
          //     rarity: findToken?.rarity_score || 0,
          //   };
          // });
          setLoading(false);

          setMyNftsData(modified);
        };
        getFloorPrice();
      } catch (e) {
        setError((e as Error).message);
        setLoading(false);
      }
    }
  }, [myNfts]);

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
          <Dropdown overlay={<MenuDropdown data={myNfts.assets} handler={handleFilter} />} trigger={['click']}>
            <div className='pl-[18px] pr-[28px] flex justify-between items-center rounded'>
              <div className='flex justify-center items-center gap-5'>
                <span>
                  <IconDetection className='w-[26px] h-[26px]' />
                </span>
                <div className='flex flex-col'>
                  <span className='text-[14px] placeholder:text-base text-dark-blue'>{collectionFilter.val || 'Filter By Collection'}</span>
                  {summaryLoading ? <div className='loader w-2 h-4'></div> : <p className='text-xs text-dark-blue font-normal'>{USDDollarFormatter(collectionSumm)}</p>}
                  {summaryErr ? <span>something went wrong</span> : null}
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
          <Dropdown overlay={<PriceDropDown handler={handleCategoryFilter} />} trigger={['click']}>
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
                  <div key={category.name} className='flex gap-[18px] items-center bg-light-gray py-2 px-4 rounded w-max' onClick={() => handleCategoryFilter('', category.name as FilterTypes)}>
                    <span className='font-medium'>{category.val}</span>
                    <FontAwesomeIcon icon={faSquareXmark} className='text-dark-blue w-[13px] h-[13px]' />
                  </div>
                );
              })}
          </div>
        )}
      </div>

      <div className='mt-5 grid grid-cols-2 place-items-center lg:grid-cols-6 gap-x-3 gap-y-4'>
        {(collectionFilter.val || searchValue) &&
          filteredData?.map((nft) => {
            return ethCurrency && <NFTCard key={nft.collectionTokenId} asset={nft} ethUSDValue={+ethCurrency.ethusd} />;
          })}
        {error && <p className='text-sm text-dark-blue'>Collections are dead</p>}
        {loading ? (
          <Loader />
        ) : (
          ethCurrency &&
          !collectionFilter.val &&
          !searchValue &&
          myNftsData
            ?.filter((item) => item.imageUrl && item.collectionName)
            .sort((a, b) => {
              const aValue = a.floor ?? 0;
              const bValue = b.floor ?? 0;
              return priceFilter.val === 'high' ? bValue - aValue : aValue - bValue;
            })
            .map((asset) => {
              return ethCurrency && <NFTCard key={asset.collectionTokenId} asset={asset} ethUSDValue={+ethCurrency.ethusd} />;
            })
        )}
      </div>
      <div className='mt-4'>
        <Paginataion className='flex' totalPages={myNfts.totalPages} handlePageClick={handlePageClick} />
      </div>
    </div>
  );
};

export default MyNftsPage;
