type TopSalesHeadingProps = {
  title: string;
  text: string;
  crypto?: boolean;
};

const TopSalesHeading: React.FC<TopSalesHeadingProps> = ({ title, text, crypto }) => {
  return (
    <div className='pl-7 pb-6 md:pb-[34px] pr-6'>
      <span className='text-primary text-sm leading-[24px] font-semibold'>{!crypto && 'NFT'}</span>
      <span className='text-top-sales text-sm leading-6'> {title}</span>
      <div className='md:pt-6 text-dark-blue max-w-[553px]'>
        <h4 className='font-semibold mb-[6px] hidden md:block'>{title}</h4>
        <span className='font-bold mb-[6px] md:hidden text-[27px]'>{crypto ? 'Live' : 'Top'}</span> <span className='font-bold mb-[6px] md:hidden text-[27px] text-primary'>{crypto ? 'Crypto Prices' : 'Sales'}</span>
        <p className='leading-[21px] md:leading-[26px] font-medium md:font-normal text-[14px]'>{text}</p>
      </div>
    </div>
  );
};
export { TopSalesHeading };
