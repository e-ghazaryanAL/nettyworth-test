import { useEffect, useState } from 'react';

import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { ComposedChart, Line, Area, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import { useAccount } from 'wagmi';

import { getNFTValue } from '../../../api/api';
import { useAppSelector } from '../../../hooks/redux';
import useCopy from '../../../hooks/useCopy';
import { IWalletTokens } from '../../../redux/wallet/model';
import { truncateAddress, USDDollarFormatter } from '../../../utils/formatter';

const intervals = [
  // {
  //   title: '1D',
  // },
  {
    title: '1W',
  },
  {
    title: '1M',
  },
  {
    title: '3M',
  },
  {
    title: '1Y',
  },
  {
    title: 'ALL',
  },
];
type TWalletValuation = Omit<IWalletTokens & { valuation_date: string }, 'nfts_owned'>;

const CustomTooltip = ({ active, payload }: TooltipProps<string, number>) => {
  const {
    wallets: [wallet],
  } = useAppSelector((state) => state.user);
  if (active && payload && payload.length) {
    const convertedUSD = wallet?.ethUSD ? Number(payload[0].value) * wallet.ethUSD : 0;
    return (
      <div className='custom-tooltip'>
        <p className='label'>{`${moment(payload[0].payload.valuation_date).format('MM/YY')} : ${USDDollarFormatter(convertedUSD)}`}</p>
      </div>
    );
  }

  return null;
};

const PortfolioStats: React.FC = () => {
  const {
    wallets: [walletData],
  } = useAppSelector((state) => state.user);
  const { address } = useAccount();
  const { copied, copyHandler, copyRef } = useCopy(address);
  const [walletValuation, setWalletValuation] = useState<TWalletValuation[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState('ALL');

  const sortedValuation = walletValuation.sort((a, b) => new Date(a.valuation_date).getTime() - new Date(b.valuation_date).getTime());

  const data: Record<string, TWalletValuation[]> = {
    ALL: sortedValuation,
    '1M': sortedValuation.filter((wall) => {
      const currentMonth = moment().month() + 1;
      const itemMonth = moment(wall.valuation_date).month() + 1;
      return currentMonth === itemMonth;
    }),
    '1Y': sortedValuation.filter((wall) => {
      const currentYear = moment().year();
      const itemYear = moment(wall.valuation_date).year();
      return currentYear === itemYear;
    }),
    '1W': sortedValuation.filter((wall) => {
      const startOfweek = moment().startOf('week');
      const valuationWeek = moment(wall.valuation_date);
      return valuationWeek >= startOfweek;
    }),
    '3M': sortedValuation.filter((wall) => {
      const threeMonthsAgo = moment().subtract(3, 'months');
      const valuationDate = moment(wall.valuation_date);
      return valuationDate >= threeMonthsAgo;
    }),
  };

  useEffect(() => {
    if (address) {
      setLoading(true);
      const saveData = <T,>(newData: T) => {
        const currentTime = new Date().getTime();
        const dataToSave = {
          data: newData,
          timestamp: currentTime,
        };

        localStorage.setItem('myData', JSON.stringify(dataToSave));
      };
      const storageData = localStorage.getItem('myData') ?? '{}';
      const cachedData = JSON.parse(storageData);
      if (cachedData?.data) {
        const currentTime = new Date().getTime();
        const isDataValid = currentTime - cachedData.timestamp < 30 * 60 * 1000;
        if (isDataValid) {
          setWalletValuation(cachedData.data);
        } else {
          localStorage.removeItem('myData');
        }
        setLoading((prev) => !prev);
      } else {
        const getwalletValueation = async () => {
          const res = await getNFTValue({
            wallet_address: address,
            historical: true,
            include_hist_nfts: false,
          });
          if (Array.isArray(res)) {
            saveData(res);
            setWalletValuation(res);
          }
          setLoading((prev) => !prev);
        };
        getwalletValueation();
      }
    }
  }, [address]);

  return (
    <div className='dark-widget pb-6 dark:bg-dark-mode-light-blue'>
      <div className='flex justify-center md:justify-between'>
        <div className='border-lighter-gray border-r-[1px] w-1/2 pl-6 py-5 md:border-none md:w-[60%]'>
          <p className='md:font-semibold md:text-[28px]'>Portfolio</p>
          <div className='flex gap-2 items-center '>
            <p className='font-medium text-sm'>Wallet</p>
            <div className='relative inline-block' ref={copyRef}>
              <span
                className={`text-medium after:content-[""] after:border-t-transparent  after:border-l-transparent after:border-r-transparent after:border-b-transparent after:border-t-[#222] after:absolute after:border-[8px] after:ml-[6px] after:-bottom-[39%] after:left-[28px] py-3 font-bold ${
                  copied ? 'opacity-1 visible' : 'opacity-0 invisible'
                } w-[84px] flex justify-center items-center bg-[#222] text-white rounded-md absolute z-10 transition-all duration-[1s] ease -top-[60px] left-[19px] ml-[60px]`}
              >
                Copied!
              </span>
            </div>
            <p className='p-small text-primary md:p-large dark-primary' title={address}>
              {truncateAddress(address)}
            </p>
            <button title={address} className='dark-primary text-primary'>
              <FontAwesomeIcon icon={faCopy} onClick={copyHandler} />
            </button>
          </div>
        </div>
        <div className='pl-6 py-5 w-1/2 md:w-[40%]'>
          {walletData?.nettyWorth ? <p className='text-base leading-8 md:text-xl md:leading-6 font-semibold'>{USDDollarFormatter(walletData.nettyWorth)}</p> : <div className='loader'></div>}
          {/* <span className='text-light-green md:p-small md:leading-6'>+$44444</span>
          <span className='text-input ml-[10px] md:p-small'>(24.23%) This Year</span> */}
        </div>
      </div>
      <div className='border-t-[1px] md:border-none w-[99%]'>
        <div className='w-full h-[300px]'>
          <ResponsiveContainer height='100%' width='100%'>
            {!loading ? (
              <ComposedChart
                data={data[selectedInterval]}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <defs>
                  <linearGradient id='colorUv' gradientTransform='rotate(90)'>
                    <stop offset='5%' stopColor='#3CC762' stopOpacity={1} />
                    <stop offset='95%' stopColor='white' stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <Tooltip content={<CustomTooltip />} />

                <Area dataKey='wallet_value' fill='url(#colorUv)' stroke='#3CC762' />
                <Line dataKey='wallet_value' stroke='#3CC762' fill='#3CC762' />
              </ComposedChart>
            ) : (
              <div className='flex flex-col gap-14 justify-center items-center'>
                <p className='text-dark-blue'>Loading</p>
                <div className='loader'></div>
              </div>
            )}
          </ResponsiveContainer>
        </div>
      </div>
      <div className='justify-center md:justify-start flex gap-3 flex-wrap md:px-[24px]'>
        {/* <button className='py-3 px-4 bg-primary rounded text-xs flex justify-center items-center gap-2'>
          <div className='bg-red-600 w-2 h-2 rounded-full dark-red'></div>
          Live
        </button> */}
        {intervals.map((item) => {
          return data[item.title].length > 1 ? (
            <button key={item.title} className={`py-3 text-xs ${selectedInterval === item.title ? 'bg-primary-blue text-white' : 'bg-primary'}  px-3 rounded dark-red`} onClick={() => setSelectedInterval(item.title)}>
              {item.title}
            </button>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default PortfolioStats;
