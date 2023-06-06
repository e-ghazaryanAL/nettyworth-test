import { useState } from 'react';

import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';

import RightIcon from '../../../assets/icons/icon-arrow-right.svg';
import { regexp, regexpPhone } from '../../../utils/regexp';

interface IDropDown {
  hear: string;
  marketing: string;
  upcoming: string;
}

const filterMenu = {
  hear: ['Google Search', 'Twitter', 'YouTube', 'Facebook', 'Instagram'],
  marketing: ['Starter Marketing', 'Premium Marketing', 'Enterprise Marketing', 'Custom Package'],
  upcoming: ['Yes', 'No'],
};

type MenuDropdownProps = {
  data: string[];
  itemName: string;
  handleSetItem: (item: string, name: string) => void;
};

const MenuDropdown = ({ data, itemName, handleSetItem }: MenuDropdownProps) => {
  return (
    <Menu className='top-sales-dropdown h-[150px] overflow-auto'>
      {data?.map((item) => {
        return (
          <MenuItem key={item} onClick={() => handleSetItem(item, itemName)}>
            {item}
          </MenuItem>
        );
      })}
    </Menu>
  );
};

const AdvertisingPage = () => {
  const [dropDowns, setDropDowns] = useState<IDropDown>({ marketing: 'Marketing Package', upcoming: 'Have you submited your project to our Upcoming Launches?', hear: 'How did you hear about us?' });
  const [values, setValues] = useState({ firstName: '', phone: '', email: '', text: '', website: '' });
  const [error, setError] = useState({ firstName: '', phone: '', email: '', text: '', website: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [e.target.name]: [e.target.value] });
  };

  const handleSetItem = (item: string, name: string) => {
    setDropDowns((prev) => {
      return { ...prev, [name]: item };
    });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let obj = { ...error };

    if (!values.firstName.length) {
      obj = { ...obj, firstName: 'Name is required' };
    } else if (values.firstName[0].length > 50) {
      obj = { ...obj, firstName: 'Name should maximum 50 characters' };
    } else if (!values.firstName[0].length) {
      obj = { ...obj, firstName: 'Name is required' };
    } else {
      obj = { ...obj, firstName: '' };
    }
    if (!regexp.test(values.email)) {
      obj = { ...obj, email: 'It should be a valid email adress' };
    } else {
      obj = { ...obj, email: '' };
    }
    if (!values.text.length) {
      obj = { ...obj, text: 'Comments is required ' };
    } else if (!values.text[0].length) {
      obj = { ...obj, text: 'Comments is required' };
    } else {
      obj = { ...obj, text: '' };
    }
    if (!values.website.length) {
      obj = { ...obj, website: 'Website Field is required ' };
    } else if (!values.website[0].length) {
      obj = { ...obj, website: 'Website Field is required' };
    } else {
      obj = { ...obj, website: '' };
    }
    if (!values.phone.length) {
      obj = { ...obj, phone: 'Phone Field is required ' };
    } else if (!regexpPhone.test(values.phone)) {
      obj = { ...obj, phone: 'Please Enter Number Only' };
    } else {
      obj = { ...obj, phone: '' };
    }
    setError(obj);
  };
  return (
    <>
      <div className='pt-3 flex flex-col max-w-[1300px] 2xl:mx-auto pb-20 md:pb-8'>
        <div className='flex flex-col items-center gap-8 px-8'>
          <h4 className='font-semibold mb-[6px] text-center text-dark-blue'>Promotion Form</h4>
          <span className='text-xl leading-6 text-dark-blue text-center'>Thank you for your interest, please fill out the form below to get started.</span>
        </div>
        <div className='flex justify-center w-full'>
          <form action='' onSubmit={handleSubmit} className='w-full flex flex-col pt-10 md:pb-0 max-w-[354px] sm:max-w-[400px] md:max-w-md md:py-14 xl:max-w-[630px] gap-[25px]'>
            <input type='text' onChange={handleChange} name='firstName' placeholder='Name' className='hover:bg-[#DFE3EE]  focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:placeholder:text-white focus:text-white hover:border-[#A9B0C4] placeholder:text-input  placeholder:text-base border-solid border-[1px] border-input py-4 pl-4 w-full rounded ' />
            {error.firstName && <span className='text-red-400'>{error.firstName}</span>}
            <input type='email' onChange={handleChange} name='email' placeholder='Email' className='hover:bg-[#DFE3EE]  focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:placeholder:text-white focus:text-white hover:border-[#A9B0C4] placeholder:text-input  placeholder:text-base border-solid border-[1px] border-input py-4 pl-4 w-full rounded ' />
            {error.email && <span className='text-red-400'>{error.email}</span>}
            <input type='tel' onChange={handleChange} name='phone' placeholder='Phone' className='hover:bg-[#DFE3EE]  focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:placeholder:text-white focus:text-white hover:border-[#A9B0C4] placeholder:text-input  placeholder:text-base border-solid border-[1px] border-input py-4 pl-4 w-full rounded ' />
            {error.phone && <span className='text-red-400'>{error.phone}</span>}
            <input type='text' onChange={handleChange} name='website' placeholder='Websie URL' className='hover:bg-[#DFE3EE]  focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:placeholder:text-white focus:text-white hover:border-[#A9B0C4] placeholder:text-input  placeholder:text-base border-solid border-[1px] border-input py-4 pl-4 w-full rounded ' />
            {error.website && <span className='text-red-400'>{error.website}</span>}
            <Dropdown animation='slide-up' overlay={<MenuDropdown data={filterMenu.marketing} itemName={'marketing'} handleSetItem={handleSetItem} />} trigger={['click']}>
              <div className='w-full bg-[#fff]  h-[60px] border-2 flex items-center justify-between pl-4 pr-6  border-input rounded placeholder:text-sm placeholder:text-[#465272]'>
                <div className='flex gap-[22px]'>
                  <span className='text-sm text-[#465272]'>{dropDowns.marketing}</span>
                </div>
                <div className='flex flex-col'>
                  <FontAwesomeIcon className='text-[10px] text-input' icon={faChevronUp} />
                  <FontAwesomeIcon className='text-[10px] text-input' icon={faChevronDown} />
                </div>
              </div>
            </Dropdown>
            <Dropdown animation='slide-up' overlay={<MenuDropdown data={filterMenu.upcoming} itemName={'upcoming'} handleSetItem={handleSetItem} />} trigger={['click']}>
              <div className='w-full bg-[#fff]  h-[60px] border-2 flex items-center justify-between pl-4 pr-6  border-input rounded placeholder:text-sm placeholder:text-[#465272]'>
                <div className='flex gap-[22px]'>
                  <span className='text-sm text-[#465272]'>{dropDowns.upcoming}</span>
                </div>
                <div className='flex flex-col'>
                  <FontAwesomeIcon className='text-[10px] text-input' icon={faChevronUp} />
                  <FontAwesomeIcon className='text-[10px] text-input' icon={faChevronDown} />
                </div>
              </div>
            </Dropdown>
            <Dropdown animation='slide-up' overlay={<MenuDropdown data={filterMenu.hear} itemName={'hear'} handleSetItem={handleSetItem} />} trigger={['click']}>
              <div className='w-full bg-[#fff]  h-[60px] border-2 flex items-center justify-between pl-4 pr-6  border-input rounded placeholder:text-sm placeholder:text-[#465272]'>
                <div className='flex gap-[22px]'>
                  <span className='text-sm text-[#465272]'>{dropDowns.hear}</span>
                </div>
                <div className='flex flex-col'>
                  <FontAwesomeIcon className='text-[10px] text-input' icon={faChevronUp} />
                  <FontAwesomeIcon className='text-[10px] text-input' icon={faChevronDown} />
                </div>
              </div>
            </Dropdown>
            <textarea
              name='text'
              onChange={handleChange}
              placeholder='Questions/Comments'
              className='focus:placeholder:text-white focus:text-white hover:bg-[#DFE3EE] focus:bg-[#006FFF] focus:border-[#006FFF] hover:border-[#A9B0C4] focus:outline-none placeholder:text-input placeholder:text-base  border-solid border-[1px] border-input rounded px-5 py-7 h-[303px] resize-none md:h-[303px]'
            ></textarea>
            {error.text && <span className='text-red-400'>{error.text}</span>}
            <div className='flex justify-end w-full'>
              <button type='submit' className='py-3 pl-7 w-full max-w-[182px] pr-4 items-center justify-center bg-primary-blue uppercase hover:bg-dark-blue target:bg-off-blue rounded focus:border-[#006FFF] hover:border-[#A9B0C4] flex gap-5 md:pr-12 md:pl-[60px]'>
                <p className='text-white text-sm font-medium'>Send</p>
                <RightIcon fill='#fff' className='mt-[3px] w-[14px] h-[14px]' />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export { AdvertisingPage };
