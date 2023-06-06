import AlcidesImage from '../../../assets/images/alcides-netty.jpg';
import DanielImage from '../../../assets/images/daniel-netty.jpg';
import IvanImage from '../../../assets/images/ivan-netty.jpg';
import JohanImage from '../../../assets/images/johan-netty.jpg';
import JohnImage from '../../../assets/images/john-netty.jpg';
import JulyImage from '../../../assets/images/july-netty.jpg';
import PabloImage from '../../../assets/images/pablo-netty.jpg';

const data = [
  {
    img: JulyImage,
    name: 'July Grullon',
    position: ' Co-Founder, CEO',
    about: 'July has been involved in multiple start-ups and businesses from luxury goods, motorsports & the payment industry. He has over a decade of experience in digital marketing & e-commerce.',
    twitter: 'https://twitter.com/JulyGrullon_',
    linkedin: 'https://www.linkedin.com/in/july-grullon-541b8a44/',
    instagram: 'https://www.instagram.com/julyfgrullon/',
  },
  {
    img: AlcidesImage,
    name: 'Alcides Aguasvivas ',
    position: ' Co-Founder, COO',
    about: 'Alcides, is the co-founder of an award-winning creative agency dedicated to improving brands & e-commerce. He has developed countless of campaigns & business strategies for businesses. ',
    twitter: 'https://twitter.com/alcidezx3',
    linkedin: 'https://www.linkedin.com/in/alcidesaguasvivas',
    instagram: 'https://www.instagram.com/alcides.nyc',
  },
  { img: IvanImage, name: 'Ivan Ferrera', position: ' CTO', about: 'Ivan has over 20 years experience in technology working in startups and Global 500 businesses bringing a wide range of experience and knowledge to our technology portfolio.', twitter: 'https://twitter.com/IvanFerreraNFT', linkedin: 'https://www.linkedin.com/in/ivanferrera', instagram: 'https://www.instagram.com/ivanferrera/' },
  { img: JohnImage, name: 'Jonathan Colton', position: ' Director of Sales and Strategy', about: 'Jonathan has been involved in businesses from Healthcare & Consulting. He has over two decades of experience in business development and sales.', twitter: 'https://twitter.com/jlcolton', linkedin: 'https://www.linkedin.com/in/jlcolton', instagram: 'https://www.instagram.com/jlcolton' },
  { img: PabloImage, name: 'Pablo Segarra, Esq ', position: 'Legal Advisor', about: 'Pablo is a licensed attorney and business development specialist with problem-solving experience in public service, nonprofit, and Web 3.0.', twitter: 'https://twitter.com/PabloEnriqueEsq', linkedin: 'https://www.linkedin.com/in/pablo-segarra-esq', instagram: 'https://www.instagram.com/pabloenriqueesq/' },
  { img: JohanImage, name: 'Johann Rodriguez', position: ' Social Media Coordinator', about: 'Johann has over a decade of experience in management & operations from a wide range of industries. Including private aviation & the music industry.', twitter: 'https://twitter.com/LovJo_', linkedin: 'https://www.linkedin.com/in/johann-rodriguez-bba52b131/', instagram: 'https://www.instagram.com/lovj0' },
  { img: DanielImage, name: 'Daniel Otero', position: ' Data Specialist', about: 'Daniel has an Industrial Engineering background with multiple years of experience in software design. ', twitter: 'https://twitter.com/DanleX100', linkedin: 'https://www.linkedin.com/in/daniel-otero-a12a75238', instagram: 'https://www.instagram.com/danlex100' },
];

const AboutPage = () => {
  return (
    <div>
      <div className='pt-4 pb-[30px] pr-8 pl-8 sm:pl-[70px] max-w-[1300px] xl:pb-16 2xl:mb-[23px] 2xl:mx-auto'>
        <div className='max-w-[1118px]'>
          <div className='pb-2'>
            <span className='text-[27px] text-dark-blue font-bold lg:text-[40px]'>About </span>
            <span className='text-[27px] text-primary font-bold lg:text-[40px]'>NettyWorth</span>
          </div>
          <span className='text-sm md:text-[15px] text-dark-blue font-medium  leading-[28px] md:leading-[28px] xl:text-[22px] lg:leading-9'>NettyWorth is a Web3 fintech that enables users to research, manage and borrow against their digital assets. Our mission is to improve the financial literacy of millions of people around the world and provide users with the best Web3 Platform.</span>
        </div>
      </div>
      <div className='bg-light-gray'>
        <div className='pt-[49px] pr-[31px] pl-8 md:pt-[69px] flex flex-col sm:px-[70px] md:pb-8 items-start md:items-center sm:block lg:pl-[70px] lg:pr-[30px] pb-28 relative 2xl:max-w-[1300px] 2xl:mx-auto'>
          <div className='w-[49px] h-[66px] mt-2 md:w-[62px] md:h-[83px] bg-primary-blue absolute top-[-40px] flex items-center justify-center left-8 sm:left-[70px]'>
            <img src='chervons.svg' className='w-[31px] h-[31px] md:w-10 md:h-10' />
          </div>
          <div className='pb-6 flex gap-2'>
            <span className='text-[27px] md:text-[40px] text-dark-blue font-bold'>The</span>
            <span className='text-[27px] md:text-[40px] text-primary font-bold'>Team</span>
          </div>
          <div className='grid grid-cols-1 max-w-[966px] md:grid-cols-2   xl:grid-cols-3 gap-x-[42px] gap-y-[25px] md:gap-y-[53px] 2xl:max-w-none'>
            {data.map((item, id) => {
              return (
                <div key={id} className='flex flex-col max-w-[355px] md:max-w-[295px] items-start'>
                  <div className='max-h-[400px] relative  md:h-[331px] w-full'>
                    <img src={item.img.src} alt='' className='w-full h-full object-cover block' />
                    <div>
                      <a href={item.twitter} rel='noreferrer' target='_blank' className='flex justify-center items-center absolute w-[30px] h-[30px] p-[9px] top-5 left-[14px] rounded bg-white'>
                        <svg xmlns='http://www.w3.org/2000/svg' width='16.336' fill='#0066FF' height='13.276' viewBox='0 0 16.336 13.276'>
                          <path
                            id='icon-twitter'
                            d='M18.907,6.389a6.7,6.7,0,0,1-1.925.528,3.362,3.362,0,0,0,1.474-1.854,6.71,6.71,0,0,1-2.128.813,3.355,3.355,0,0,0-5.711,3.057,9.515,9.515,0,0,1-6.908-3.5A3.355,3.355,0,0,0,4.745,9.905a3.338,3.338,0,0,1-1.518-.419c0,.014,0,.028,0,.042a3.354,3.354,0,0,0,2.689,3.286,3.357,3.357,0,0,1-1.514.057A3.355,3.355,0,0,0,7.533,15.2,6.725,6.725,0,0,1,3.37,16.635a6.8,6.8,0,0,1-.8-.047,9.532,9.532,0,0,0,14.674-8.03q0-.218-.01-.434a6.809,6.809,0,0,0,1.673-1.735Z'
                            transform='translate(-2.571 -4.817)'
                          />
                        </svg>
                      </a>
                    </div>
                    <div>
                      <a href={item.linkedin} rel='noreferrer' target='_blank' className='flex justify-center items-center absolute w-[30px] h-[30px] top-14 left-[14px] rounded bg-white'>
                        <svg xmlns='http://www.w3.org/2000/svg' width='11.798' height='11.797' viewBox='0 0 11.798 11.797' fill='#0066FF'>
                          <path id='icon-linkedin' d='M2.641,11.8H.195V3.922H2.641ZM1.417,2.847a1.423,1.423,0,1,1,1.417-1.43A1.428,1.428,0,0,1,1.417,2.847ZM11.8,11.8H9.354V7.964c0-.914-.018-2.086-1.272-2.086-1.272,0-1.467.993-1.467,2.02v3.9H4.173V3.922H6.519V5h.034A2.57,2.57,0,0,1,8.867,3.724c2.475,0,2.93,1.63,2.93,3.747V11.8Z' transform='translate(0 -0.001)' />
                        </svg>
                      </a>
                    </div>
                    <div>
                      <a href={item.instagram} rel='noreferrer' target='_blank' className='flex justify-center items-center absolute w-[30px] h-[30px] top-[93px] left-[14px] rounded bg-white'>
                        <svg xmlns='http://www.w3.org/2000/svg' width='36' height='37' viewBox='0 0 36 37'>
                          <g id='Group_3100' data-name='Group 3100' transform='translate(-0.095 0.296)'>
                            <rect id='Rectangle_1095' data-name='Rectangle 1095' width='36' height='37' rx='4' transform='translate(0.095 -0.296)' fill='#fff' />
                            <path
                              id='Icon_awesome-instagram'
                              data-name='Icon awesome-instagram'
                              d='M9.071,6.658a4.652,4.652,0,1,0,4.652,4.652A4.645,4.645,0,0,0,9.071,6.658Zm0,7.677A3.025,3.025,0,1,1,12.1,11.31,3.03,3.03,0,0,1,9.071,14.335ZM15,6.468a1.085,1.085,0,1,1-1.085-1.085A1.083,1.083,0,0,1,15,6.468Zm3.081,1.1a5.37,5.37,0,0,0-1.466-3.8,5.405,5.405,0,0,0-3.8-1.466c-1.5-.085-5.988-.085-7.486,0a5.4,5.4,0,0,0-3.8,1.462,5.388,5.388,0,0,0-1.466,3.8c-.085,1.5-.085,5.988,0,7.487a5.37,5.37,0,0,0,1.466,3.8,5.412,5.412,0,0,0,3.8,1.466c1.5.085,5.988.085,7.486,0a5.37,5.37,0,0,0,3.8-1.466,5.405,5.405,0,0,0,1.466-3.8c.085-1.5.085-5.984,0-7.483Zm-1.935,9.09a3.062,3.062,0,0,1-1.725,1.725c-1.194.474-4.029.364-5.349.364s-4.158.105-5.349-.364A3.062,3.062,0,0,1,2,16.659c-.474-1.194-.364-4.029-.364-5.349S1.528,7.152,2,5.962A3.062,3.062,0,0,1,3.723,4.237c1.194-.474,4.029-.364,5.349-.364s4.158-.105,5.349.364a3.062,3.062,0,0,1,1.725,1.725c.474,1.194.364,4.029.364,5.349S16.619,15.469,16.145,16.659Z'
                              transform='translate(9.5 7.433)'
                              fill='#006fff'
                            />
                          </g>
                        </svg>
                      </a>
                    </div>
                  </div>
                  <span className='text-2xl md:text-xl text-primary pt-[11px] leading-7 md:leading-[23px]'>{item.name}</span>
                  <span className='text-2xl md:text-xl text-dark-blue leading-7 md:leading-[23px]'>{item.position}</span>
                  <span className='pt-[11px] text-dark-blue max-w-[400px] md:max-w-[230px] lg:max-w-full'>{item.about}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export { AboutPage };
