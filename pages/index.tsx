import MainPage from '../components/dashboard/home/Home';
import OrganizationSchema from '../components/Organization';

const structuredData = {
  '@context': 'http://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Nettyworth',
      url: 'https://nettyworth.io/',
      logo: 'https://nettyworth.io/static/media/nettyworthbeta.e201c0650599b3313d3b.png',
      sameAs: ['https://twitter.com/NettyWorth_', 'https://www.tiktok.com/@nettyworth.io', 'https://www.instagram.com/p/Cl9HfxlJGNf/'],
      description: 'Connect your wallet to view your total Crypto and NFT value.',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://nettyworth.io/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'NFT Loans',
          item: 'https://nettyworth.io/nft-loans',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Crypto',
          item: 'https://nettyworth.io/crypto-prices',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'News',
          item: 'https://nettyworth.io/nft-news',
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: 'Upcoming',
          item: 'https://nettyworth.io/upcoming-Ethereum-nft-launches',
        },
        {
          '@type': 'ListItem',
          position: 6,
          name: 'NFT Sales',
          item: 'https://nettyworth.io/nft-top-sales',
        },
        {
          '@type': 'ListItem',
          position: 7,
          name: 'Videos',
          item: 'https://nettyworth.io/podcasts',
        },
        {
          '@type': 'ListItem',
          position: 8,
          name: 'Feedback',
          item: 'https://nettyworth.io/feedback',
        },
      ],
    },
  ],
};

function App() {
  return (
    <div>
      <OrganizationSchema data={structuredData} />
      <MainPage />
    </div>
  );
}

export default App;
