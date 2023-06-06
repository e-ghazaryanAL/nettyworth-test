import { useEffect, useState } from 'react';

import StatisticChart from './StatisticChart';
import IconDiscord from '../../../assets/icons/icon-discord.svg';
import HeartIcon from '../../../assets/icons/icon-fave.svg';
import IconTwitter from '../../../assets/icons/icon-twitter.svg';
import IconWebsite from '../../../assets/icons/icon-website.svg';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchCryptoStats } from '../../../redux/crypto/cryptoSlice';
import { Quote, StatsInterval } from '../../../redux/crypto/model';
import { getCookie } from '../../../utils/cookies';
import { Loader } from '../../Loader';
import { USDDollarFormatter } from '../../../utils/formatter';

const CryptoDetailStats = () => {
  const {
    cryptoDetails: { data: crypto },
    cryptoMetadata,
    cryptoStats,
    statsLoading,
  } = useAppSelector((state) => state.crypto);
  const dispatch = useAppDispatch();
  const [selectedInterval, setSelectedInterval] = useState<StatsInterval>('24h');
  const id = getCookie('id');
  const symbol = getCookie('symbol');
  const [selected, setSelected] = useState('market_cap');
  const handleSelected = (item: string) => {
    setSelected(item);
  };

  const cryptoQuote = cryptoStats && symbol && cryptoStats[symbol];
  const cryptoQuotedata = cryptoQuote && cryptoQuote[0].quotes;
  const selectedValue = `quote.USD[${selected}]`;
  const handleInterval = (interval: StatsInterval) => {
    setSelectedInterval(interval);
  };

  useEffect(() => {
    if (symbol) {
      dispatch(fetchCryptoStats({ symbol, interval: selectedInterval }));
    }
  }, [selectedInterval]);

  if (!crypto?.[`${id}`]) {
    return <></>;
  }
  return (
    <div className='flex border-b min-h-[420px]'>
      <div className='w-[45%] border-r pt-7 pr-5 pb-8 flex flex-col justify-between'>
        <p className='p-small text-top-sales'>
          <span className='p-small text-primary font-normal'>NettyWorth </span>
          {crypto?.[`${id}`]?.name}
        </p>
        <div className='mt-7 rounded bg-light-blue-grey flex'>
          <div className='border-r-2 border-white px-[24px] py-6 flex justify-center items-center'>
            <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto?.[`${id}`].id}.png`} className='w-[44px] h-[44px] object-contain' alt='img' />
          </div>
          <div className='border-r-2 border-white px-[41px] py-6 flex flex-col justify-center items-center'>
            <p className='p-normal font-normal text-dark-blue'>
              {crypto?.[`${id}`].name}
              {`(${crypto?.[`${id}`].symbol})`}
            </p>
            <h1 className='text-[29px] text-dark-blue leading-[43px] font-semibold'>{USDDollarFormatter(crypto?.[`${id}`].quote.USD.price)}</h1>
          </div>
          <div className='py-6 pl-[30px] pr-[48px] flex flex-col justify-center items-center'>
            <span>Today</span>
            <p className={`${crypto?.[`${id}`].quote.USD.percent_change_24h > 0 ? 'text-light-green' : 'text-light-red'} text-[20px] leading-[30px]`}>{crypto?.[`${id}`].quote.USD.percent_change_24h.toFixed(2)}%</p>
          </div>
        </div>
        <div className='mt-5'>
          <p className='p-small line-clamp-4'>{cryptoMetadata?.[`${symbol}`]?.description}</p>
        </div>
        <div className='mt-auto'>
          <div className='flex gap-[6px]'>
            <div className='py-1 bg-grey-blue rounded pl-[9px] pr-[15px]'>
              <span className='font-medium leading-[26px]'>Rank #{crypto?.[`${id}`].cmc_rank}</span>
            </div>
            <button className='p-[10px] bg-light-blue-grey rounded'>
              <HeartIcon fill='#CCD6EE' className='w-[18px] h-[18px]' />
            </button>
            <div className='bg-light-blue-grey py-[10px] px-2 rounded'>
              <a href='https://discord.com/' target='_blank' rel='noreferrer'>
                <IconDiscord fill='#006fff' className='w-[18px] h-[18px]' />
              </a>
            </div>
            <div className='bg-light-blue-grey py-[10px] px-2 rounded'>
              <a href={`${cryptoMetadata?.[`${symbol}`]?.urls.twitter[0] || `https://twitter.com/${symbol}`}`} target='_blank' rel='noreferrer'>
                <IconTwitter fill='#006fff' className='w-[18px] h-[18px]' />
              </a>
            </div>
            <div className='bg-light-blue-grey py-[10px] px-2 rounded'>
              <a href={`${cryptoMetadata?.[`${symbol}`]?.urls.website[0]}`} target='_blank' rel='noreferrer'>
                <IconWebsite fill='#006fff' className='w-[18px] h-[18px]' />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className='w-[55%] px-[34px] pt-[32px] pb-6'>
        <div className='flex justify-between items-start'>
          <div className=''>
            <p className='text-[20px] leading-6 font-semibold text-dark-blue'>{USDDollarFormatter(crypto?.[`${id}`].quote.USD[selected] as number)}</p>
            {/* <p className='text-[14px] leading-6 font-normal'>
              <span className='text-[14px] leading-6 font-normal text-light-green'></span>
              (24.23%) This Year
            </p> */}
          </div>
          <div className='grid grid-cols-2 border w-[193px] h-[44px] rounded'>
            <button className={`text-[11px] leading-[19px] border-r ${selected === 'price' ? 'font-semibold bg-white text-primary' : 'bg-light-blue-grey text-input'}`} onClick={() => handleSelected('price')}>
              Price
            </button>
            <button className={`text-[11px] leading-[19px] ${selected === 'market_cap' ? 'font-semibold bg-white text-primary' : 'bg-light-blue-grey text-input'}`} onClick={() => handleSelected('market_cap')}>
              Market Cap
            </button>
          </div>
        </div>
        <div className='mt-[72px]'>
          <div className='mt-[72px]'>{statsLoading ? <Loader /> : <StatisticChart setQuoteInterval={handleInterval} crypto data={cryptoQuotedata as Quote[]} areaKey={selectedValue} quoteInterval={selectedInterval} />}</div>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetailStats;
