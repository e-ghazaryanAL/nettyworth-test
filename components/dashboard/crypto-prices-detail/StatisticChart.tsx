import { Area, ComposedChart, Line, ResponsiveContainer } from 'recharts';

import { Quote, StatsInterval } from '../../../redux/crypto/model';

const intervals = [
  {
    title: '1D',
    value: '24h',
  },
  {
    title: '1W',
    value: '7d',
  },
  {
    title: '1M',
    value: '30d',
  },
  // {
  //   title: '3M',
  //   value: '90d',
  // },
  // {
  //   title: '1Y',
  //   value: '365d',
  // },
  // {
  //   title: 'ALL',
  //   value: 'yearly',
  // },
];

type StatisticChartProps = {
  crypto?: boolean;
  data: Quote[];
  areaKey: string;
  setQuoteInterval: (interval: StatsInterval) => void;
  quoteInterval: StatsInterval;
};
const StatisticChart: React.FC<StatisticChartProps> = ({ crypto, data, areaKey, setQuoteInterval, quoteInterval }) => {
  return (
    <div>
      <div className={`${crypto ? 'w-[100%]' : 'w-[99%]'}`}>
        <div className={`${crypto ? 'w-full' : 'max-w-[500px]'} h-[192px]`}>
          <ResponsiveContainer height='100%' width='100%'>
            <ComposedChart
              data={data}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 0,
              }}
            >
              <defs>
                <linearGradient id='colorUv' gradientTransform='rotate(90)'>
                  <stop offset='5%' stopColor='#3CC762' stopOpacity={1} />
                  <stop offset='95%' stopColor='white' stopOpacity={0.2} />
                </linearGradient>
              </defs>
              {/* <Tooltip content={<CustomTooltip />} /> */}

              <Area dataKey={areaKey} fill='url(#colorUv)' stroke='#3CC762' />
              <Line dataKey={areaKey} stroke='#3CC762' fill='#3CC762' />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className='justify-center md:justify-start flex gap-3 flex-wrap'>
        {/* <button className='py-3 px-4 bg-primary rounded text-xs flex justify-center items-center gap-2'>
          <div className='bg-red-600 w-2 h-2 rounded-full dark-red'></div>
          Live
        </button> */}
        {intervals.map((item, idx) => {
          return (
            <button key={idx} className={`py-2 text-xs ${item.value === quoteInterval ? 'bg-primary-blue text-white' : 'bg-primary text-input'} px-3 rounded dark-red`} onClick={() => setQuoteInterval(item.value as StatsInterval)}>
              {item.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StatisticChart;
