import { useConnect } from 'wagmi';

import { useAppDispatch } from './redux';
import { setShowAnimation } from '../redux/auth/authSlice';

const useCustomConnector = () => {
  const { connect, connectors } = useConnect();
  const dispatch = useAppDispatch();

  const connectWalletHandler = async (providerNum: number) => {
    connect({ connector: connectors[providerNum] });
    dispatch(setShowAnimation(true));
  };
  return { connectWalletHandler };
};

export default useCustomConnector;
