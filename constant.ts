import lavie from './assets/homeImages/la-vie.png';
import lofink from './assets/homeImages/lofink.png';
import madzebra from './assets/homeImages/madzebra.png';
import shlat from './assets/homeImages/shlat.png';
import articleAd from './assets/images/articles-ads.png';
import azuki from './assets/images/azuki.png';
import currencyPic from './assets/images/currency.png';
import mind from './assets/images/mind.png';
import mutant from './assets/images/mutant.png';
import portfolioAd from './assets/images/portfolio-ad.png';
import rectangle from './assets/images/rectangle.png';
import collectionAd from './assets/images/upcoming-collection-ad.png';
import upcomingAd from './assets/images/upcoming-nft.png';

export const menuItems = [
  {
    name: 'Last 24 hours',
    date: '1d',
  },
  {
    name: 'Last 7 days',
    date: '7d',
  },
  {
    name: 'Last 30 days',
    date: '30d',
  },
];

export const cryptoMenuItems = [
  {
    name: 'Last 24 hours',
    date: 'dayPercent',
  },
  {
    name: 'Last 7 days',
    date: 'weekPercent',
  },
];

export const nftLoanCard = [
  {
    name: 'Mutant Ape',
    image: mutant,
    tokenId: '#3572',
    payback: '8.05 ETH',
    Term: '90 Days',
    Loan: '7 ETH',
    APR: '15%',
  },
  {
    name: 'The Currency',
    image: currencyPic,
    tokenId: '#1215',
    payback: '0.84 ETH',
    Term: '60 Days',
    Loan: '0.70 ETH',
    APR: '20%',
  },
  {
    name: 'Azuki',
    image: azuki,
    tokenId: '#1503',
    payback: '9.0 ETH',
    Term: '60 Days',
    Loan: '7.5 ETH',
    APR: '20%',
  },
  {
    name: 'Mind The Gap',
    image: mind,
    tokenId: '#97',
    payback: '0.36 ETH',
    Term: '30 Days',
    Loan: '0.30 ETH',
    APR: '20%',
  },
];

export const loanCondit = [
  {
    title: 'Connect Your Wallet',
    text: 'This allows you to select the NFT you would like to use as collateral for your loan.',
  },
  {
    title: 'Accept a loan term',
    text: 'Get notified when a loan offer is made and select the best loan term for you.',
  },
  {
    title: 'Get access to more ETH',
    text: 'The crypto will be transferred to your wallet and your NFT will be stored safely. Repay your loan before the due date and get your NFT back.',
  },
];

export const loanBenefits = [
  {
    title: 'Get Access to faster liquidity',
    text: 'Most NFTs are illiquid which means selling them often takes time.',
    img: rectangle,
  },
  {
    title: 'No paperwork',
    text: 'No credit score, paperwork is required.',
    img: rectangle,
  },
  {
    title: 'Future blue chip NFTs',
    text: "Don't regret selling your NFTs",
    img: rectangle,
  },
  {
    title: 'Earn more by lending crypto',
    text: 'Offer loan terms and use your idle crypto to earn more.',
    img: rectangle,
  },
];

export const nftRules = [
  {
    title: 'How are my NFTs Protected?',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur vulputate neque id interdum. Donec sed odio lorem. Pellentesque at erat non nulla tempus tincidunt. Suspendisse sit amet aug.',
  },
  {
    title: 'How are my NFTs Protected?',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur vulputate neque id interdum. Donec sed odio lorem. Pellentesque at erat non nulla tempus tincidunt. Suspendisse sit amet aug.',
  },
  {
    title: 'How are my NFTs Protected?',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur vulputate neque id interdum. Donec sed odio lorem. Pellentesque at erat non nulla tempus tincidunt. Suspendisse sit amet aug.',
  },
  {
    title: 'How are my NFTs Protected?',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur vulputate neque id interdum. Donec sed odio lorem. Pellentesque at erat non nulla tempus tincidunt. Suspendisse sit amet aug.',
  },
];

type Breadcrumb = {
  blue: string;
  text: string;
};

export const breadcrumbs: { [key: string]: Breadcrumb } = {
  '/nft-news': { blue: 'NFT', text: 'News' },
  '/crypto-news': { blue: 'Crypto', text: 'News' },
  '/nft-education': { blue: 'NFT', text: 'Education' },
  '/meet-the-creator': { blue: 'NFT', text: 'Interviews' },
  '/metaverse': { blue: 'Metaverse', text: 'News' },
  '/podcasts': { blue: 'NettyWorth', text: 'Podcasts' },
};

export const cryptoParams = {
  '/nft-news': '/category?section=general&topic=NFT&source=Cointelegraph,Decrypt,Reuters,Benzinga,Coindesk,Cryptonews,TheBlock',
  '/crypto-news': '?tickers-include=BTC,ETH,ADA,BNB,DOGE,MATIC,XRP&source=Cointelegraph,Decrypt,Reuters,Benzinga,Coindesk,Cryptonews,TheBlock',
};

const freePlan = ['List Upcoming Project'];
const starterPlan = [...freePlan, 'Banners on site', 'Social Media Post'];
const premiumPlan = [...starterPlan, 'Featured Article'];
const enterPrisePlan = [...premiumPlan, 'National Press Release', 'Podcast interview', 'NYC Time Sq Billboard'];
export const plans = [
  {
    planType: 'List Your Collection',
    price: '$0',
    limit: '&infin;',
    access: freePlan,
    link: '/upcoming-launch',
    name: 'List Your Collection',
    outlink: false,
  },
  {
    planType: 'Starter Package',
    price: '$499.95 USD',
    limit: '5 Days',
    access: starterPlan,
    link: 'https://buy.stripe.com/8wMdU0cIF7Ex3hS14f',
    name: 'Select Plan',
    outlink: true,
  },
  {
    planType: 'Premium Package',
    price: '$1,999.95 USD',
    limit: '30 Days',
    access: premiumPlan,
    link: 'https://calendly.com/jonathan-nettyworth/chat-with-jonathan?month=2023-03',
    name: 'Get In Touch',
    outlink: true,
  },
  {
    planType: 'Enterprise Package',
    price: '$8,999.95 USD',
    limit: '60 Days Banners',
    access: enterPrisePlan,
    link: 'https://calendly.com/jonathan-nettyworth/chat-with-jonathan',
    name: 'Get In Touch',
    outlink: true,
  },
];
export const advertiseRules = ["Select an Advertising Page that's right for you.", 'Make a payment with your Credit Card or Crypto', 'Our team will schedule an Introduction call'];
export const nettyNotice = ['Thousands of Monthly Visitors & Growing', 'Premium Ad space on our site', 'Featured Article on Netty News', 'Access Social Media of 30,000+', 'New York City Time Square Digital Billboard', 'National Press Release'];
export const advertisePages = [
  {
    title: 'Articles & Podcasts ADS',
    img: articleAd,
  },
  {
    title: 'Upcoming Collection Feature AD',
    img: collectionAd,
  },
  {
    title: 'Upcoming NFT AD',
    img: upcomingAd,
  },
  {
    title: 'Portfolio Page Banner',
    img: portfolioAd,
  },
];
export const homeFeedback = [
  {
    name: '@Madzebra N0Fx',
    text: 'Wow. <a class="cursor-pointer" href="https://twitter.com/NettyWorth_" target="_blank"><span class="text-primary font-normal text-[18px] leading-[28px]">@Nettyworth_</span></a> portfolio value tool is impressive. Beyond that, it has live data on current market prices along with upcoming NFT drops. Recommended, I&apos;ll shill to friends.',
    img: madzebra,
  },
  {
    name: '@C_lofink',
    text: 'I wish my value was higher. but super dope tool thank you... Also, no ledger signing was required so felt safe <a class="cursor-pointer" href="https://twitter.com/NettyWorth_" target="_blank"><span class="text-primary font-normal text-[18px] leading-[28px]">@Nettyworth_</span></a>',
    img: lofink,
  },
  {
    name: '@Shlat_eth',
    text: 'I thought <a class="cursor-pointer" href="https://twitter.com/NettyWorth_" target="_blank"><span class="text-primary font-normal text-[18px] leading-[28px]">@Nettyworth_</span></a> was extremely easy to use and its amazing the data it shows.',
    img: shlat,
  },
  {
    name: '@la_vie02',
    text: '<a class="cursor-pointer" href="https://twitter.com/NettyWorth_" target="_blank"><span class="text-primary font-normal text-[18px] leading-[28px]">@Nettyworth_</span></a> I like the platform. could be a good tool in the future!!',
    img: lavie,
  },
];
