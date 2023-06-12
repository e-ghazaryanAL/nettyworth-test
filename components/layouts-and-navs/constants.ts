import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faFacebookF, faInstagram, faLinkedin, faTiktok, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

import CalendarIcon from '../../assets/icons/icon-calendar.svg';
import CryptoPricesIcon from '../../assets/icons/icon-crypto.svg';
import FeedbackIcon from '../../assets/icons/icon-feedback.svg';
import BorrowLendIcon from '../../assets/icons/icon-lend-1.svg';
import MoreIcon from '../../assets/icons/icon-more.svg';
import NewsIcon from '../../assets/icons/icon-news.svg';
import PodcastsIcon from '../../assets/icons/icon-podcast.svg';
import PortfolioIcon from '../../assets/icons/Icon-portfolio.svg';
// import { ReactComponent as SearchIcon } from '../../assets/icons/icon-search.svg';
import TopSalesIcon from '../../assets/icons/icon-top-sales.svg';

export const MORE_LINK_ITEMS = [
  {
    link: 'About us',
    path: '/about',
  },
  {
    link: 'Contact',
    path: 'contact',
  },
  {
    link: 'Advertise',
    path: '/nft-advertising',
  },
  {
    link: 'Feedback',
    path: '/feedback',
  },
  {
    path: '/nft-advertising',
    link: 'List your collection',
  },
];

export const MORE_LINK_ITEMSMENU = [
  {
    link: 'Portfolio',
    path: '/',
  },
  {
    link: 'NFT Loans',
    path: '/nft-loans ',
  },
  {
    path: '/crypto-prices',
    link: 'Crypto',
  },
  {
    path: '/nft-news',
    link: 'News',
  },
  {
    link: 'Upcoming',
    path: '/upcoming-Ethereum-nft-launches',
  },
  {
    path: '/nft-top-sales',
    link: 'NFT Sales',
  },
  {
    path: '/nft-education',
    link: 'Education',
  },
  {
    path: '/podcasts',
    link: 'Videos',
  },
];

export const MORE_LEGAL_LINK_ITEMS = [
  {
    link: 'Privacy Policy',
    path: '/privacy',
  },
  {
    link: 'Terms of service',
    path: '/service',
  },
];

export const MOBILE_MORE_LINK_ITEMS = ['Learn', 'Feedback', 'About us', 'Contact', 'Advertise', 'List Collection'];

export const sideBarLinks = [
  {
    link: '/portfolio',
    Icon: PortfolioIcon,
    title: 'Portfolio',
  },
  {
    link: '/nft-loans',
    Icon: BorrowLendIcon,
    title: 'NFT Loans',
  },
  {
    link: '/crypto-prices',
    Icon: CryptoPricesIcon,
    title: 'Crypto',
  },
  {
    link: '/nft-news',
    Icon: NewsIcon,
    title: 'News',
  },
  {
    link: '/upcoming-Ethereum-nft-launches',
    Icon: CalendarIcon,
    title: 'Upcoming',
  },
  {
    link: '/nft-top-sales',
    Icon: TopSalesIcon,
    title: 'NFT Sales',
  },
  {
    link: '/podcasts',
    Icon: PodcastsIcon,
    title: 'Videos',
  },
  {
    link: '/feedback',
    Icon: FeedbackIcon,
    title: 'Feedback',
  },
  {
    link: '',
    Icon: MoreIcon,
    title: 'More',
  },
];

export const mobileSideBarLinks = [
  {
    link: '/portfolio',
    Icon: PortfolioIcon,
    title: 'Portfolio',
  },
  {
    link: '/crypto-prices',
    Icon: CryptoPricesIcon,
    title: 'Crypto',
  },
  {
    link: 'nft-news',
    Icon: NewsIcon,
    title: 'News',
  },
  {
    link: '/upcoming-Ethereum-nft-launches',
    Icon: CalendarIcon,
    title: 'Upcoming',
  },
  {
    link: '/nft-top-sales',
    Icon: TopSalesIcon,
    title: 'NFT Sales',
  },
];

export interface ISoialMediaIcons {
  path: string;
  icon: IconDefinition;
  media: string;
}
export const socialMediaIcons: ISoialMediaIcons[] = [
  {
    path: 'https://www.facebook.com/NettyWorthWeb3/',
    icon: faFacebookF,
    media: 'Facebook',
  },
  {
    path: 'https://www.tiktok.com/@nettyworth.io',
    icon: faTiktok,
    media: 'Tiktok',
  },
  {
    path: 'https://www.youtube.com/channel/UCS728rmdZt-IudjmVQOwN4g',
    icon: faYoutube,
    media: 'Youtube',
  },
  {
    path: 'https://www.linkedin.com/company/nettyworth',
    icon: faLinkedin,
    media: 'Linkedin',
  },
  {
    path: 'https://twitter.com/NettyWorth_',
    icon: faTwitter,
    media: 'Twitter',
  },
  {
    path: 'https://www.instagram.com/nettyworth.io',
    icon: faInstagram,
    media: 'Instagram',
  },
];

interface ILinks {
  link: string;
  title: string;
}
export const staticNavbarLinks: ILinks[] = [
  {
    link: '/login',
    title: 'Portfolio',
  },
  {
    link: '/nft-loans',
    title: 'NFT Loans',
  },
  {
    link: '/crypto-prices',
    title: 'Crypto',
  },
  {
    link: '/nft-news',
    title: 'News',
  },
  {
    link: '/upcoming-Ethereum-nft-launches',
    title: 'Upcoming',
  },
  {
    link: '/nft-top-sales',
    title: 'NFT Sales',
  },
  {
    link: 'podcasts',
    title: 'Videos',
  },
];
export const footerResources: ILinks[] = [
  {
    link: 'nft-news/what-are-nfts',
    title: 'What are NFTs',
  },
  {
    link: 'nft-news/nft-glossary-101',
    title: 'NFT Glossary',
  },
  {
    link: '/podcasts',
    title: 'Podcast',
  },
  {
    link: 'nft-education',
    title: 'Learn',
  },
];
export const footerUpcomings: ILinks[] = [
  {
    link: '/upcoming-Ethereum-nft-launches',
    title: 'Upcoming Ethereum NFTs',
  },
  {
    link: '/upcoming-Solana-nft-launches',
    title: 'Upcoming Solana NFTs',
  },
  {
    link: '/upcoming-Cardano-nft-launches',
    title: ' Upcoming Cardano NFTs',
  },
  {
    link: '/upcoming-free-nft-mint',
    title: 'Upcoming Free NFT Mints',
  },
  {
    link: '/nft-advertising',
    title: 'List your NFT Collection!',
  },
];
