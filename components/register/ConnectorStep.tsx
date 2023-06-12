import { useRouter } from 'next/router';

import StepLayout from './StepLayout';
import useCustomConnector from '../../hooks/useCustomConnector';
import { ConnectWallet } from '../dashboard/portfolio/ConnectWallet';

const ConnectorStep = () => {
  const router = useRouter();
  const { connectWalletHandler } = useCustomConnector();

  const handleNext = async () => {
    router.push('/portfolio');
  };

  return (
    <StepLayout placeholder='' connectorStep nextStep={handleNext} withoutInput projectName='Wallet'>
      <ConnectWallet registerStep connectWallet={connectWalletHandler} />
    </StepLayout>
  );
};

export default ConnectorStep;
