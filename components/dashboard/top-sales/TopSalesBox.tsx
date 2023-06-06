import { TableData } from './model';

interface ITopSalesBox {
  data: TableData[];
  handleNavigateDetails: (id: string) => void;
}

const TopSalesBox: React.FC<ITopSalesBox> = ({ data, handleNavigateDetails }) => {
  return (
    <div className='w-full grid grid-cols-1 gap-6   xl:grid-cols-2 pt-9 px-6'>
      {data.map((sale, idx) => {
        return (
          <div key={idx} className='flex-col sm:flex-row bg-primary border-light-gray border-[1px] flex rounded' onClick={() => handleNavigateDetails(sale.slug)}>
            <div className='flex pl-7 h-[132px] sm:h-auto sm:w-1/2 items-center justify-center sm:justify-start relative pt-0 sm:pt-10 pr-3 sm:pb-9 sm:gap-5 gap-1'>
              <div>
                <h4 className='text-[22px] font-bold text-[#202B46] '>{idx + 1}</h4>
              </div>
              {/* <h4 className='absolute right-4 top-[19px] '>{sale.heart}</h4> */}
              <div className='flex items-center flex-col'>
                <div className='font-semibold flex items-center gap-3 text-base text-dark-blue leading-7'>
                  <div>
                    <img className='h-[62px] w-[62px] rounded-full object-cover min-w-[62px]' src={sale.image} alt='photo' loading='lazy' />
                  </div>
                  <div className='flex-col flex'>
                    <span className='font-semibold text-base text-[#202B46] leading-7 max-w-[95px] min-w-[95px]'>{sale.name}</span>
                    <span className='font-semibold text-sm leading-6 text-change-color'>{sale.uniquePercent}%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='border-t-2 sm:border-l-[1px] sm:border-t-0 sm:w-1/2 sm:py-5 sm:px-14 flex justify-center flex-wrap'>
              <div className='grid grid-cols-2 sm:gap-8 w-full sm:w-auto'>
                <div className='flex flex-col  h-16 sm:h-auto pl-7 sm:pl-0 justify-center sm:justify-start'>
                  <span className='text-input'>Volume</span>
                  <span className='font-medium text-sm sm:text-xs sm:font-semibold text-input'>{sale.volume}</span>
                </div>
                <div className='flex flex-col border-l-2 sm:border-l-0 h-16 sm:h-auto pl-7 sm:pl-0 justify-center sm:justify-start'>
                  <span className='text-input'> Floor Price</span>
                  <span className='font-medium text-sm sm:text-xs sm:font-semibold text-input'>{sale.floorPrice}</span>
                </div>
                <div className='flex flex-col border-t-2 sm:border-t-0 h-16 sm:h-auto pl-7 sm:pl-0 justify-center sm:justify-start'>
                  <span className='text-input'>Owners</span>
                  <span className='font-medium text-sm sm:text-xs sm:font-semibold text-input'>{sale.owners}k</span>
                </div>
                <div className='flex flex-col border-l-2 sm:border-l-0 border-t-2 sm:border-t-0 h-16 sm:h-auto pl-7 sm:pl-0 justify-center sm:justify-start'>
                  <span className='text-input'>Assets</span>
                  <span className='font-medium text-sm sm:text-xs sm:font-semibold text-input'>{}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { TopSalesBox };
