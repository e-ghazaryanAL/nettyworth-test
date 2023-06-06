import { useEffect } from 'react';

import { useConnect } from 'wagmi';

import { ConnectWallet } from './ConnectWallet';
import { useAppDispatch } from '../../../hooks/redux';
import { setShowAnimation } from '../../../redux/auth/authSlice';

interface IWalletModal {
  isModalShow: () => void;
}
const WalletModal: React.FC<IWalletModal> = ({ isModalShow }) => {
  const { connect, connectors } = useConnect();
  const dispatch = useAppDispatch();

  const connectWalletHandler = async (providerNum: number) => {
    connect({ connector: connectors[providerNum] });
    isModalShow();
    dispatch(setShowAnimation(true));
  };

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);
  return (
    <div className='absolute backdrop-blur-[273px] left-0 right-0 z-[90] h-full flex flex-col gap-[10px] justify-center items-center'>
      <ConnectWallet connectWallet={connectWalletHandler} isModalshow={isModalShow} border width='max-w-[800px]' />
    </div>
  );
};

export { WalletModal };
