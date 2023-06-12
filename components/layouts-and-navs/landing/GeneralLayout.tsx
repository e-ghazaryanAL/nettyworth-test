import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import ReactConfetti from 'react-confetti';
import { useAccount } from 'wagmi';

import DashboardLayout from './DasboardLayout';
import Home from './Home';
import { useAppSelector } from '../../../hooks/redux';
import { useTheme } from '../../../hooks/useTheme';
import SEO from '../../SEO';

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
  const { showAnimation } = useAppSelector((state) => state.isAuth);
  const { data: session } = useSession();
  const { mode } = useTheme();
  const router = useRouter();
  const { isConnected } = useAccount();

  return (
    <div className={`${mode}`}>
      {showAnimation && isConnected && <ReactConfetti width={1920} tweenDuration={2000} friction={0.97} height={1080} recycle={false} />}
      {metaData[router.pathname] && <SEO image={metaData[router.pathname]?.image} title={metaData[router.pathname]?.title} description={metaData[router.pathname]?.description} />}
      <div>{session?.user ? <DashboardLayout>{children}</DashboardLayout> : <Home>{children}</Home>}</div>
    </div>
  );
};

export default GeneralLayout;
