import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import { MOBILE_MORE_LINK_ITEMS as more_links, MORE_LEGAL_LINK_ITEMS as legal_links, socialMediaIcons } from '../constants';

interface IMoreNavMobile {
  isOpen: boolean;
  handleMoreBar: () => void;
}

const MoreNavMobile: React.FC<IMoreNavMobile> = ({ isOpen, handleMoreBar }) => {
  return (
    <div>
      <div className={`more-container more-container-mobile ${isOpen ? 'open' : 'flex'}`}>
        <div className='close-icon-btn'>
          <FontAwesomeIcon icon={faTimes} onClick={handleMoreBar} className='icons' />
        </div>
        <div className='more-wrappers'>
          <h3>Explore</h3>
          <ul className='more-items'>
            {more_links.map((link, id) => {
              return (
                <li key={id}>
                  <Link href={link} target={link === 'FeedBack' ? '_blank' : ''}>
                    {link}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className='more-wrappers'>
          <h3>Follow us</h3>
          <div className='social-icons  more-items mobile'>
            {socialMediaIcons.map((item, idx) => {
              return (
                <a href={item.path} target='_blank' key={idx} rel='noreferrer'>
                  <FontAwesomeIcon icon={item.icon} className='icons' key={idx} />
                </a>
              );
            })}
          </div>
        </div>
        <div className='more-wrappers'>
          <h3>Legal</h3>
          <ul className='more-items'>
            {legal_links.map((link, id) => {
              return (
                <li key={id}>
                  <a href={link.path}>{link.link}</a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className='more-wrappers'>
          <p className='more-copyrights mobile'>
            <span>&copy; {new Date().getFullYear()} NettyWorth </span>
            <span>All Rights Reserved</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default MoreNavMobile;
