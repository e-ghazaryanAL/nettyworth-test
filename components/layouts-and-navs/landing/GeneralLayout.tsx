import { useRouter } from 'next/router';
import ReactConfetti from 'react-confetti';
import { useAccount } from 'wagmi';

import Home from './Home';
import { useAppSelector } from '../../../hooks/redux';
import useScreenSize from '../../../hooks/useScreenSize';
import { useTheme } from '../../../hooks/useTheme';

import dynamic from 'next/dynamic';
import SEO from '../../SEO';

const DashboardLayout = dynamic(() => import('./DasboardLayout'), { ssr: false });
interface IMetadata {
  title: string;
  description: string;
  image: string;
}

type MetadataProps = {
  [key: string]: IMetadata;
};

const metaData: MetadataProps = {
  '/': {
    title: 'NFT Platform, NFT Website | An NFT Platform for Collectors by Collectors',
    description: 'NettyWorth is an NFT platform. An NFT website provides the latest NFT News, NFT Tops Sales, and Upcoming Drops for Ethereum, Cardano, and Solana.',
    image: 'https://nettyworth.io/wp-content/uploads/2022/10/nettyworth-scaled.jpg',
  },
  '/nft-news': {
    title: 'NFT News - The Latest NFT News, Metaverse & NFT Education',
    description: 'NettyWorth is the leading NFT News website - bringing you the latest News, Collection, and Interviews from Gaming, Metaverse, and NFT Projects.',
    image: 'https://nettyworth.io/wp-content/uploads/2022/10/nettyworth-scaled.jpg',
  },
  'nft-top-sales/': {
    title: 'NFT Collection Stats – NettyWorth',
    description: 'NFT Collection Stats – NettyWorth',
    image: 'https://nettyworth.io/wp-content/uploads/2022/10/nettyworth-scaled.jpg',
  },
  '/podcasts': {
    title: 'NFT Podcast - NettyWorth',
    description: 'NettyWorth NFT Podcast Videos - Join us weekly as we discuss trending NFT news, sales, upcoming collections, and market insights.',
    image: 'https://nettyworth.io/wp-content/uploads/2022/10/nettyworth-scaled.jpg',
  },
};

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuth, showAnimation } = useAppSelector((state) => state.isAuth);
  const { mode } = useTheme();
  const router = useRouter();
  const { isConnected } = useAccount();
  const { screenWidth, screenHeight } = useScreenSize();

  return (
    <div className={`${mode}`}>
      {showAnimation && isConnected && <ReactConfetti width={screenWidth} tweenDuration={2000} friction={0.97} height={screenHeight} recycle={false} />}
      {metaData[router.pathname] && <SEO image={metaData[router.pathname]?.image} title={metaData[router.pathname]?.title} description={metaData[router.pathname]?.description} />}
      <div>{isAuth ? <DashboardLayout>{children}</DashboardLayout> : <Home>{children}</Home>}</div>
    </div>
  );
};

export default GeneralLayout;
