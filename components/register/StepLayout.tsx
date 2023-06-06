import SearchIcon from '../../assets/icons/icon-search.svg';

type StepLayoutProps = {
  children: React.ReactNode;
  placeholder: string;
  projectName: string;
  nextStep: () => void;
  withoutInput?: boolean;
  search?: string;
  setSearch?: (val: string) => void;
  connectorStep?: boolean;
  alertStep?: boolean;
};

const StepLayout: React.FC<StepLayoutProps> = ({ children, placeholder, projectName, nextStep, withoutInput, search, setSearch, connectorStep, alertStep }) => {
  return (
    <div className={`flex flex-col justify-between gap-[167px] ${connectorStep ? `${alertStep ? 'gap-[167px]' : 'gap-3'} w-[349px]` : 'gap-[167px] w-[334px]'}`}>
      <div className={`${withoutInput ? '' : 'mt-[11px]'}`}>
        {!withoutInput ? (
          <div className='relative'>
            <input type='text' placeholder={placeholder} value={search} onChange={(e) => setSearch?.(e.target.value)} className='w-[334px] bg-primary-grey h-[50px] pl-[54px] border border-lighter-gray-300 rounded placeholder:text-sm placeholder:text-[#465272]' />
            <SearchIcon className='absolute top-1/2 left-5 transform -translate-x-1/2 -translate-y-1/2  w-[18px] h-[18px]' fill='#066FFF' />
          </div>
        ) : (
          <></>
        )}
        <div className='mt-[42px]'>
          <p className='text-[16px] text-dark-blue leading-[21px] font-semibold'>
            {!withoutInput ? 'Add Popular' : `${!connectorStep ? 'Setup your Netty' : 'Connect your'}`} <span className='text-[16px] leading-[21px] text-primary font-semibold'>{projectName}</span>
          </p>
        </div>
        <div className='mt-[11px]'>{children}</div>
      </div>
      <div className=''>
        <button className='py-[15px] w-full bg-primary-blue rounded text-white font-medium text-[14px]' onClick={nextStep}>
          NEXT
        </button>
      </div>
    </div>
  );
};

export default StepLayout;
