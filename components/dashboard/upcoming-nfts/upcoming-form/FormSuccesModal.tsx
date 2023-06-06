import { Loader } from '../../../Loader';

interface FormSubmittedModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: { err: string; success: string };
}

const FormSubmittedModal: React.FC<FormSubmittedModalProps> = ({ isOpen, onClose, message }) => {
  return (
    <div className={`fixed justify-center items-center inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className='absolute inset-0 bg-gray-500 bg-opacity-75' />
      <div className='relative flex flex-col gap-9 justify-center items-center w-[320px] md:w-full max-w-md mx-auto my-6 p-6 bg-white rounded-lg shadow-xl'>
        {!message ? <Loader /> : null}
        {message.success ? (
          <>
            <p className='text-2xl font-semibold mb-2 text-center text-primary'>{message.success}</p>
          </>
        ) : (
          <p className='text-red-600 text-2xl mb-4 text-center'>{message.err}</p>
        )}
        <button type='button' className='py-3 text-white w-full max-w-[182px] flex items-center font-semibold justify-center bg-primary-blue hover:bg-dark-blue target:bg-off-blue rounded focus:border-[#006FFF] hover:border-[#A9B0C4]' onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default FormSubmittedModal;
