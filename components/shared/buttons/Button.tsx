import React from 'react';

type Props = {
  text: string;
  disabled?: boolean;
  rightIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  leftIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button = ({ text, disabled, rightIcon: RightIcon, leftIcon: LeftIcon, className, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${RightIcon || LeftIcon ? 'px-6' : 'px-9'} bg-primary-blue text-white hover:bg-dark-blue py-[0.9rem] flex justify-center items-center rounded w-full text-sm font-medium duration-200 hover:text-white focus:text-white focus:bg-off-blue focus:border-off-blue disabled:bg-btn-disabled disabled:text-btn-disabled disabled:border-btn-disabled ${className}`}
    >
      {LeftIcon && (
        <div className='mr-4'>
          <LeftIcon fill={disabled ? '#A9B0C4' : 'white'} />
        </div>
      )}
      <span className='text-white'>{text}</span>
      {RightIcon && (
        <div className='ml-4'>
          <RightIcon fill={disabled ? '#A9B0C4' : 'white'} />
        </div>
      )}
    </button>
  );
};

export default Button;
