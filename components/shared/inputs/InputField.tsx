type Props = {
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  bgColor?: string;
  className?: string;
  placeColor?: string;
  endicon?: React.FC<React.SVGProps<SVGSVGElement>>;
  button?: React.ReactElement<HTMLButtonElement>;
};

const InputField = ({ icon: Icon, label, bgColor, className, placeColor, endicon: EndIcon, button: Button, value, onChange, name }: Props) => {
  return (
    <div className={`relative ${className}`}>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type='text'
        placeholder={label}
        className={`${Icon && 'pl-11'} block input-field w-full pt-[0.9rem] pb-[0.8rem] focus:text-white focus:placeholder:text-white px-6 text-sm text-input rounded ${bgColor || 'bg-light-blue-grey'} hover:bg-mid-blue-grey hover:border-btn-disabled hover:text-dark-blue focus:bg-primary-blue duration-200 focus:border-primary focus:text-white border border-input focus:outline-none ${placeColor}`}
      />
      {Icon && (
        <div className='absolute top-0 left-0 bottom-0 px-5 flex items-center icon dark-primary'>
          <Icon fill='currentColor' />
        </div>
      )}
      {EndIcon && (
        <div className='absolute top-0 right-0 bottom-0 px-5 flex items-center icon dark-primary'>
          <EndIcon fill='currentColor' />
        </div>
      )}
      {Button && <div className='absolute top-0 right-0 bottom-0 px-5 flex items-center icon dark-primary'>{Button}</div>}
    </div>
  );
};

export default InputField;
