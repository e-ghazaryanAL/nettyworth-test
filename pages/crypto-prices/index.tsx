import { useEffect, useMemo, useRef, useState } from 'react';

import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';

import HeartIcon from '../../assets/icons/icon-fav-heart.svg';
import CryptoFilter from '../../components/dashboard/crypto-prices/CryptoFilter';
import { TableUi } from '../../components/dashboard/top-sales/TableUi';
import { TopSalesHeading } from '../../components/dashboard/top-sales/TopSalesHeading';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useAuthenticate from '../../hooks/useAuthenticate';
import useFavourite from '../../hooks/useFavourites';
import { fetchCryptoCurrency, fetchCryptoCurrencyMount } from '../../redux/crypto/cryptoSlice';
import { setCookie } from '../../utils/cookies';
import { formatCash, USDDollarFormatter } from '../../utils/formatter';

const mobileColumns = ['name', 'price', 'id', 'heart'];
interface ITableData {
  heart?: JSX.Element;
  id: JSX.Element;
  name: JSX.Element;
  price: number;
  dayPercent: number;
  weekPercent: number;
  marketCup: number;
  volumeDay: number;
  supply: JSX.Element;
}

const CryptoPricePage = () => {
  const dispatch = useAppDispatch();
  const { cryptoData, loading } = useAppSelector((state) => state.crypto);
  const { isConnected } = useAccount();
  const { favorites, handleLikeToggle, setFavorites } = useFavourite();
  const [tableData, setTableData] = useState<ITableData[]>([]);
  const [filterCrypto, setFilterCrypto] = useState({ interval: 'dayPercent', name: 'Last 24 hours' });
  const [cryptoSymbol, setCryptoSymbol] = useState({ symbol: '', sign: '$', name: '' });
  const dayColumnRef = useRef<HTMLDivElement>(null);
  const weekColumnRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const isAuth = useAuthenticate();
  console.log({ favorites });
  const cryptoColumns = useMemo(() => {
    return [
      {
        Header: '',
        accessor: 'heart',
      },
      {
        Header: '',
        accessor: 'id',
      },
      {
        Header: 'CRYPTO',
        accessor: 'name',
      },
      {
        Header: 'PRICE',
        accessor: 'price',
        Cell: (props: { value: string }) => {
          return <p className='font-medium text-[14px] text-input'>{USDDollarFormatter(Number(props.value), cryptoSymbol.symbol || 'USD')}</p>;
        },
      },
      {
        Header: '24H%',
        accessor: 'dayPercent',
        Cell: (props: { value: number }) => {
          return <p className={`font-medium text-[14px] ${props.value > 0 ? 'text-change-color' : 'text-light-red'}`}>{Math.abs(props.value).toFixed(2)}%</p>;
        },
        sortDescFirst: true,
      },
      {
        Header: '7D%',
        accessor: 'weekPercent',
        Cell: (props: { value: number }) => {
          return <p className={`font-medium text-[14px] ${props.value > 0 ? 'text-change-color' : 'text-light-red'}`}>{Math.abs(props.value).toFixed(2)}%</p>;
        },
        sortDescFirst: true,
      },
      {
        Header: 'MARKET CAP',
        accessor: 'marketCup',
        Cell: (props: { value: number }) => {
          return (
            <p className='font-medium text-[14px} text-input'>
              {cryptoSymbol.sign}
              {formatCash(props.value)}
            </p>
          );
        },
      },
      {
        Header: 'VOLUME(24H)',
        accessor: 'volumeDay',
        Cell: (props: { value: number }) => {
          return (
            <p className='font-medium text-[14px} text-input'>
              {cryptoSymbol.sign}
              {formatCash(props.value)}
            </p>
          );
        },
      },
      {
        Header: 'SUPPLY',
        accessor: 'supply',
      },
    ];
  }, [cryptoSymbol.symbol]);

  const currencyFilter = (symbol: string, sign: string, name: string) => {
    setCryptoSymbol((prev) => (prev.symbol !== symbol ? { sign, symbol, name } : prev));
  };
  const onScroll = () => {
    if (cryptoData.data.length > 99) return;
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
      setPage(cryptoData.data.length + 1);
    }
  };

  useEffect(() => {
    dispatch(
      fetchCryptoCurrency({
        start: page,
        limit: 10,
        convert: cryptoSymbol.symbol || 'USD',
      })
    );
  }, [page, cryptoSymbol, isConnected]);

  useEffect(() => {
    dispatch(fetchCryptoCurrencyMount({ start: 1, limit: 20, convert: cryptoSymbol.symbol || 'USD' }));
  }, [cryptoSymbol.symbol, isConnected]);

  useEffect(() => {
    if (isAuth) {
      const userFavCrypto = cryptoData.favourites;
      const modified = userFavCrypto.map((fav) => fav.itemId);
      setFavorites(new Set(modified));
    }
  }, [cryptoData.data.length]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [cryptoData.data.length]);

  const handleFilter = (interval: string, name: string) => {
    setFilterCrypto((prev) => (prev.interval !== interval ? { name, interval } : prev));
    if (interval === 'dayPercent') {
      dayColumnRef?.current?.click();
    }
    if (interval === 'weekPercent') {
      weekColumnRef?.current?.click();
    }
  };

  useEffect(() => {
    if (cryptoData.data.length) {
      const filteredData = cryptoData?.data?.map((crypto, idx) => {
        const supplyBarPercent = `${crypto.max_supply ? ((crypto.total_supply * 100) / crypto.max_supply).toFixed(0) : 0}%`;
        return {
          ...(isAuth && {
            heart: (
              <button onClick={(e) => handleLikeToggle(e, { itemId: `${crypto.id}`, category: 'CryptoSales' })}>
                <HeartIcon className='w-4 h-4' fill={`${favorites.has(crypto.id) ? '#ff066a' : '#A9B0C4'}`} />
              </button>
            ),
          }),
          id: <h6 className='font-bold'>{idx + 1}</h6>,
          name: (
            <div className='flex gap-2 lg:gap-7 -ml-[25px] lg:ml-0 items-center'>
              <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`} className='w-[40px] h-[40px]' />
              <span className='font-medium text-dark-blue'>{crypto.name}</span>
            </div>
          ),
          price: crypto.quote[cryptoSymbol.symbol || 'USD']?.price || 0,
          dayPercent: crypto.quote[cryptoSymbol.symbol || 'USD']?.percent_change_24h || 0,
          weekPercent: crypto.quote[cryptoSymbol.symbol || 'USD']?.percent_change_7d || 0,
          marketCup: crypto.quote[cryptoSymbol.symbol || 'USD']?.market_cap || 0,
          volumeDay: crypto.quote[cryptoSymbol.symbol || 'USD']?.volume_24h || 0,
          supply: (
            <div className='flex flex-col justify-center items-end'>
              <p className='font-medium text-[14px] text-input'>
                {USDDollarFormatter(Math.round(crypto.total_supply))} {crypto.symbol}{' '}
              </p>
              <div className='w-[50%] h-1 rounded bg-grey-input'>
                <div className='rounded h-full bg-primary-blue' style={{ width: supplyBarPercent }}></div>
              </div>
            </div>
          ),
          slug: crypto.slug,
          cryptoId: crypto.id,
          symbol: crypto.symbol,
        };
      });
      setTableData(filteredData);
    }
  }, [cryptoData?.data, isAuth, favorites]);

  const handleNavigate = (slug: string, symbolId: string | undefined, symbol: string | undefined) => {
    if (symbol && symbolId) {
      setCookie('symbol', symbol);
      setCookie('id', symbolId);
    }
    const currentPathname = router.pathname;
    const newSlug = `${currentPathname}/${slug}`;

    router.push(newSlug);
  };

  return (
    <div className='pt-5 h-full bg-white flex flex-col pb-20 max-w-[1300px] 2xl:mx-auto md:pb-8'>
      <TopSalesHeading crypto title='Live Crypto Prices' text='View live crypto prices today from Bitcoin (BTC), Ethereum (ETH), Cardano (ADA), Solana (SOL), Ape Coin (APE), and more. Get real-time data on prices, market cap, volume, and total supply to help you manage your crypto portfolio.' />
      <CryptoFilter handleFilter={handleFilter} filters={filterCrypto} handleCurr={currencyFilter} cryptoFilters={cryptoSymbol} />
      <div className='mt-7 ml-5'>
        <div className='hidden lg:block'>{<TableUi crypto columns={cryptoColumns} data={tableData} handleNavigateDetails={handleNavigate} loading={loading} dayColumnRef={dayColumnRef} weekColumnREf={weekColumnRef} />}</div>
        <div className='block lg:hidden'>
          <TableUi
            columns={cryptoColumns.filter((column) => {
              return mobileColumns.includes(column.accessor);
            })}
            data={tableData}
            handleNavigateDetails={handleNavigate}
            loading={loading}
            crypto
          />
        </div>
        {(cryptoData.data.length !== tableData.length || loading) && <span className='text-[30px] mb-10 block'>loading...</span>}
      </div>
    </div>
  );
};

export default CryptoPricePage;
