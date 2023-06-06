import { FC, ReactNode } from 'react';

type Props = {
  body: ReactNode;
  sider: ReactNode;
};
const PortfolioLayout: FC<Props> = ({ body, sider }) => {
  return (
    <div className='h-full bg-primary pb-16 '>
      <div className='h-full grid grid-cols-12'>
        <div className='col-span-12 md:col-span-8 bg-white py-4 md:h-[800px] overflow-y-auto'>{body}</div>
        <div className='col-span-12 md:col-span-4 mt-10 px-10 overflow-y-auto md:h-[800px]'>{sider}</div>
      </div>
    </div>
  );
};

export default PortfolioLayout;
