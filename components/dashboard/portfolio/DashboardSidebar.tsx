import { useEffect, useState } from 'react';

import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faAnglesDown, faAnglesUp, faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { TwitterShareButton } from 'react-share';
import { useAccount } from 'wagmi';

import { PortfolioCard } from './PortfolioCard';
import { PortfolioCardList } from './PortfolioList';
import { getUserCryptoFav, getUserNFTFav, graphqlClient } from '../../../api/api';
import { getUpcomingBydate } from '../../../api/apoloQueries';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchCryptoCurrencyMount } from '../../../redux/crypto/cryptoSlice';
import { IData as UserCryptoFavourite } from '../../../redux/crypto/model';
import { IUpcomingNfts, IUpcomingPost } from '../../../redux/news/model';
import { fetchCollectionsByPage } from '../../../redux/top-sales/topSalesSlice';
import { hexToETh, USDDollarFormatter } from '../../../utils/formatter';

declare module 'react' {
  interface HTMLAttributes<T> {
    mode?: T | string;
    ucid?: string;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'form-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

const DashboardSidebar = () => {
  const { isConnected } = useAccount();
  const {
    wallets: [user],
  } = useAppSelector((state) => state.user);
  const { cryptoData } = useAppSelector((state) => state.crypto);
  const [weekdata, setWeekData] = useState<IUpcomingPost[]>([]);
  const { NftTopSalesCollections } = useAppSelector((state) => state.sales);
  const [userCrypto, setUserCrypto] = useState<UserCryptoFavourite[]>([]);

  const dispatch = useAppDispatch();
  const [accordion, setAccordion] = useState<Set<string>>(new Set());
  useEffect(() => {
    getUserCryptoFav().then((res) => {
      const data = Object.values(res);
      setUserCrypto(data as UserCryptoFavourite[]);
    });
    getUserNFTFav<{ itemId: string }[]>().then((res) => {
      const response = res.map((nft) => nft.itemId);
      dispatch(
        fetchCollectionsByPage({
          limit: 5,
          offset: 0,
          collection_id_or_slugs: response,
        })
      );
    });
    const fetchWeekData = async () => {
      const data = await graphqlClient.request<IUpcomingNfts>(
        getUpcomingBydate({
          category: 'All NFTs',
        }),
        {
          dateStart: moment().utc().startOf('day'),
          dateEnd: moment().utc().endOf('week').format(),
          symbol: 'ETH',
          freeMint: false,
          postsPerPage: 10,
        }
      );
      setWeekData(data.posts);
    };
    fetchWeekData();
    dispatch(fetchCryptoCurrencyMount({ start: 1, limit: 5 }));
  }, []);

  const handleClick = (title: string | undefined) => {
    const copySet = new Set(accordion);
    if (!copySet.has(title as string)) {
      copySet.add(title as string);
    } else {
      copySet.delete(title as string);
    }
    setAccordion(copySet);
  };

  useEffect(() => {
    if (isConnected) {
      setAccordion((prev) => {
        prev.add('NFT');
        prev.add('Crypto');
        return prev;
      });
    }
  }, [isConnected]);

  return (
    <div className='border-t-[1px] border-lighter-gray-300 px-7 bg-light-gray pt-6 pb-14 md:h-auto md:border-none'>
      <div className=''>
        <TwitterShareButton
          resetButtonStyle={false}
          url='https://nettyworth.io/'
          className='w-full bg-primary-blue hover:bg-dark-blue dark:hover:border-primary text-white py-5 px-3 rounded border-light-gray border flex justify-between items-center cursor-pointer'
          title={`I just calculated my #NFT portfolio's value on #Nettyworth and it's $${user?.nettyWorth.toFixed(2)}. Are you curious to find out how much your NFTs are worth? Head over to:`}
        >
          <p className='p-normal text-white font-normal'>Share your NettyWorth</p>
          <FontAwesomeIcon icon={faTwitter} className='w-[21px] h-[22px]' />
        </TwitterShareButton>
      </div>
      <div className='mt-4'>
        <PortfolioCard title={{ black: 'NettyWorth', blue: '' }} icon={faInfo} price={user?.nettyWorth} priceColor={'dark-values'} tooltip='NettyWorth is your total Crypto and NFT value'>
          {''}
        </PortfolioCard>
      </div>
      <div className='mt-4'>
        <PortfolioCard
          accordion={accordion}
          title={{ black: 'NFT', blue: 'Value' }}
          icon={accordion.has('NFT') && isConnected ? faAnglesUp : faAnglesDown}
          handleClick={handleClick}
          price={user?.NFTValue}
          button={
            <div className='flex'>
              {/* <button className='bg-light-gray px-4 py-1 rounded-l-lg text-light-gray text-sm font-semibold'>Floor</button>
              <button className='bg-light-gray px-4 py-1 rounded-r-lg text-light-gray text-sm font-semibold'>Trait</button> */}
            </div>
          }
        >
          <div className='flex justify-between items-center h-[34px] px-3'>
            <p className='font-normal text-sm text-dark-blue'>Total Cost</p>
            {user?.totalCost ? <p className='font-normal text-sm text-dark-blue dark-values'>{USDDollarFormatter(user.totalCost)}</p> : <div className='loader'></div>}
          </div>
          <div className='border-t px-3 pt-2'>
            <div className='flex justify-between items-center'>
              <p className='font-normal text-dark-blue text-sm'>Total Profit</p>
              <p className={`font-normal text-sm ${user?.totalProfit >= 0 ? 'text-light-green' : 'text-red-500'}`}>{USDDollarFormatter(user?.totalProfit || 0)}</p>
            </div>
          </div>
        </PortfolioCard>
      </div>
      <div className='mt-4'>
        <PortfolioCard handleClick={handleClick} accordion={accordion} title={{ black: 'Crypto', blue: 'Value' }} icon={accordion.has('Crypto') && isConnected ? faAnglesUp : faAnglesDown}>
          <div className='flex justify-between mt-4 px-3'>
            <p className='font-medium'>Total Value</p>
            <p className='font-medium dark-values'>{user?.ethUsdValue ? USDDollarFormatter(user?.ethUsdValue) : '$0.00'}</p>
          </div>
          {/* <div className='mt-3 px-3 pt-3 border-t-[1px] border-light-gray flex justify-between'>
            <p className='p-small font-medium'>Total Profit</p>
            <p className='p-small text-light-green'>+X,XXX.xx</p>
          </div> */}
        </PortfolioCard>
      </div>
      <div className='mt-4'>
        {/* <PortfolioCard title={{ black: 'My', blue: 'Favourites' }} price='Floor'>
          {favourtes.map((fav) => {
            return <PortfolioCardList key={fav.id} data={fav} />;
          })}
        </PortfolioCard> */}
        <div className='mt-4 flex flex-col'>
          <PortfolioCard title={{ black: 'NFTs', blue: 'Sales', red: 'Floor Price' }}>
            {NftTopSalesCollections?.collections
              ?.filter((nft) => nft.image_url)
              .map((sale, idx) => {
                const saleEth = sale.floor.wei ? hexToETh(sale.floor.wei).toFixed(2) : 'N/A';
                return (
                  <div key={idx} className='border-b-[1px] last:border-b-0'>
                    <div className='flex justify-between items-center px-3 py-2 border-light-gray'>
                      <div className='flex items-center'>
                        <img className='w-[25px] h-[25px] rounded' src={sale.image_url} alt='logo_image' />
                        <span className='font-medium text-xs ml-2'>{sale.name}</span>
                      </div>
                      <span className='text-xs font-normal'>{saleEth} ETH</span>
                    </div>
                  </div>
                );
              })}
          </PortfolioCard>
          <div className='w-full h-full py-2 border border-t-0 rounded-b border-light-gray flex justify-center bg-white dark-latest dark:bg-dark-mode-light-blue dark:border-dark-mode-light-blue'>
            <Link href='/nft-top-sales' className='border-[3px] max-w-[221px] mt-2 mx-auto text-md text-dark-blue w-full hover:bg-primary-blue hover:text-white target:bg-off-blue border-primary rounded h-[49px] flex justify-center items-center'>
              View Top NFTs
            </Link>
          </div>
        </div>
        <div className='mt-4'>
          <PortfolioCard title={{ black: `${userCrypto?.length ? 'Favorite' : 'Crypto'}`, blue: `${userCrypto?.length ? 'Crypto' : 'Currency'}` }} button={<p className='font-medium'>Price</p>}>
            {userCrypto?.map((crypto: any, idx) => {
              return (
                <div key={idx} className='border-b-[1px] last:border-b-0'>
                  <div className='flex justify-between items-center px-3 py-2 border-light-gray'>
                    <div className='flex items-center'>
                      <Image width={25} height={25} className='rounded object-cover' src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`} alt='logo_image' />
                      <span className='font-medium text-xs ml-2'>{crypto.name}</span>
                    </div>
                    <span className='text-xs font-normal dark-values'>{USDDollarFormatter(crypto.quote.USD.price)}</span>
                  </div>
                </div>
              );
            })}
            {!userCrypto?.length &&
              cryptoData?.data?.map((crypto, idx) => {
                return (
                  <div key={idx} className='border-b-[1px] last:border-b-0'>
                    <div className='flex justify-between items-center px-3 py-2 border-light-gray'>
                      <div className='flex items-center'>
                        <img className='w-[25px] h-[25px] rounded' src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`} alt='logo_image' />
                        <span className='font-medium text-xs ml-2'>{crypto.name}</span>
                      </div>
                      <span className='text-xs font-normal dark-values'>{USDDollarFormatter(crypto.quote.USD.price)}</span>
                    </div>
                  </div>
                );
              })}
          </PortfolioCard>
          <div className='w-full h-full py-2 border border-t-0 rounded-b border-light-gray flex justify-center bg-white dark-latest dark:bg-dark-mode-light-blue dark:border-dark-mode-light-blue'>
            <Link href='/crypto-prices' className='border-[3px] max-w-[221px] text-md text-dark-blue w-full hover:bg-primary-blue hover:text-white target:bg-off-blue border-primary rounded h-[49px] flex justify-center items-center'>
              View All Crypto
            </Link>
          </div>
        </div>
        <div className='mt-4'>
          <PortfolioCard title={{ black: 'Upcoming', blue: 'NFTS' }} button={<p className='font-medium'>Date</p>}>
            {weekdata?.map((nft, idx) => {
              return <PortfolioCardList key={idx} data={nft} />;
            })}
          </PortfolioCard>
          <div className='w-full h-full py-2 border border-t-0 rounded-b border-light-gray flex justify-center bg-white dark-latest dark:bg-dark-mode-light-blue dark:border-dark-mode-light-blue'>
            <Link href='/upcoming-Ethereum-nft-launches' className='border-[3px] max-w-[221px] mt-2 mx-auto text-md text-dark-blue w-full hover:bg-primary-blue hover:text-white target:bg-off-blue border-primary rounded h-[49px] flex justify-center items-center'>
              View All Drops
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { DashboardSidebar };
