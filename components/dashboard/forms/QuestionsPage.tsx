import { useState } from 'react';

import RightIcon from '../../../assets/icons/icon-arrow-right.svg';
import { regexp, regexpPhone } from '../../../utils/regexp';

const QuestionsPage = () => {
  const [formData, setFormData] = useState({ file: 'No File Chosen' });
  const [values, setValues] = useState({ firstName: '', phone: '', email: '', text: '', website: '', advice: '', hashtag: '', about: '', space: '', enter: '', favorite: '', collaborate: '', life: '', like: '', comments: '', twitter: '', instagram: '', facebook: '', discord: '' });
  const [error, setError] = useState({ firstName: '', phone: '', email: '', text: '', website: '', advice: '', hashtag: '', about: '', space: '', enter: '', favorite: '', collaborate: '', life: '', like: '', comments: '', twitter: '', instagram: '', facebook: '', discord: '' });

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
      obj = { ...obj, text: 'This field is required ' };
    } else if (!values.text[0].length) {
      obj = { ...obj, text: 'This field is required' };
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
    if (!values.space.length) {
      obj = { ...obj, space: 'This field is required ' };
    } else if (!values.text[0].length) {
      obj = { ...obj, space: 'This field is required' };
    } else {
      obj = { ...obj, space: '' };
    }
    if (!values.about.length) {
      obj = { ...obj, about: 'This field is required ' };
    } else if (!values.text[0].length) {
      obj = { ...obj, about: 'This field is required' };
    } else {
      obj = { ...obj, about: '' };
    }
    if (!values.advice.length) {
      obj = { ...obj, advice: 'This field is required ' };
    } else if (!values.text[0].length) {
      obj = { ...obj, advice: 'This field is required' };
    } else {
      obj = { ...obj, advice: '' };
    }
    if (!values.hashtag.length) {
      obj = { ...obj, hashtag: 'This field is required ' };
    } else if (!values.text[0].length) {
      obj = { ...obj, hashtag: 'This field is required' };
    } else {
      obj = { ...obj, hashtag: '' };
    }
    if (!values.enter.length) {
      obj = { ...obj, enter: 'This field is required ' };
    } else if (!values.text[0].length) {
      obj = { ...obj, enter: 'This field is required' };
    } else {
      obj = { ...obj, enter: '' };
    }
    if (!values.favorite.length) {
      obj = { ...obj, favorite: 'This field is required ' };
    } else if (!values.text[0].length) {
      obj = { ...obj, favorite: 'This field is required' };
    } else {
      obj = { ...obj, favorite: '' };
    }
    if (!values.collaborate.length) {
      obj = { ...obj, collaborate: 'This field is required ' };
    } else if (!values.text[0].length) {
      obj = { ...obj, collaborate: 'This field is required' };
    } else {
      obj = { ...obj, collaborate: '' };
    }
    if (!values.life.length) {
      obj = { ...obj, life: 'This field is required ' };
    } else if (!values.text[0].length) {
      obj = { ...obj, life: 'This field is required' };
    } else {
      obj = { ...obj, life: '' };
    }
    if (!values.like.length) {
      obj = { ...obj, like: 'This field is required ' };
    } else if (!values.text[0].length) {
      obj = { ...obj, like: 'This field is required' };
    } else {
      obj = { ...obj, like: '' };
    }
    if (!values.comments.length) {
      obj = { ...obj, comments: 'This field is required ' };
    } else if (!values.text[0].length) {
      obj = { ...obj, comments: 'This field is required' };
    } else {
      obj = { ...obj, comments: '' };
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
          <h4 className='font-semibold mb-[6px] text-center text-dark-blue'>10 Questions with Netty</h4>
          <span className='text-xl leading-6 text-dark-blue text-center'>Thank you for your interest in 10 Quesitons with Netty. Please fill out the questions below.</span>
        </div>
        <div className='flex justify-center w-full'>
          <form action=' ' onSubmit={handleSubmit} className='w-full flex flex-col pt-10 md:pb-0 max-w-[354px] sm:max-w-[400px] md:max-w-md md:py-14 xl:max-w-[630px] gap-[25px]'>
            <input type='text' onChange={handleChange} name='name' placeholder='Name' className='hover:bg-[#DFE3EE]  focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:placeholder:text-white focus:text-white hover:border-[#A9B0C4] placeholder:text-input  placeholder:text-base border-solid border-[1px] border-input py-4 pl-4 w-full rounded ' />
            {error.firstName && <span className='text-red-400'>{error.firstName}</span>}
            <input type='email' onChange={handleChange} name='email' placeholder='Email' className='hover:bg-[#DFE3EE]  focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:placeholder:text-white focus:text-white hover:border-[#A9B0C4] placeholder:text-input  placeholder:text-base border-solid border-[1px] border-input py-4 pl-4 w-full rounded ' />
            {error.email && <span className='text-red-400'>{error.email}</span>}
            <p className='text-xl leading-6 text-dark-blue border-b-2'>Questions</p>
            <textarea
              name='text'
              onChange={handleChange}
              placeholder='Talk to us about your art and what are some of your inspirations?'
              className='focus:placeholder:text-white focus:text-white hover:bg-[#DFE3EE] focus:bg-[#006FFF] focus:border-[#006FFF] hover:border-[#A9B0C4] focus:outline-none placeholder:text-input placeholder:text-base  border-solid border-[1px] border-input rounded px-5 py-7 h-[96px] resize-none'
            ></textarea>
            {error.text && <span className='text-red-400'>{error.text}</span>}
            <textarea
              name='advice'
              onChange={handleChange}
              placeholder='Best piece of advice you’ve received?'
              className='focus:placeholder:text-white focus:text-white hover:bg-[#DFE3EE] focus:bg-[#006FFF] focus:border-[#006FFF] hover:border-[#A9B0C4] focus:outline-none placeholder:text-input placeholder:text-base  border-solid border-[1px] border-input rounded px-5 py-7 h-[96px] resize-none'
            ></textarea>
            {error.advice && <span className='text-red-400'>{error.advice}</span>}
            <textarea
              name='hashtag'
              onChange={handleChange}
              placeholder='Describe yourself in a hashtag?'
              className='focus:placeholder:text-white focus:text-white hover:bg-[#DFE3EE] focus:bg-[#006FFF] focus:border-[#006FFF] hover:border-[#A9B0C4] focus:outline-none placeholder:text-input placeholder:text-base  border-solid border-[1px] border-input rounded px-5 py-7 h-[96px] resize-none'
            ></textarea>
            {error.hashtag && <span className='text-red-400'>{error.hashtag}</span>}
            <textarea
              name='about'
              onChange={handleChange}
              placeholder='What’s one thing people don’t know about you?'
              className='focus:placeholder:text-white focus:text-white hover:bg-[#DFE3EE] focus:bg-[#006FFF] focus:border-[#006FFF] hover:border-[#A9B0C4] focus:outline-none placeholder:text-input placeholder:text-base  border-solid border-[1px] border-input rounded px-5 py-7 h-[96px] resize-none'
            ></textarea>
            {error.about && <span className='text-red-400'>{error.about}</span>}
            <textarea
              name='space'
              onChange={handleChange}
              placeholder='How do you feel about the Crypto & NFTs space?'
              className='focus:placeholder:text-white focus:text-white hover:bg-[#DFE3EE] focus:bg-[#006FFF] focus:border-[#006FFF] hover:border-[#A9B0C4] focus:outline-none placeholder:text-input placeholder:text-base  border-solid border-[1px] border-input rounded px-5 py-7 h-[96px] resize-none'
            ></textarea>
            {error.space && <span className='text-red-400'>{error.space}</span>}
            <textarea
              name='enter'
              onChange={handleChange}
              placeholder='When did you first enter space?'
              className='focus:placeholder:text-white focus:text-white hover:bg-[#DFE3EE] focus:bg-[#006FFF] focus:border-[#006FFF] hover:border-[#A9B0C4] focus:outline-none placeholder:text-input placeholder:text-base  border-solid border-[1px] border-input rounded px-5 py-7 h-[96px] resize-none'
            ></textarea>
            {error.enter && <span className='text-red-400'>{error.enter}</span>}
            <textarea
              name='favorite'
              onChange={handleChange}
              placeholder='What are some of your favorite NFTs?'
              className='focus:placeholder:text-white focus:text-white hover:bg-[#DFE3EE] focus:bg-[#006FFF] focus:border-[#006FFF] hover:border-[#A9B0C4] focus:outline-none placeholder:text-input placeholder:text-base  border-solid border-[1px] border-input rounded px-5 py-7 h-[96px] resize-none'
            ></textarea>
            {error.favorite && <span className='text-red-400'>{error.favorite}</span>}
            <textarea
              name='collaborate'
              onChange={handleChange}
              placeholder='What collection would you love to collaborate with?'
              className='focus:placeholder:text-white focus:text-white hover:bg-[#DFE3EE] focus:bg-[#006FFF] focus:border-[#006FFF] hover:border-[#A9B0C4] focus:outline-none placeholder:text-input placeholder:text-base  border-solid border-[1px] border-input rounded px-5 py-7 h-[96px] resize-none'
            ></textarea>
            {error.collaborate && <span className='text-red-400'>{error.collaborate}</span>}
            <textarea name='life' onChange={handleChange} placeholder='Real life or The Metaverse?' className='focus:placeholder:text-white focus:text-white hover:bg-[#DFE3EE] focus:bg-[#006FFF] focus:border-[#006FFF] hover:border-[#A9B0C4] focus:outline-none placeholder:text-input placeholder:text-base  border-solid border-[1px] border-input rounded px-5 py-7 h-[96px] resize-none'></textarea>
            {error.life && <span className='text-red-400'>{error.life}</span>}
            <textarea
              name='like'
              onChange={handleChange}
              placeholder='What would you like to be remembered for?'
              className='focus:placeholder:text-white focus:text-white hover:bg-[#DFE3EE] focus:bg-[#006FFF] focus:border-[#006FFF] hover:border-[#A9B0C4] focus:outline-none placeholder:text-input placeholder:text-base  border-solid border-[1px] border-input rounded px-5 py-7 h-[96px] resize-none'
            ></textarea>
            {error.like && <span className='text-red-400'>{error.like}</span>}
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
            <input type='website' name='name' onChange={handleChange} placeholder='Website URL' className='hover:bg-[#DFE3EE]  focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:placeholder:text-white focus:text-white hover:border-[#A9B0C4] placeholder:text-input placeholder:text-base border-solid border-[1px] border-input py-4 pl-4 w-full rounded' />
            {error.website && <span className='text-red-400'>{error.website}</span>}
            <input type='twitter' name='name' onChange={handleChange} placeholder='Twitter URL' className='hover:bg-[#DFE3EE]  focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:placeholder:text-white focus:text-white hover:border-[#A9B0C4] placeholder:text-input placeholder:text-base border-solid border-[1px] border-input py-4 pl-4 w-full rounded' />
            {error.twitter && <span className='text-red-400'>{error.twitter}</span>}
            <input type='instagram' name='name' onChange={handleChange} placeholder='Instagram URL' className='hover:bg-[#DFE3EE]  focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:placeholder:text-white focus:text-white hover:border-[#A9B0C4] placeholder:text-input placeholder:text-base border-solid border-[1px] border-input py-4 pl-4 w-full rounded' />
            {error.instagram && <span className='text-red-400'>{error.instagram}</span>}
            <input type='text' name='facebook' onChange={handleChange} placeholder='Facebook URL' className='hover:bg-[#DFE3EE]  focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:placeholder:text-white focus:text-white hover:border-[#A9B0C4] placeholder:text-input placeholder:text-base border-solid border-[1px] border-input py-4 pl-4 w-full rounded' />
            {error.facebook && <span className='text-red-400'>{error.facebook}</span>}
            <input type='text' name='discord' onChange={handleChange} placeholder='Discord Invite URL' className='hover:bg-[#DFE3EE]  focus:outline-none focus:bg-[#006FFF] focus:border-[#006FFF] focus:placeholder:text-white focus:text-white hover:border-[#A9B0C4] placeholder:text-input placeholder:text-base border-solid border-[1px] border-input py-4 pl-4 w-full rounded' />
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

export { QuestionsPage };
