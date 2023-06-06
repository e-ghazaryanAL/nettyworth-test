import Link from 'next/link';

import checkIcon from '../../../assets/icons/check.png';

interface IPlan {
  planType: string;
  price: string;
  limit: string;
  access: string[];
  link: string;
  outlink: boolean;
  name: string;
}

type PaymentCardProps = {
  active: string;
  setActive: (plan: string) => void;
  paymentPlan: IPlan;
  withBorder?: boolean;
};
const PaymentCard: React.FC<PaymentCardProps> = ({ active, setActive, paymentPlan, withBorder }) => {
  const isActive = active === paymentPlan.planType;

  return (
    <div className={`flex flex-col transition ease-in-out delay-75 advertiseItems relative pt-[29px] pb-[55px] md:pb-[31px] md:px-[33px] ${isActive ? 'bg-dark-blue active-payment md:h-[calc(100%+24px)] md:-translate-y-6 md:rounded-t-lg' : ''}  ${withBorder ? 'border-b' : ''} dark:border`} onClick={() => setActive(paymentPlan.planType)}>
      <div className='flex flex-col justify-between h-full'>
        <div className='flex flex-col gap-2 gaps pl-[62px] md:pl-0'>
          <div className='flex justify-between '>
            <p className='text-[20px] leading-[26px] font-semibold'>{paymentPlan.planType}</p>
            <div className='min-w-[19px] h-[19px] bg-light-gray rounded-full flex justify-center items-center absolute right-[19px] top-[19px]'>
              <span className='text-[10px] text-primary font-bold'>i</span>
            </div>
          </div>
          <p className='text-[25px] leading-6 text-light-green pt-[7px]'>{paymentPlan.price}</p>
          <p className={`text-dark-blue left-6 font-semibold ${paymentPlan.limit.includes('&') ? 'text-[35px]' : 'text-[17px]'}`} dangerouslySetInnerHTML={{ __html: paymentPlan.limit }}></p>
          <div className='mt-7'>
            {paymentPlan.access.map((item, idx) => {
              return (
                <div key={idx} className='flex items-center gap-2'>
                  <img src={checkIcon.src} className='min-w-[13px] h-[10px] object-cover' />
                  <p className='text-sm leading-5 font-normal text-dark-blue'>{item}</p>
                </div>
              );
            })}
          </div>
        </div>
        {paymentPlan.outlink ? (
          <a href={paymentPlan.link} target='_blank' rel='noreferrer' className='self-center'>
            <button className='bg-light-gray w-[182px] h-[49px] rounded mt-[50px]'>
              <span className='text-primary font-medium text-[14px]'>{paymentPlan.name}</span>
            </button>
          </a>
        ) : (
          <Link href={paymentPlan.link} className='self-center'>
            <button className='bg-light-gray w-[182px] h-[49px] rounded mt-[50px]'>
              <span className='text-primary font-medium text-[14px]'>{paymentPlan.name}</span>
            </button>
          </Link>
        )}
        {/* <button className='bg-light-gray w-[182px] h-[49px] rounded mt-[50px] self-center'>
          <span className='text-primary font-semibold'>{paymentPlan.name}</span>
        </button> */}
      </div>
    </div>
  );
};

export default PaymentCard;
