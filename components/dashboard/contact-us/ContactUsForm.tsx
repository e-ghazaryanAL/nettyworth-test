import React, { useRef, useState } from 'react';

import emailjs from '@emailjs/browser';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';

import RightIcon from '../../../assets/icons/icon-arrow-right.svg';
import { regexp, regexpPhone } from '../../../utils/regexp';
import 'rc-dropdown/assets/index.css';
import FormSubmittedModal from '../upcoming-nfts/upcoming-form/FormSuccesModal';

const contactMenu = ['General Inquiry', 'Upcoming NFTs', 'Features', 'Advertising'];
const HelpMenuDropdown = ({ categoryHandler }: { categoryHandler: (category: string) => void }) => (
  <Menu className='top-sales-dropdown'>
    {contactMenu.map((item, idx) => {
      return (
        <MenuItem className='text-input bg-white flex items-center text-xs sm:text-sm hover:bg-light-gray' key={idx} onClick={() => categoryHandler(item)}>
          {item}
        </MenuItem>
      );
    })}
  </Menu>
);

const ContactUsForm = () => {
  const [values, setValues] = useState({ firstName: '', phone: '', email: '', text: '', company: '', category: '' });
  const [error, setError] = useState({ firstName: '', phone: '', email: '', text: '', company: '' });
  const [mess, setMess] = useState({ err: '', success: '' });
  const [submittedForm, setSubmittedForm] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    let obj = { ...error };

    if (value.length > 50 && name === 'firstName') {
      obj = { ...obj, firstName: 'Name should maximum 50 characters' };
    }
    if (!regexp.test(value) && name === 'email') {
      obj = { ...obj, email: 'It should be a valid email adress' };
    } else {
      obj = { ...obj, email: '' };
    }
    if (name === 'phone' && !regexpPhone.test(value)) {
      obj = { ...obj, phone: 'Please Enter Number Only' };
    } else {
      obj = { ...obj, phone: '' };
    }
    setError(obj);
    setValues({ ...values, [name]: value });
  };

  const handleCategory = (category: string) => {
    setValues((prev) => (prev.category === category ? prev : { ...prev, category }));
  };
  const closeModal = () => {
    setSubmittedForm(false);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    emailjs
      .sendForm('service_py53qtr', 'template_4oang8c', form.current as HTMLFormElement, 'LxIwL9V_bPSMESjBx')
      .then(() => {
        setMess({ err: '', success: 'Your message was successfully sent' });

        setValues({ firstName: '', phone: '', email: '', text: '', company: '', category: '' });
      })
      .catch((err) => {
        setMess({ success: '', err: err.text });
      })
      .finally(() => setSubmittedForm(true));
  };
  return (
    <div className='bg-primary pl-[42px] sm:pl-0 flex sm:justify-center pb-20'>
      <FormSubmittedModal isOpen={submittedForm} onClose={closeModal} message={mess} />
      <form onSubmit={handleSubmit} ref={form} className='flex flex-col pt-10 md:pb-0 max-w-[354px] sm:max-w-[400px] md:max-w-md md:py-14 xl:max-w-[1200px] xl:w-full xl:mx-44 2xl:mx-0 gap-[25px]'>
        <div>
          <div className='flex flex-col w-full'>
            <input onChange={handleChange} value={values.firstName} type='text' placeholder='Name' name='firstName' className='hover:bg-[#DFE3EE] focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:text-white focus:placeholder:text-white hover:border-[#A9B0C4] placeholder:text-input  placeholder:text-base border-solid border-[1px] border-input py-4 pl-4 w-full rounded ' />
            {error.firstName && <span className='text-red-400'>{error.firstName}</span>}
          </div>
        </div>
        <div className='flex flex-col gap-6 w-full md:flex-row md:gap-10'>
          <div className='flex flex-col w-full md:w-1/2'>
            <input onChange={handleChange} required value={values.email} type='text' placeholder='Email' name='email' className='hover:bg-[#DFE3EE] focus:bg-[#006FFF] focus:outline-none focus:text-white focus:placeholder:text-white placeholder:text-input focus:border-[#006FFF] hover:border-[#A9B0C4] placeholder:text-base border-solid border-[1px] border-input p-4 pr-11 rounded' />
            {error.email && <span className='text-red-400'>{error.email}</span>}
          </div>
          <div className='flex flex-col w-full md:w-1/2'>
            <input onChange={handleChange} required value={values.phone} type='tel' placeholder='Phone' name='phone' className='hover:bg-[#DFE3EE] focus:outline-none focus:bg-[#006FFF] focus:text-white focus:border-[#006FFF]  focus:placeholder:text-white hover:border-[#A9B0C4] placeholder:text-input  placeholder:text-base border-solid border-[1px] border-input py-4 pl-4 w-full rounded ' />
            {error.phone && <span className='text-red-400'>{error.phone}</span>}
          </div>
        </div>
        <div className='flex flex-col w-full'>
          <input onChange={handleChange} required value={values.company} type='text' placeholder='Company' name='company' className='hover:bg-[#DFE3EE] focus:outline-none focus:bg-[#006FFF] focus:text-white focus:border-[#006FFF] focus:placeholder:text-white hover:border-[#A9B0C4] placeholder:text-input  placeholder:text-base border-solid border-[1px] border-input py-4 pl-4 w-full rounded ' />
          {error.company && <span className='text-red-400'>{error.company}</span>}
        </div>
        <Dropdown animation='slide-up' overlay={<HelpMenuDropdown categoryHandler={handleCategory} />} trigger={['click']}>
          <div className='border-solid border-[1px] border-input p-4 bg-white  flex justify-between rounded'>
            <span className='text-[14px] placeholder:text-base text-input'>{values.category ? values.category : 'What can we help you with?'}</span>
            <span className='flex flex-col text-input'>
              <FontAwesomeIcon icon={faChevronUp} className='text-[10px]' />
              <FontAwesomeIcon icon={faChevronDown} className='-mt-[3px] text-[10px]' />
            </span>
          </div>
        </Dropdown>
        <input type='hidden' value={values.category} name='category' />
        <div className='flex flex-col'>
          <textarea
            onChange={handleChange}
            name='text'
            value={values.text}
            placeholder='Please detail your feedback here ...'
            className='focus:placeholder:text-white focus:text-white hover:bg-[#DFE3EE] focus:bg-[#006FFF] focus:border-[#006FFF] hover:border-[#A9B0C4] focus:outline-none placeholder:text-input placeholder:text-base  border-solid border-[1px] border-input rounded px-5 py-7 h-[303px] resize-none md:h-[303px]'
          ></textarea>
          {error.text && <span className='text-red-400'>{error.text}</span>}
        </div>
        <span className={`text-sm ${mess.err ? 'text-red-600' : 'text-green-500'}`}>{mess.err ? mess.err : mess.success}</span>
        <div className='flex justify-end w-full'>
          <button type='submit' className='py-3 pl-7 w-full max-w-[182px] pr-4 items-center justify-center bg-primary-blue uppercase hover:bg-dark-blue target:bg-off-blue rounded focus:border-[#006FFF] hover:border-[#A9B0C4] flex gap-5 md:pr-12 md:pl-[60px]'>
            <p className='text-white text-sm font-medium'>Send </p>
            <RightIcon fill='#fff' className='mt-[3px] w-[14px] h-[14px]' />
          </button>
        </div>
      </form>
    </div>
  );
};

export { ContactUsForm };
