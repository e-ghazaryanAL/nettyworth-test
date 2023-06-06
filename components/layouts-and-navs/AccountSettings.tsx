import React, { useEffect, useState } from 'react';

import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAccount } from 'wagmi';

import { getUserDetail, passwordReset, updateUserDetail, uploadUserImg } from '../../api/api';
import SecretIcon from '../../assets/icons/secret.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useCustomConnector from '../../hooks/useCustomConnector';
import { setUserImage } from '../../redux/wallet/userSlice';
import { validateEmail, validateImage } from '../../utils/helper';
import { ConnectWallet } from '../dashboard/portfolio/ConnectWallet';
import FormSubmittedModal from '../dashboard/upcoming-nfts/upcoming-form/FormSuccesModal';
import InputField from '../shared/inputs/InputField';

type AccountSettingsProps = {
  isShow: () => void;
};

const initialState = {
  name: '',
  email: '',
  phone: '',
  profile_picture: '',
};
const AccountSettings: React.FC<AccountSettingsProps> = ({ isShow }) => {
  const { connectWalletHandler } = useCustomConnector();
  const { isConnected } = useAccount();
  const [validateErr, setValidationErr] = useState(initialState);
  const [formSubmit, setFormSubmit] = useState(false);
  const [selectFile, setSelectFile] = useState<File | null>();
  const [mess, setMess] = useState({ err: '', success: '' });
  const [values, setValues] = useState(initialState);
  const { userImage } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleValidation = (name: string, errorMessage: string) => {
    setValidationErr((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let errorMessage = '';

    if (name === 'email' && !validateEmail(value)) {
      errorMessage = 'Email address should be valid';
    } else if (name === 'name' && value.length < 1) {
      errorMessage = 'Username cannot be empty';
    }

    handleValidation(name, errorMessage);
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageValidationErr = validateImage(e.target.files[0]);
      if (imageValidationErr) {
        setSelectFile(null);
        setValidationErr((prev) => {
          return {
            ...prev,
            image: imageValidationErr,
          };
        });
      } else {
        setValidationErr((prev) => {
          return {
            ...prev,
            image: '',
          };
        });
        setSelectFile(e.target.files[0]);
      }
    }
  };

  const postImage = async (image: File) => {
    const formData = new FormData();
    formData.append('image', image);
    const res = await uploadUserImg(formData);
    return res;
  };

  const resetPass = async () => {
    setFormSubmit(true);
    try {
      const res = await passwordReset();
      setMess({ err: '', success: res.message });
    } catch (e) {
      setMess({ err: 'Oops Something went wrong', success: '' });
    }
  };

  const handleSubmit = async () => {
    if (Object.values(validateErr).some((item) => item)) return;
    setFormSubmit(true);
    try {
      await updateUserDetail({
        name: values.name,
        phone: values.phone,
        email: values.email,
      });
      if (selectFile) {
        const uploaded: { image_url: string } = await postImage(selectFile);
        if (uploaded) {
          setSelectFile(null);
          dispatch(setUserImage(uploaded.image_url));
        }
      }
      setMess({ err: '', success: 'User successfully updated' });
    } catch (err) {
      setMess({ err: 'Oops Something went wrong', success: '' });
    }
  };
  const closeSettingHandler = () => {
    isShow();
  };

  useEffect(() => {
    const getUser = async () => {
      const res = await getUserDetail();
      setValues(res);
    };
    getUser();
  }, []);

  return (
    <div className='pb-20 fixed h-full z-50 top-[67px] backdrop-blur-xl bg-white/90 w-full flex flex-col gap-12 lg:gap-0 lg:flex-row md:w-[calc(100%-200px)] overflow-y-auto account-settings'>
      <FormSubmittedModal isOpen={formSubmit} message={mess} onClose={() => setFormSubmit(false)} />
      <div className='flex flex-col gap-[31px] md:gap-4 px-9 md:px-6 w-full pt-[18px] lg:pt-[30px] border-r'>
        <div className='flex flex-col gap-[15px] md:gap-7'>
          <div className='flex gap-1'>
            <p className='text-lg leading-[27px] text-dark-blue font-semibold'>Account </p>
            <p className='text-lg leading-[27px] text-primary font-semibold'>Details</p>
          </div>
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col md:flex-row gap-[18px]'>
              <div className='flex flex-col gap-2'>
                <div className='w-[356px] h-[49px] bg-primary-grey rounded border border-input flex justify-between items-center py-[9px] px-[14px]'>
                  <div className='flex justify-center items-center gap-2'>
                    <div className='w-7 h-7 bg-white rounded-full border overflow-hidden flex justify-center items-center'>{<img src={userImage || '/profile.png'} className='w-full h-full object-cover' />}</div>
                    <p className='text-sm text-input leading-6 font-normal'>Avatar</p>
                  </div>
                  <div className='relative'>
                    <input type='file' className='absolute inset-0 w-full h-full opacity-0 cursor-pointer' onChange={fileSelect} />
                    <button type='button' className='inline-flex items-center px-[13px] py-[8px] border-2 border-primary  shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                      <span className='text-xs font-semibold text-dark-blue'>Upload</span>
                    </button>
                  </div>
                </div>
                {validateErr.profile_picture && <span className='text-red-400'>{validateErr.profile_picture}</span>}
                {selectFile && (
                  <div className='flex gap-[18px] items-center bg-light-gray py-2 px-4 rounded w-max' onClick={() => setSelectFile(null)}>
                    <span>{selectFile.name}</span>
                    <FontAwesomeIcon icon={faSquareXmark} className='text-dark-blue w-[13px] h-[13px]' />
                  </div>
                )}
              </div>
              <div>
                <InputField name='name' value={values.name} onChange={handleChange} label='User Name' bgColor='bg-light-blue-grey' className='w-[356px] text-input' placeColor='placeholder:text-input' />
                {validateErr.name && <span className='text-red-400'>{validateErr.name}</span>}
              </div>
            </div>
            <div className='flex flex-col md:flex-row gap-[18px]'>
              <div>
                <InputField name='email' value={values.email} onChange={handleChange} label='Email' endicon={SecretIcon} bgColor='bg-light-blue-grey' className='w-[356px] text-input' placeColor='placeholder:text-input' />
                {validateErr.email && <span className='text-red-400'>{validateErr.email}</span>}
              </div>
              <InputField name='phone' value={values.phone} onChange={handleChange} label='Phone Number' endicon={SecretIcon} bgColor='bg-light-blue-grey' className='w-[356px] text-input' placeColor='placeholder:text-input' />
            </div>
          </div>
        </div>
        <div className={`flex gap-3  ${isConnected ? 'justify-start' : 'lg:justify-end 2xl:justify-center'}`}>
          <button className='w-[178px] h-[54px] flex justify-center items-center border-[3px] border-primary rounded-md text-sm text-dark-blue font-semibold' onClick={resetPass}>
            Reset Password
          </button>
          <button className={`w-[165px] h-[54px] flex justify-center items-center ${Object.values(validateErr).some((item) => item) ? 'bg-off-blue' : 'bg-primary-blue'} rounded-sm text-white text-sm font-medium`} onClick={handleSubmit}>
            Save Changes
          </button>
        </div>
      </div>
      {!isConnected ? <ConnectWallet col accountSett bgColor='bg-light-blue-grey' isModalshow={closeSettingHandler} connectWallet={connectWalletHandler} /> : null}
    </div>
  );
};
export default AccountSettings;
