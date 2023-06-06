import StepLayout from './StepLayout';
import useNotification from '../../hooks/useNotification';
import { AlertCategory } from '../../redux/alerts/model';
import { Loader } from '../Loader';

type AlertStepProps = {
  nextStep: () => void;
};

const AlertStep: React.FC<AlertStepProps> = ({ nextStep }) => {
  const { handleSwitchToggle, loading, toggleSwitch } = useNotification();
  const nettyAlerts = [
    {
      text: 'NFT News',
      active: true,
      name: 'News',
    },
    {
      text: 'Upcoming NFTS',
      active: true,
      name: 'Upcoming',
    },
    {
      text: 'Crypto Prices (Favorites)',
      active: true,
      name: 'CryptoSales',
    },
    {
      text: 'NFT Alerts (Favorites)',
      active: true,
      name: 'NFTSales',
    },
  ];

  return (
    <StepLayout alertStep connectorStep withoutInput nextStep={nextStep} placeholder='Search' projectName='Alerts'>
      <div className='flex flex-col gap-4'>
        {loading ? (
          <Loader />
        ) : (
          nettyAlerts.map((item) => {
            return (
              <div key={item.text} className='bg-primary w-[349px] h-[63px] flex items-center justify-between pl-4 rounded'>
                <div className='flex gap-6'>
                  <span className='text-sm'>{item.text}</span>
                </div>
                <div>
                  <label className='inline-flex relative items-center mr-5 cursor-pointer'>
                    <input type='checkbox' className='sr-only peer' checked={!!toggleSwitch[item.name as keyof typeof toggleSwitch]} readOnly />
                    <div
                      onClick={() => handleSwitchToggle(item.name as AlertCategory)}
                      className="w-11 h-[21px] bg-[#BFC8DF] rounded-full peer  peer-focus:ring-[#006FFF]  peer-checked:after:-translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[0.2rem] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[15px] after:w-[15px] after:transition-all peer-checked:bg-[#006FFF]"
                    ></div>
                  </label>
                </div>
              </div>
            );
          })
        )}
      </div>
    </StepLayout>
  );
};

export default AlertStep;
