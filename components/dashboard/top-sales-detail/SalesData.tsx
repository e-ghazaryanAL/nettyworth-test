import { useAppSelector } from '../../../hooks/redux';
import { hexToETh } from '../../../utils/formatter';
import { Loader } from '../../Loader';

const SalesData = () => {
  const { Collection, loading } = useAppSelector((state) => state.sales);
  return loading ? (
    <Loader />
  ) : (
    <div className='mt-[21px]  w-[374px] md:w-full grid grid-cols-2 lg:grid-cols-6 border bg-light-blue-grey'>
      <div className='py-[25px] px-[31px] flex flex-col justify-center items-center border-b border-r md:border-b-0'>
        <p className='text-[11px] leading-5 font-normal text-top-sales'>Assets</p>
        <p className='text-[13px] leading-5 font-bold text-top-sales'>{Collection?.num_assets ?? 'N/A'}</p>
      </div>
      <div className='py-[25px] px-[31px] flex flex-col justify-center items-center md:border-r'>
        <p className='text-[11px] leading-5 font-normal text-top-sales'>Owners</p>
        <p className='text-[13px] leading-5 font-bold text-top-sales'>{Collection?.num_owners}</p>
      </div>
      <div className='py-[25px] px-[31px] flex flex-col justify-center items-center border-t border-r lg:border-t-0'>
        <p className='text-[11px] leading-5 font-normal text-top-sales'>Volume</p>
        <p className='text-[13px] leading-5 font-bold text-top-sales'>{hexToETh(Collection?.volume.wei_all_time).toFixed(2)} ETH</p>{' '}
      </div>
      <div className='py-[25px] px-[31px] flex flex-col justify-center items-center border-t md:border-r lg:border-t-0'>
        <p className='text-[11px] leading-5 font-normal text-top-sales'>Floor Price</p>
        <p className='text-[13px] leading-5 font-bold text-top-sales'>{hexToETh(Collection?.floor.wei).toFixed(2) ?? 'N/A'} ETH</p>{' '}
      </div>
      <div className='py-[25px] px-[31px] flex flex-col justify-center items-center border-t border-r lg:border-t-0'>
        <p className='text-[11px] leading-5 font-normal text-top-sales'>24H%</p>
        <p className={`text-[13px] leading-5 font-bold ${Collection?.volume?.change.wei_1d && Collection?.volume?.change.wei_1d < 0 ? 'text-light-red' : 'text-light-green'}`}>{`${Collection?.volume?.change.wei_1d} %` ?? 'N/A'}</p>
      </div>
      <div className='py-[25px] px-[31px] flex flex-col justify-center items-center border-t lg:border-t-0'>
        <p className='text-[11px] leading-5 font-normal text-top-sales'>7D%</p>
        <p className={`text-[13px] leading-5 font-bold ${Collection?.volume.change.wei_7d && Collection?.volume.change.wei_7d < 0 ? 'text-light-red' : 'text-light-green'}`}>{`${Collection?.volume.change.wei_7d}%` ?? 'N/A'}</p>
      </div>
      <div className='py-[25px] px-[31px] flex flex-col justify-center items-center border-t border-r'>
        <p className='text-[11px] leading-5 font-normal text-top-sales text-center'>7D AVG Sale Price</p>
        <p className='text-[13px] leading-5 font-bold text-top-sales'>{hexToETh(Collection?.average.wei_7d).toFixed(2) ?? 'N/A'}</p>
      </div>
      <div className='py-[25px] px-[31px] flex flex-col justify-center items-center border-t md:border-r'>
        <p className='text-[11px] leading-5 font-normal text-top-sales'>Sales Last 7D</p>
        <p className='text-[13px] leading-5 font-bold text-top-sales'>{Collection?.num_sales.num_7d ?? 'N/A'}</p>
      </div>
      <div className='py-[25px] px-[31px] flex flex-col justify-center items-center border-t border-r'>
        <p className='text-[11px] leading-5 font-normal text-top-sales'>Sales Last 24H</p>
        <p className='text-[13px] leading-5 font-bold text-top-sales'>{Collection?.num_sales.num_1d ?? 'N/A'}</p>
      </div>
      <div className='py-[25px] px-[31px] flex flex-col justify-center items-center border-t md:border-r'>
        <p className='text-[11px] leading-5 font-normal text-top-sales'>Sales Last Month</p>
        <p className='text-[13px] leading-5 font-bold text-top-sales'>{Collection?.num_sales.num_30d ?? 'N/A'}</p>
      </div>
      <div className='py-[25px] px-[31px] flex flex-col justify-center items-center border-t border-r'>
        <p className='text-[11px] leading-5 font-normal text-top-sales'>Twitter Followers</p>
        <p className='text-[13px] leading-5 font-bold text-top-sales'>N/A</p>
      </div>
      <div className='py-[25px] px-[31px] flex flex-col justify-center items-center border-t'>
        <p className='text-[11px] leading-5 font-normal text-top-sales'>Discord Followers</p>
        <p className='text-[13px] leading-5 font-bold text-top-sales'>N/A</p>
      </div>
    </div>
  );
};

export default SalesData;
