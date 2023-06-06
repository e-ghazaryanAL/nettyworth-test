import { useRouter } from 'next/router';

import StepLayout from './StepLayout';
import { useAppDispatch } from '../../hooks/redux';
import useCustomConnector from '../../hooks/useCustomConnector';
import { setIsAuthenticated } from '../../redux/auth/authSlice';
import { getCookie } from '../../utils/cookies';
import { ConnectWallet } from '../dashboard/portfolio/ConnectWallet';

const ConnectorStep = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { connectWalletHandler } = useCustomConnector();

  const handleNext = async () => {
    dispatch(setIsAuthenticated(getCookie('_token')));
    router.push('/portfolio');
  };

  return (
    <StepLayout placeholder='' connectorStep nextStep={handleNext} withoutInput projectName='Wallet'>
      <ConnectWallet registerStep connectWallet={connectWalletHandler} />
    </StepLayout>
  );
};

export default ConnectorStep;
