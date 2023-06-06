import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
// import { MAIL_CHIMP_URL } from 'api/api';
// import { CustomForm } from 'components/dashboard/borrow-land/CustomForm';
// import FooterMailForm from 'components/shared/FooterMailForm';
// import Mailchimp from 'react-mailchimp-subscribe';
// import Button from 'components/shared/buttons/Button';
import { useDispatch } from 'react-redux';

// import { ReactComponent as EmailIcon } from '../../../assets/icons/icon-email.svg';
import Etherscan from '../../../assets/images/etherscan-logo.png';
import Nftbank from '../../../assets/images/nftbank.png';
import OpenSea from '../../../assets/images/opensea.png';
import QuickNode from '../../../assets/images/quicknode.png';
import { setIsOpen } from '../../../redux/auth/portfolioSlice';
import { setCookie } from '../../../utils/cookies';
import { footerResources, footerUpcomings, MORE_LINK_ITEMS as footerCompany, socialMediaIcons } from '../constants';

const StaticFooter = () => {
  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(setIsOpen('true'));
    setCookie('isOpen', 'true');
  };

  return (
    <footer className='hidden md:block bg-dark-blue'>
      <div className='container mx-auto md:px-5 2xl:px-5'>
        <div>
          <div className='grid mb-16 border-t border-light-gray pt-12'>
            <div className=''>
              <div className='grid grid-cols-2 gap-7 xl:flex xl:justify-center xl:gap-[100px]'>
                <div>
                  <p className='font-medium text-base text-white'>Products</p>
                  <ul className='mt-1.5'>
                    <li>
                      <Link href='/' onClick={handleOpen} className='p-small text-white hover:text-primary duration-200'>
                        NFT Portfolio
                      </Link>
                    </li>
                    <li>
                      <Link href='/nft-top-sales' className='p-small text-white hover:text-primary duration-200'>
                        NFT Top Sales
                      </Link>
                    </li>
                    <li>
                      <Link href='/upcoming-Solana-nft-launches' className='p-small text-white hover:text-primary duration-200'>
                        Upcoming NFTS
                      </Link>
                    </li>
                    <li>
                      <Link href='/crypto-prices' className='p-small text-white hover:text-primary duration-200'>
                        Crypto Prices
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className='font-medium text-base text-white'>Company</p>
                  <ul className='mt-1.5'>
                    {footerCompany.slice(0, footerCompany.length - 1).map((item, idx) => {
                      return (
                        <li key={idx}>
                          <Link href={item.path} className='p-small text-white hover:text-primary duration-200'>
                            {item.link}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <p className='font-medium text-base text-white'>Resources</p>
                  <ul className='mt-1.5'>
                    {footerResources.map((item, idx) => {
                      return (
                        <li key={idx}>
                          <Link href={item.link} className='p-small text-white hover:text-primary duration-200'>
                            {item.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <p className='font-medium text-base text-white'>Upcoming NFTs</p>
                  <ul className='mt-1.5'>
                    {footerUpcomings.map((item, idx) => {
                      return (
                        <li key={idx}>
                          <Link href={item.link} className='p-small text-white hover:text-primary duration-200'>
                            {item.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            {/* <div className='col-span-4'>
            <h5 className='text-[26px] font-medium leading-7 text-primary'>Subscribe to Our Newsletter</h5>
            <p className='p-small text-white'>Get weekly Crypto and NFT News.</p>
            <Mailchimp url={MAIL_CHIMP_URL} render={({ subscribe, status, message }) => <FooterMailForm status={status} message={message} onValidated={(formData: any) => subscribe(formData)} />} />
          </div> */}
          </div>
        </div>

        <div className='social-icons more-items mt-4 flex gap-3 flex-wrap justify-center mb-8'>
          <div className='social-icons more-items flex gap-4 flex-wrap'>
            {socialMediaIcons.map((item, idx) => {
              return (
                <a href={item.path} target='_blank' key={idx} rel='noreferrer'>
                  <FontAwesomeIcon key={idx} icon={item.icon} className='h-4 w-4 bg-[#0D1A3A] font-medium p-3 text-primary' />
                </a>
              );
            })}
          </div>
        </div>
        <div className='flex items-center pb-8 pt-8 border-t border-[#404a63] justify-center gap-8'>
          <span className='text-[21px] font-light text-white'>List of our data partners:</span>
          <a href='https://www.quicknode.com/' target='_blank' rel='noreferrer'>
            <Image src={QuickNode} alt='quicknode' className='max-w-[116px]' />
          </a>
          <a href='https://etherscan.io/' target='_blank' rel='noreferrer'>
            <Image src={Etherscan} alt='etherscan' className='max-w-[120px]' />
          </a>
          <a href='https://opensea.io/' target='_blank' rel='noreferrer'>
            <Image src={OpenSea} alt='opensea' className='max-w-[108px]' />
          </a>
          <a href='https://nftbank.ai/' target='_blank' rel='noreferrer'>
            <Image src={Nftbank} alt='nftbank' className='max-w-[102px]' />
          </a>
        </div>
        <div className='flex items-center justify-between pb-8 pt-8 border-t border-[#404a63]'>
          <span className='text-white text-sm'>&copy; {new Date().getFullYear()} NettyWorth. All Rights Reserved.</span>
          <div className='flex items-center'>
            <Link href='/privacy' className='text-white text-sm mr-3 hover:text-primary duration-200'>
              Privacy Policy
            </Link>
            <Link href='/service' className='text-white text-sm hover:text-primary duration-200'>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default StaticFooter;
