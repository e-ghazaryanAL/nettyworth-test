import { useState } from 'react';

import RightIcon from '../../../assets/icons/icon-arrow-right.svg';
import { regexp, regexpPhone } from '../../../utils/regexp';

const NettyQAPage = () => {
  const [formData, setFormData] = useState({ file: 'No File Chosen', about: '', checked: '' });
  const [values, setValues] = useState({ firstName: '', phone: '', email: '', text: '', website: '', about: '', collection: '', village: '', pursue: '', artist: '', community: '', comments: '', twitter: '', instagram: '', facebook: '', discord: '' });
  const [error, setError] = useState({ firstName: '', phone: '', email: '', text: '', website: '', about: '', collection: '', village: '', pursue: '', artist: '', community: '', comments: '', twitter: '', instagram: '', facebook: '', discord: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [e.target.name]: [e.target.value] });
  };
  const handleGetFile = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    if (target?.files) {
      const file = target?.files[0].name;
      setFormData((prev) => {
        return { ...prev, file };
      });
    }
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
    if (!values.comments.length) {
      obj = { ...obj, comments: 'This field is required ' };
    } else if (!values.text[0].length) {
      obj = { ...obj, comments: 'This field is required' };
    } else {
      obj = { ...obj, comments: '' };
    }
    if (!values.about.length) {
      obj = { ...obj, about: 'This field is required ' };
    } else if (!values.text[0].length) {
      obj = { ...obj, about: 'This field is required' };
    } else {
      obj = { ...obj, about: '' };
    }
    if (!values.community.length) {
      obj = { ...obj, community: 'This field is required ' };
    } else if (!values.text[0].length) {
      obj = { ...obj, community: 'This field is required' };
    } else {
      obj = { ...obj, community: '' };
    }
    if (!values.collection.length) {
      obj = { ...obj, collection: 'This field is required ' };
    } else if (!values.text[0].length) {
      obj = { ...obj, collection: 'This field is required' };
    } else {
      obj = { ...obj, collection: '' };
    }
    if (!values.collection.length) {
      obj = { ...obj, collection: 'This field is required ' };
    } else if (!values.text[0].length) {
      obj = { ...obj, collection: 'This field is required' };
    } else {
      obj = { ...obj, collection: '' };
    }
    if (!values.artist.length) {
      obj = { ...obj, artist: 'This field is required ' };
    } else if (!values.text[0].length) {
      obj = { ...obj, artist: 'This field is required' };
    } else {
      obj = { ...obj, artist: '' };
    }
    if (!values.village.length) {
      obj = { ...obj, village: 'This field is required ' };
    } else if (!values.text[0].length) {
      obj = { ...obj, village: 'This field is required' };
    } else {
      obj = { ...obj, village: '' };
    }
    if (!values.website.length) {
      obj = { ...obj, website: 'Website Field is required ' };
    } else if (!values.website[0].length) {
      obj = { ...obj, website: 'Website Field is required' };
    } else {
      obj = { ...obj, website: '' };
    }
    if (!values.twitter.length) {
      obj = { ...obj, twitter: 'This field is required ' };
    } else if (!values.text[0].length) {
      obj = { ...obj, twitter: 'This field is required' };
    } else {
      obj = { ...obj, twitter: '' };
    }
    if (!values.instagram.length) {
      obj = { ...obj, instagram: 'This field is required ' };
    } else if (!values.text[0].length) {
      obj = { ...obj, instagram: 'This field is required' };
    } else {
      obj = { ...obj, instagram: '' };
    }
    if (!values.facebook.length) {
      obj = { ...obj, facebook: 'This field is required ' };
    } else if (!values.text[0].length) {
      obj = { ...obj, facebook: 'This field is required' };
    } else {
      obj = { ...obj, facebook: '' };
    }
    if (!values.discord.length) {
      obj = { ...obj, discord: 'This field is required ' };
    } else if (!values.text[0].length) {
      obj = { ...obj, discord: 'This field is required' };
    } else {
      obj = { ...obj, discord: '' };
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
          <h4 className='font-semibold mb-[6px] text-center text-dark-blue'>Q/A with NettyArt</h4>
          <span className='text-xl leading-6 text-dark-blue text-center'>Please fill out the questions below.</span>
        </div>
        <div className='flex justify-center w-full'>
          <form action='' onSubmit={handleSubmit} className='w-full flex flex-col pt-10 md:pb-0 max-w-[354px] sm:max-w-[400px] md:max-w-md md:py-14 xl:max-w-[630px] gap-[25px]'>
            <input type='text' name='firstName' onChange={handleChange} placeholder='Name' className='hover:bg-[#DFE3EE]  focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:placeholder:text-white focus:text-white hover:border-[#A9B0C4] placeholder:text-input  placeholder:text-base border-solid border-[1px] border-input py-4 pl-4 w-full rounded ' />
            {error.firstName && <span className='text-red-400'>{error.firstName}</span>}
            <input type='email' name='email' onChange={handleChange} placeholder='Email' className='hover:bg-[#DFE3EE]  focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:placeholder:text-white focus:text-white hover:border-[#A9B0C4] placeholder:text-input  placeholder:text-base border-solid border-[1px] border-input py-4 pl-4 w-full rounded ' />
            {error.email && <span className='text-red-400'>{error.email}</span>}
            <p className='text-xl leading-6 text-dark-blue border-b-2'>Questions</p>
            <textarea
              name='about'
              onChange={handleChange}
              placeholder='Talk to us about your art and what are some of your inspirations?'
              className='focus:placeholder:text-white focus:text-white hover:bg-[#DFE3EE] focus:bg-[#006FFF] focus:border-[#006FFF] hover:border-[#A9B0C4] focus:outline-none placeholder:text-input placeholder:text-base  border-solid border-[1px] border-input rounded px-5 py-7 h-[96px] resize-none'
            ></textarea>
            {error.about && <span className='text-red-400'>{error.about}</span>}
            <textarea
              name='collection'
              onChange={handleChange}
              placeholder='What do you hope people get out of your collection?'
              className='focus:placeholder:text-white focus:text-white hover:bg-[#DFE3EE] focus:bg-[#006FFF] focus:border-[#006FFF] hover:border-[#A9B0C4] focus:outline-none placeholder:text-input placeholder:text-base  border-solid border-[1px] border-input rounded px-5 py-7 h-[96px] resize-none'
            ></textarea>
            {error.collection && <span className='text-red-400'>{error.collection}</span>}
            <textarea
              name='village'
              onChange={handleChange}
              placeholder='Where are you from? They say it takes a village so talk to us about your team and what makes them so special.'
              className='focus:placeholder:text-white focus:text-white hover:bg-[#DFE3EE] focus:bg-[#006FFF] focus:border-[#006FFF] hover:border-[#A9B0C4] focus:outline-none placeholder:text-input placeholder:text-base  border-solid border-[1px] border-input rounded px-5 py-7 h-[96px] resize-none'
            ></textarea>
            {error.village && <span className='text-red-400'>{error.village}</span>}
            <textarea
              name='artist'
              placeholder='What made you pursue NFT art? Are you a full-time artist?'
              className='focus:placeholder:text-white focus:text-white hover:bg-[#DFE3EE] focus:bg-[#006FFF] focus:border-[#006FFF] hover:border-[#A9B0C4] focus:outline-none placeholder:text-input placeholder:text-base  border-solid border-[1px] border-input rounded px-5 py-7 h-[96px] resize-none'
            ></textarea>
            {error.artist && <span className='text-red-400'>{error.artist}</span>}
            <textarea
              name='community'
              onChange={handleChange}
              placeholder='What does community mean to you and how are you hoping to create one with your collection?'
              className='focus:placeholder:text-white focus:text-white hover:bg-[#DFE3EE] focus:bg-[#006FFF] focus:border-[#006FFF] hover:border-[#A9B0C4] focus:outline-none placeholder:text-input placeholder:text-base  border-solid border-[1px] border-input rounded px-5 py-7 h-[96px] resize-none'
            ></textarea>
            {error.community && <span className='text-red-400'>{error.community}</span>}
            <textarea name='comments' onChange={handleChange} placeholder='Comments' className='focus:placeholder:text-white focus:text-white hover:bg-[#DFE3EE] focus:bg-[#006FFF] focus:border-[#006FFF] hover:border-[#A9B0C4] focus:outline-none placeholder:text-input placeholder:text-base  border-solid border-[1px] border-input rounded px-5 py-7 h-[303px] resize-none md:h-[303px]'></textarea>
            {error.comments && <span className='text-red-400'>{error.comments}</span>}
            <p className='text-xl leading-6 text-dark-blue border-b-2'>Media</p>
            <p>Please upload a headshot and/or samples of your work</p>
            <div className='flex bg-white pl-5 pt-6 flex-col gap-6 pb-5 w-full'>
              <span className='text-dark-blue text-sm leading-7 font-semibold'>Upload Project Images</span>
              <input type='file' onChange={handleGetFile} name='file' id='file' accept='image/png, image/jpg, image/gif, image/jpeg' className='hidden' />
              <label htmlFor='file' className='border-[3px] border-primary flex justify-center items-center rounded max-w-[134px] h-[50px] bg-white'>
                Choose a file
              </label>
              <div className='flex flex-col'>
                <span className='text-base text-dark-blue font-medium'>{formData.file}</span>
                <span className='text-sm text-dark-blue'>Accepted file types: jpg, jpeg, png, gif.</span>
              </div>
            </div>
            <p className='text-xl leading-6 text-dark-blue border-b-2'>How can collectors find you?</p>
            <input type='text' name='website' onChange={handleChange} placeholder='Website URL' className='hover:bg-[#DFE3EE]  focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:placeholder:text-white focus:text-white hover:border-[#A9B0C4] placeholder:text-input placeholder:text-base border-solid border-[1px] border-input py-4 pl-4 w-full rounded' />
            {error.website && <span className='text-red-400'>{error.website}</span>}
            <input type='twitter' name='name' onChange={handleChange} placeholder='Twitter URL' className='hover:bg-[#DFE3EE]  focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:placeholder:text-white focus:text-white hover:border-[#A9B0C4] placeholder:text-input placeholder:text-base border-solid border-[1px] border-input py-4 pl-4 w-full rounded' />
            {error.twitter && <span className='text-red-400'>{error.twitter}</span>}
            <input type='instagram' name='name' onChange={handleChange} placeholder='Instagram URL' className='hover:bg-[#DFE3EE]  focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:placeholder:text-white focus:text-white hover:border-[#A9B0C4] placeholder:text-input placeholder:text-base border-solid border-[1px] border-input py-4 pl-4 w-full rounded' />
            {error.instagram && <span className='text-red-400'>{error.instagram}</span>}
            <input type='facebook' name='name' onChange={handleChange} placeholder='Facebook URL' className='hover:bg-[#DFE3EE]  focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:placeholder:text-white focus:text-white hover:border-[#A9B0C4] placeholder:text-input placeholder:text-base border-solid border-[1px] border-input py-4 pl-4 w-full rounded' />
            {error.facebook && <span className='text-red-400'>{error.facebook}</span>}
            <input type='discord' name='name' onChange={handleChange} placeholder='Discord Invite URL' className='hover:bg-[#DFE3EE]  focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:placeholder:text-white focus:text-white hover:border-[#A9B0C4] placeholder:text-input placeholder:text-base border-solid border-[1px] border-input py-4 pl-4 w-full rounded' />
            {error.discord && <span className='text-red-400'>{error.discord}</span>}
            <span className='text-lg leading-6 text-dark-blue'>Make sure link does not expire</span>
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

export { NettyQAPage };
