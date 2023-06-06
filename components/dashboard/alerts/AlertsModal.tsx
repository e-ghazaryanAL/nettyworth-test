import { Alerts } from './Alerts';

const AlertsModal = () => {
  return (
    <div className='pb-20 fixed h-full z-50 top-[67px] backdrop-blur-xl bg-white/90 w-full  md:w-[calc(100%-200px)] overflow-y-auto'>
      <Alerts />
    </div>
  );
};

export default AlertsModal;
