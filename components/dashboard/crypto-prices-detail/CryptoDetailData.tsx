import { useAppSelector } from '../../../hooks/redux';
import { getCookie } from '../../../utils/cookies';
import { USDDollarFormatter } from '../../../utils/formatter';

const CryptoDetailData = () => {
  const {
    cryptoDetails: { data: crypto },
  } = useAppSelector((state) => state.crypto);
  const id = getCookie('id');

  const statData = [
    {
      text: 'Price',
      val: <span className='text-[15px] leading-5 text-top-sales font-semibold'>{USDDollarFormatter(crypto?.[`${id}`]?.quote.USD.price || 0)}</span>,
    },
    {
      text: 'Market Cap',
      val: <span className='text-[15px] leading-5 text-top-sales font-semibold'>{USDDollarFormatter(crypto?.[`${id}`]?.quote.USD.market_cap || 0)}</span>,
    },
    {
      text: 'Volume',
      val: <span className='text-[15px] leading-5 text-top-sales font-semibold'>{USDDollarFormatter(crypto?.[`${id}`]?.quote.USD.volume_24h || 0)}</span>,
    },
    {
      text: 'Circulating Supply',
      val: <span className='text-[15px] leading-5 text-top-sales font-semibold'>{USDDollarFormatter(crypto?.[`${id}`]?.circulating_supply || 0)}</span>,
    },
    {
      text: '+/- 24 Hours',

      val: <p className='text-[15px] leading-5 text-top-sales'>{crypto?.[`${id}`]?.quote.USD.percent_change_24h.toFixed(2)} %</p>,
    },
    {
      text: '+/- 7 Days',
      val: <p className='text-[15px] leading-5 text-top-sales'>{crypto?.[`${id}`]?.quote.USD.percent_change_7d.toFixed(2)} %</p>,
    },
    {
      text: '+/- Months',
      val: <p className='text-[15px] leading-5 text-top-sales'>{crypto?.[`${id}`]?.quote.USD.percent_change_30d.toFixed(2)} %</p>,
    },
    {
      text: '+/- Year',
      val: <p className='text-[15px] leading-5 text-dark-blue'>N/A</p>,
    },
  ];
  if (!crypto?.[`${id}`]) {
    return <></>;
  }
  return (
    <div className='mt-5'>
      <p className='p-normal text-dark-blue font-semibold'>
        Crypto
        <span className='text-[18px] leading-[26px] font-semibold text-primary'> Data</span>
      </p>
      <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4'>
        {statData.map((item, idx) => {
          return (
            <div key={idx} className='flex flex-col border justify-center py-12 items-center bg-primary-grey  max-w-[281px] xl:max-w-none'>
              <p className='text-[11px] leading-5 text-dark-blue font-normal'>{item.text}</p>
              {item.val}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CryptoDetailData;
