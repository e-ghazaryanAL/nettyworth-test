import { ReactElement, useState } from 'react';

import { LoginLayout } from '../../components/layouts-and-navs/landing/LoginLayout';
import AlertStep from '../../components/register/AlertStep';
import ConnectorStep from '../../components/register/ConnectorStep';
import CryptoStep from '../../components/register/CryptoStep';
import FavouriteStep from '../../components/register/FavouriteStep';
import FormStep from '../../components/register/FormStep';
import { StepPropsType } from '../../components/register/model';
import ProgressBar from '../../components/register/ProgressBar';
import { PublicRoute } from '../../utils/auth';

const Register = () => {
  const [step, setStep] = useState(0);

  const formSteps = [
    {
      text: ['REGISTER'],
      component: ({ nextStep }: StepPropsType) => <FormStep nextStep={nextStep} />,
    },
    {
      text: ['NFT', 'FAVORITES'],
      component: ({ nextStep }: StepPropsType) => <FavouriteStep nextStep={nextStep} />,
    },
    {
      text: ['CRYPTO', 'FAVORITES'],
      component: ({ nextStep }: StepPropsType) => <CryptoStep nextStep={nextStep} />,
    },
    {
      text: ['SET', 'ALERTS'],
      component: ({ nextStep }: StepPropsType) => <AlertStep nextStep={nextStep} />,
    },
    {
      text: ['CONNECT', 'WALLETS'],
      component: () => <ConnectorStep />,
    },
  ];
  const handleNext = () => {
    if (step < formSteps.length) {
      setStep(step + 1);
    }
  };

  const CurrentStepComponent = formSteps[step].component;

  return (
    <LoginLayout steps label={formSteps[step].text}>
      <div className='pt-9 pl-[33px] pb-[35px] pr-[20px] max-w-[385px] h-full'>
        <ProgressBar currentStep={step} steps={formSteps.length} />
        <CurrentStepComponent nextStep={handleNext} />
      </div>
    </LoginLayout>
  );
};

Register.getLayout = (page: ReactElement) => page;

export const getServerSideProps = PublicRoute;

export default Register;
