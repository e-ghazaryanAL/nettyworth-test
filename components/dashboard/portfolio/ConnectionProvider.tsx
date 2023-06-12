import React from 'react';

import { useAccount, useConnect } from 'wagmi';

import { ConnectWallet } from './ConnectWallet';
import { NFTCollection } from './NFTCollection';
import PortfolioStats from './PortfolioStats';
import { useAppDispatch } from '../../../hooks/redux';
import { setShowAnimation } from '../../../redux/auth/authSlice';

const ConnectionProvider = () => {
  const { connect, connectors } = useConnect();
  const { isConnected } = useAccount();
  const dispatch = useAppDispatch();
  const connectWalletHandler = async (providerNum: number) => {
    connect({ connector: connectors[providerNum] });
    dispatch(setShowAnimation(true));
  };
  return (
    <div>
      {isConnected ? (
        <div>
          <PortfolioStats />
          <NFTCollection />
        </div>
      ) : (
        <div className='pt-3 px-5'>
          <h4 className='mb-3 font-semibold leading-[42px]'>Portfolio</h4>
          <ConnectWallet connectWallet={connectWalletHandler} bgColor='bg-primary' />
        </div>
      )}
    </div>
  );
};

export default ConnectionProvider;
