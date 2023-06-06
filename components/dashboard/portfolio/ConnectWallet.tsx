import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useConnect } from 'wagmi';

import CloseIcon from '../../../assets/icons/icon-close.svg';
import WalletIcon from '../../../assets/icons/icon-wallet.svg';
import coinbasePic from '../../../assets/images/coinbaselogo.png';
import metamaskPic from '../../../assets/images/metamask.png';
import walletconnectPic from '../../../assets/images/WalletConnect.png';
import { useAppDispatch } from '../../../hooks/redux';
import { setIsAuthenticated, setShowAnimation } from '../../../redux/auth/authSlice';
import { setTriggerMethod } from '../../../redux/wallet/userSlice';
import { getCookie } from '../../../utils/cookies';
import { regSw, subscribe } from '../../../utils/helper';

interface IConnectWallet {
  isModalshow?: () => void;
  connectWallet: (providerNum: number) => void;
  bgColor?: string;
  border?: boolean;
  width?: string;
  col?: boolean;
  accountSett?: boolean;
  registerStep?: boolean;
}

const ConnectWallet: React.FC<IConnectWallet> = ({ isModalshow, connectWallet, bgColor, border, width, col, accountSett, registerStep }) => {
  const { connectors, connect } = useConnect();
  const isRegistered = registerStep ? getCookie('_token') : null;
  const router = useRouter();

  const dispatch = useAppDispatch();
  return (
    <div className={`${isModalshow ? 'relative' : ''} ${bgColor || 'bg-white'} ${`${border ? 'border border-input rounded' : ''}`}  ${width || ''} ${accountSett ? 'pt-[38px] px-[37px] md:pt-[29px] lg:px-[29px] border md:border-none pb-[162px] md:pb-0' : `${registerStep ? '' : 'py-7 lg:px-7'}`}`}>
      {isModalshow && (
        <button className={`absolute -top-[50px] right-0 bg-primary-blue p-[14px] rounded ${accountSett ? 'hidden' : ''}`} onClick={isModalshow}>
          <CloseIcon fill='#FFFFFF' />
        </button>
      )}
      <div className={`flex flex-col justify-center ${registerStep ? 'xl:justify-center' : 'xl:justify-between'} ${col ? 'lg:flex-col md:items-baseline gap-[31px]' : `lg:flex-row items-center ${registerStep ? '' : 'xl:justify-between'} gap-3 lg:gap-20`}`}>
        {!registerStep ? (
          <div className={`flex flex-col gap-[6px] lg:gap-4  lg:px-0 ${accountSett ? 'md:w-auto px-0' : 'max-w-[406px] lg:w-[60%] lg:max-w-none px-[22px]'}`}>
            <div className={`flex items-center ${accountSett ? 'gap-5 ' : 'flex-col lg:flex-row gap-[5px] lg:gap-4'}`}>
              <button className='bg-primary-blue w-10 h-10 py-3 px-3 rounded lg:w-auto lg:h-auto max-h-10'>
                <WalletIcon fill='#FFFFFF' />
              </button>
              <h4 className={`font-semibold text-center lg:text-left ${accountSett ? 'text-lg' : ''}`}>Connect your {accountSett ? <span className='font-semibold text-lg text-primary'>wallet</span> : 'wallet'}</h4>
            </div>
            <p className={`leading-7 font-normal ${accountSett ? 'text-start' : 'text-center'}  lg:text-left`}>{`${accountSett ? 'Please connect your wallet to explore the NettyWorth dashboard experience.' : 'Connect your wallet to view your total Crypto and NFT value.'}`}</p>
          </div>
        ) : null}
        <div className={`${accountSett ? 'w-full p-0' : 'w-full md:px-[74px] lg:w-[40%]'}`}>
          <div className={`flex ${accountSett ? 'flex-col-reverse' : 'flex-col'} ${registerStep ? 'gap-5' : 'gap-[10px]'}  items-center`}>
            <button
              className={`relative flex gap-3 ${bgColor ? 'bg-white' : 'bg-primary'} rounded items-center pl-[18px] pr-[59px] py-[14px] ${accountSett ? 'w-full gap-[26px] md:gap-5' : 'w-[246px] sm:w-[300px] gap-3'} ${registerStep ? 'sm:w-[349px]' : ''} hover:bg-primary-blue dark:hover:border [&>p]:hover:text-white`}
              onClick={async () => {
                try {
                  const serviceWorkerReg = await regSw();
                  await subscribe(serviceWorkerReg);
                } catch (e) {
                  console.log(e);
                }
                if (connectors[1].ready) {
                  connect({ connector: connectors[1] });
                  if (isRegistered) {
                    dispatch(setIsAuthenticated(isRegistered));
                    router.push('/portfolio');
                  }
                  if (isModalshow) {
                    dispatch(setTriggerMethod('navigation'));
                  } else {
                    dispatch(setTriggerMethod('portfolioCTA'));
                  }
                } else {
                  window.location.href = 'https://metamask.app.link/dapp/nettyworth.io';
                }
                isModalshow?.();
                dispatch(setShowAnimation(true));
              }}
            >
              <Image alt='metamask' src={metamaskPic} className={`${accountSett ? 'w-[33px] h-[33px]' : 'w-[59px] h-[32px]'} object-cover`} />
              <p className={`${registerStep ? 'text-[15px] text-dark-blue' : 'p-normal leading-5'} font-semibold`}>MetaMask</p>
              {registerStep ? <FontAwesomeIcon icon={faChevronRight} className='text-primary h-3 absolute right-4' /> : null}
            </button>
            <button className={`relative flex  ${bgColor ? 'bg-white' : 'bg-primary'} rounded items-center pl-[18px] pr-[59px] py-[14px] ${accountSett ? 'w-full gap-[26px] md:gap-5' : 'w-[246px] sm:w-[300px] gap-3'} ${registerStep ? 'sm:w-[349px]' : ''} hover:bg-primary-blue dark:hover:border [&>p]:hover:text-white`} onClick={() => connectWallet(0)}>
              <Image alt='coinbase' src={coinbasePic} className={`${accountSett ? 'w-[33px] h-[33px] object-cover' : 'w-[59px] h-[32px] object-contain'}`} />
              <p className={`${registerStep ? 'text-[15px] text-dark-blue' : 'p-normal leading-5'} font-semibold`}>Coinbase Wallet</p>
              {registerStep ? <FontAwesomeIcon icon={faChevronRight} className='text-primary h-3 absolute right-4' /> : null}
            </button>
            <button className={`relative flex  ${bgColor ? 'bg-white' : 'bg-primary'} rounded items-center pl-[18px] pr-[59px] py-[14px] ${accountSett ? 'w-full gap-[26px] md:gap-5' : 'w-[246px] sm:w-[300px] gap-3'} ${registerStep ? 'sm:w-[349px]' : ''} hover:bg-primary-blue dark:hover:border [&>p]:hover:text-white`} onClick={() => connectWallet(2)}>
              <Image alt='walletconnect' src={walletconnectPic} className={`${accountSett ? 'w-[33px] h-[33px] object-none' : 'w-[59px] h-[32px]'}`} />
              <p className={`${registerStep ? 'text-[15px] text-dark-blue' : 'p-normal leading-5'} font-semibold`}>WalletConnect</p>
              {registerStep ? <FontAwesomeIcon icon={faChevronRight} className='text-primary h-3 absolute right-4' /> : null}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ConnectWallet };
