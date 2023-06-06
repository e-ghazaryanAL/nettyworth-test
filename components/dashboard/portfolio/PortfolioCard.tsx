import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAccount } from 'wagmi';

import { USDDollarFormatter } from '../../../utils/formatter';

interface ITitle {
  black: string;
  blue: string;
  red?: string;
}
interface IPortfolioCard {
  children: React.ReactNode;
  title: ITitle;
  icon?: IconDefinition;
  price?: number;
  priceColor?: string;
  button?: JSX.Element;
  handleClick?: (title: string) => void;
  accordion?: Set<string>;
  tooltip?: string;
}
const PortfolioCard: React.FC<IPortfolioCard> = ({ children, title, icon, price, priceColor = '', tooltip, button, accordion, handleClick }) => {
  const { isConnected } = useAccount();
  return (
    <div className='first-letter:bg-white py-5 rounded border-light-gray border bg-white relative dark-latest dark:bg-dark-mode-light-blue dark:border-dark-mode-light-blue'>
      <div className={`flex justify-between px-3 ${accordion ? 'cursor-pointer' : 'cursor-auto'}`} onClick={() => (isConnected ? (title.black === 'NFT' || title.black === 'Crypto') && handleClick!(title.black) : null)}>
        <div className={`flex justify-between items-center gap-2 ${title.red ? 'w-full' : ''}`}>
          {icon && (
            <>
              <div className='bg-light-gray flex justify-center items-center text-primary hover:text-white hover:bg-[#0349b0] rounded-full px-2 py-2 w-[20px] h-[20px] tooltip dark-red dark:bg-dark-mode-light dark:hover:text-primary'>
                <FontAwesomeIcon icon={icon} className='text-xs' />
              </div>
              {tooltip && (
                <div className='absolute flex items-center bg-black px-2 py-1 border-[1px] text-white text-sm font-bold top-[50px] left-[25px] alert  transition-all duration-300 ease' role='alert'>
                  {/* <svg className='fill-current w-4 h-4 mr-2' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                    <path d='M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z' />
                  </svg> */}
                  <span className='text-white text-xs font-bold'>{tooltip}</span>
                </div>
              )}
            </>
          )}

          <div>
            <p>
              {title.black}
              <span className='text-primary text-base font-semibold'>{title.black === 'Netty' ? `${title.blue}` : ` ${title.blue}`} </span>
            </p>
          </div>
          <p className='text-base font-medium'>{title.red}</p>
        </div>
        <div>
          {button}
          {price && <p className={`${priceColor} font-medium`}>{USDDollarFormatter(price)}</p>}
        </div>
      </div>
      <div className={`transition-all duration-200 ${accordion ? `${accordion.has(title.black) && isConnected ? 'max-h-[500px]' : 'max-h-0 overflow-hidden'} ` : ''}`}>{children}</div>
    </div>
  );
};

export { PortfolioCard };
