import React from 'react';

type Props = {
  text: string;
  disabled?: boolean;
  handleRegister: () => void;
  maxH?: string;
};

const OutlinedButton = ({ text, disabled, handleRegister, maxH }: Props) => {
  return (
    <button
      onClick={handleRegister}
      disabled={disabled}
      className={`max-h-[${maxH ? `${maxH}` : ''}] border-[3px] border-primary px-6 pt-[0.5rem] pb-[0.9rem] block rounded max-w-max text-sm font-semibold text-dark-blue duration-200 hover:bg-primary-blue hover:text-white focus:text-white focus:bg-off-blue focus:border-off-blue disabled:bg-btn-disabled disabled:text-btn-disabled disabled:border-btn-disabled w-[500px]`}
    >
      {text}
    </button>
  );
};

export default OutlinedButton;
