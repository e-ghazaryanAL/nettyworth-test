type ProgressBarProps = {
  currentStep: number;
  steps: number;
};
const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, steps }) => {
  const percentage = `${(currentStep / (steps - 1)) * 100 - 10}%`;

  return (
    <div className='w-full h-[5px] relative'>
      <div className='absolute bg-light-green h-full' style={{ width: percentage }}></div>
    </div>
  );
};

export default ProgressBar;
