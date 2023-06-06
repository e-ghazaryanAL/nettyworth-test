import React, { useRef, useState } from 'react';

import emailjs from '@emailjs/browser';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import DatePicker from 'react-datepicker';

import FormSubmittedModal from './FormSuccesModal';
import RightIcon from '../../../../assets/icons/icon-arrow-right.svg';
import 'react-datepicker/dist/react-datepicker.css';
import { ISoialMediaIcons, socialMediaIcons } from '../../../layouts-and-navs/constants';

const AboutUsDropDown = ({ setAbout }: any) => {
  const handleSetItem = (item: ISoialMediaIcons) => {
    setAbout((prev: ISoialMediaIcons) => {
      return { ...prev, about: item.media };
    });
  };
  return (
    <Menu className='top-sales-dropdown h-[150px] overflow-auto'>
      {socialMediaIcons.map((item, idx) => {
        return (
          <MenuItem key={idx} onClick={() => handleSetItem(item)} className='text-input bg-white flex items-center text-xs sm:text-sm hover:bg-light-gray'>
            {item.media}
          </MenuItem>
        );
      })}
    </Menu>
  );
};
const UpComingForms = () => {
  const [formData, setFormData] = useState({ file: 'No File Chosen', about: '', checked: '' });
  const [mess, setMess] = useState({ err: '', success: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>();
  const [startTime, setStartTime] = useState<Date | null>();

  const form = useRef<HTMLFormElement>(null);
  const handleGetFile = (e: React.SyntheticEvent, radio?: string) => {
    const target = e.target as HTMLInputElement;
    if (target?.files) {
      const file = target?.files[0].name;
      setFormData((prev) => {
        return { ...prev, file };
      });
    }
    if (radio) {
      setFormData((prev) => {
        return { ...prev, checked: radio };
      });
    }
  };
  const closeSubmittedModal = () => {
    setFormSubmitted(false);
  };
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { target } = e as any;
    if (!target.blockChain.value) {
      setMess({ err: 'please choose Blockchain', success: '' });
      return;
    }
    if (!target.file.value) {
      setMess({ err: 'please upload Project Image', success: '' });
      return;
    }
    emailjs
      .sendForm('service_py53qtr', 'template_03wbgwe', form.current as HTMLFormElement, 'LxIwL9V_bPSMESjBx')
      .then(
        () => {
          setMess({ err: '', success: 'Form Successfully Submitted' });
          setFormData({ file: 'No File Chosen', about: '', checked: '' });
          form.current?.reset();
        },
        (error) => {
          setMess({ success: '', err: error.text });
        }
      )
      .finally(() => setFormSubmitted(true));
  };

  return (
    <div className='h-full w-full pt-[57px] pb-[94px] flex items-center justify-center border-b-2 pr-6 pl-6 md:pr-8 md:pl-[70px] md:pb-[57px]'>
      <FormSubmittedModal isOpen={formSubmitted} onClose={closeSubmittedModal} message={mess} />
      <div className='w-full max-w-[963px]'>
        <form onSubmit={sendEmail} ref={form} className='flex flex-col gap-5 w-full'>
          <input type='text' className='w-full h-[60px] pl-5 border-[1px] border-input hover:bg-[#DFE3EE] focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:text-white focus:placeholder:text-white hover:border-[#A9B0C4] placeholder:text-sm placeholder:text-input rounded' placeholder="Project's Name" name='project_name' />
          <div className='flex flex-col gap-4 md:flex-row'>
            <input type='text' required className='w-full h-[60px] pl-5 border-[1px] border-input hover:bg-[#DFE3EE] focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:text-white focus:placeholder:text-white hover:border-[#A9B0C4] placeholder:text-sm placeholder:text-input rounded' placeholder='Name' name='name' />
            <input type='text' required className='w-full h-[60px] pl-5 border-[1px] border-input hover:bg-[#DFE3EE] focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:text-white focus:placeholder:text-white hover:border-[#A9B0C4] placeholder:text-sm placeholder:text-input rounded' placeholder='Email' name='email' />
          </div>
          <input type='text' required className='w-full h-[60px] pl-5 border-[1px] border-input hover:bg-[#DFE3EE] focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:text-white focus:placeholder:text-white hover:border-[#A9B0C4] placeholder:text-sm placeholder:text-input rounded' placeholder='Phone' name='phone' />
          <textarea name='describe' required placeholder='Please describe your project ….' className='focus:placeholder:text-white  focus:text-white hover:bg-[#DFE3EE] focus:bg-[#006FFF] focus:border-[#006FFF] hover:border-[#A9B0C4] focus:outline-none placeholder:text-input placeholder:text-base border-solid border-[1px] border-input rounded px-5 py-7 w-full resize-none md:h-[303px]'></textarea>
          <div className='flex flex-col gap-3 md:flex-row'>
            <div className='flex bg-white pl-5 pt-6 flex-col gap-6 pb-5 w-full'>
              <span className='text-dark-blue text-sm leading-7 font-semibold'>Upload Project Images</span>
              <input type='file' name='file' onChange={handleGetFile} id='file' accept='image/png, image/jpg, image/gif, image/jpeg' className='hidden' />
              <label htmlFor='file' className='border-[3px] border-primary flex justify-center items-center rounded max-w-[134px] h-[50px] bg-white'>
                Choose a file
              </label>
              <div className='flex flex-col'>
                <span className='text-base text-dark-blue font-medium'>{formData.file}</span>
                <span className='text-sm text-dark-blue'>Accepted file types: jpg, jpeg, png, gif.</span>
              </div>
            </div>
            <div className='flex flex-col gap-[14px] w-full'>
              <input type='text' required name='website' className='w-full h-[60px] pl-5 border-[1px] border-input hover:bg-[#DFE3EE] focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:text-white focus:placeholder:text-white hover:border-[#A9B0C4] placeholder:text-sm placeholder:text-input rounded' placeholder='Website URL' />
              <DatePicker
                name='launchDate'
                placeholderText='Launch Date'
                minDate={new Date()}
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                className='w-full h-[60px] pl-5 border-[1px] border-input hover:bg-[#DFE3EE] focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:text-white focus:placeholder:text-white hover:border-[#A9B0C4] placeholder:text-sm placeholder:text-input rounded'
                selected={startDate}
                autoComplete='off'
                onChange={(date: Date) => setStartDate(date)}
              />
              <DatePicker
                name='launchTime'
                selected={startTime}
                placeholderText='Launch Time'
                className='w-full h-[60px] pl-5 border-[1px] border-input hover:bg-[#DFE3EE] focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:text-white focus:placeholder:text-white hover:border-[#A9B0C4] placeholder:text-sm placeholder:text-input rounded'
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                autoComplete='off'
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption='Time'
                dateFormat='hh:mm aa'
              />
            </div>
          </div>
          <input type='text' name='twitter' className='w-full h-[60px] pl-5 border-[1px] border-input hover:bg-[#DFE3EE] focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:text-white focus:placeholder:text-white hover:border-[#A9B0C4] placeholder:text-sm placeholder:text-input rounded' placeholder='Twitter Link' />
          <input type='text' name='discord' className='w-full h-[60px] pl-5 border-[1px] border-input hover:bg-[#DFE3EE] focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:text-white focus:placeholder:text-white hover:border-[#A9B0C4] placeholder:text-sm placeholder:text-input rounded' placeholder='Discord Link' />
          <span className='text-sm text-dark-blue'>Invite should not expire.</span>
          <input type='text' name='instagram' className='w-full h-[60px] pl-5 border-[1px] border-input hover:bg-[#DFE3EE] focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:text-white focus:placeholder:text-white hover:border-[#A9B0C4] placeholder:text-sm placeholder:text-input rounded' placeholder='Instagram Account Link' />
          <input type='text' required name='collection' className='w-full h-[60px] pl-5 border-[1px] border-input hover:bg-[#DFE3EE] focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:text-white focus:placeholder:text-white hover:border-[#A9B0C4] placeholder:text-sm placeholder:text-input rounded' placeholder='Collection Link (ie. OpenSea)' />
          <input type='text' required name='collection_size' className='w-full h-[60px] pl-5 border-[1px] border-input hover:bg-[#DFE3EE] focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:text-white focus:placeholder:text-white hover:border-[#A9B0C4] placeholder:text-sm placeholder:text-input rounded' placeholder='Collection Size' />
          <input type='text' required name='mint_price' className='w-full h-[60px] pl-5 border-[1px] border-input hover:bg-[#DFE3EE] focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:text-white focus:placeholder:text-white hover:border-[#A9B0C4] placeholder:text-sm placeholder:text-input rounded' placeholder='Mint Price' />

          <div>
            <span className='text-base text-dark-blue leading-7'>Blockchain</span>
            <div className='flex gap-2 items-center flex-wrap md:flex-nowrap md:gap-5'>
              <input type='radio' name='blockChain' className='hidden' id='etherium' onChange={(e) => handleGetFile(e, 'etherium')} />
              <label htmlFor='etherium' className={`w-4 h-4 border-[4px] rounded-[50%] ${formData.checked === 'etherium' ? 'border-primary dark:border-primary' : 'border-dark-blue '}`}></label>
              <span className='text-sm text-blue'>Etherium</span>
              <input type='radio' name='blockChain' className='hidden' id='solana' onChange={(e) => handleGetFile(e, 'solana')} />
              <label htmlFor='solana' className={`${formData.checked === 'solana' ? 'border-primary dark:border-primary' : 'border-dark-blue'} w-4 h-4 border-[4px] rounded-[50%]`}></label>
              <span className='text-sm text-blue'>Solana</span>
              <input type='radio' name='blockChain' className='hidden' id='cardano' onChange={(e) => handleGetFile(e, 'cardano')} />
              <label htmlFor='cardano' className={`${formData.checked === 'cardano' ? 'border-primary dark:border-primary' : 'border-dark-blue'} w-4 h-4 border-[4px] rounded-[50%]`}></label>
              <span className='text-sm text-blue'>Cardano</span>
              <input type='radio' name='blockChain' id='other' className='hidden' onChange={(e) => handleGetFile(e, 'other')} />
              <label htmlFor='other' className={`${formData.checked === 'other' ? 'border-primary dark:border-primary' : 'border-dark-blue'} w-4 h-4 border-[4px] rounded-[50%]`}></label>
              <label htmlFor='other' className='w-[92px] h-9 bg-white flex items-center justify-center rounded border-[1px] border-input'>
                <span className='text-sm text-blue'>Other</span>
              </label>
            </div>
          </div>
          <Dropdown overlay={<AboutUsDropDown setAbout={setFormData} />} animation='slide-up' trigger={['click']}>
            <div className='border-solid border-[1px] border-input px-4 bg-white h-[60px] flex justify-between items-center rounded'>
              <span className='text-[14px] placeholder:text-base text-input'>{formData.about ? formData.about : 'How did you hear about us? '}</span>
              <span className='flex flex-col text-input'>
                <FontAwesomeIcon icon={faChevronUp} className='text-[10px]' />
                <FontAwesomeIcon icon={faChevronDown} className='-mt-[3px] text-[10px]' />
              </span>
            </div>
          </Dropdown>
          <input type='hidden' value={formData.about} name='about' />
          <input type='hidden' value={formData.checked} name='blockchain' />
          <span className={`text-2xl ${mess.err ? 'text-red-600' : 'text-green-500'}`}>{mess.err}</span>
          <div className='w-full flex justify-end'>
            <button className='bg-primary-blue  hover:bg-dark-blue target:bg-off-blue focus:border-[#006FFF] hover:border-[#A9B0C4] w-full rounded max-w-[180px] h-[49px] flex justify-center items-center'>
              <span className='text-sm leading-6 font-medium text-white flex gap-[14px]'>
                Submit
                <RightIcon fill='#fff' />
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { UpComingForms };
