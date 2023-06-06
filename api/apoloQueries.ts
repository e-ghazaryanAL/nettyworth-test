import { gql } from 'graphql-request';

import { FilterNfts } from '../redux/news/model';

export const getUpcomingNfts = gql`
  query Posts($dateStart: DateTime, $dateEnd: DateTime, $symbol: String, $postsPerPage: Int) {
    posts(where: { saleDate_gt: $dateStart, saleDate_lt: $dateEnd, blockchain: { symbol: $symbol } }, first: $postsPerPage, orderBy: saleDate_ASC) {
      id
      name
      description
      mainImage {
        id
        url
      }
      totalSupply
      saleDate
      saleTimeTbd
      featured
      freeMint
      mintPrice
      mintPriceTbd
      website
      twitter
      discord
      instagram
      blockchain {
        symbol
      }
      category {
        name
      }
    }
  }
`;

export const getBlockChainMenu = gql`
  {
    blockchains {
      name
      symbol
    }
  }
`;

export const getCategoryMenu = gql`
  {
    categories {
      name
    }
  }
`;

export const getUpcomingBydate = (props: FilterNfts) => {
  return gql`
    query Posts($dateStart: DateTime, $dateEnd: DateTime, ${props.symbol !== 'All' ? ' $symbol: String, ' : ''}${props.category !== 'All NFTs' ? '$category: String, ' : ''}$freeMint: Boolean,$postsPerPage: Int) {
      posts(where: { saleDate_gt: $dateStart, saleDate_lt: $dateEnd, ${props.symbol !== 'All' ? 'blockchain: { symbol: $symbol }, ' : ''}${props.category !== 'All NFTs' ? 'category: { name: $category }, ' : ''}freeMint: $freeMint }, first:$postsPerPage, orderBy: saleDate_ASC) {
        id
        name
        description
        mainImage {
          id
          url
        }
        totalSupply
        saleDate
        saleTimeTbd
        featured
        freeMint
        mintPrice
        mintPriceTbd
        website
        twitter
        discord
        instagram
        blockchain {
          symbol
        }
        category {
          name
        }
      }
    }
  `;
};

export const getMoreUpcomings = (props: FilterNfts) => {
  return gql`
    query Posts($dateStart: DateTime, $dateEnd: DateTime, ${props.symbol !== 'All' ? ' $symbol: String, ' : ''}${props.category !== 'All NFTs' ? '$category: String, ' : ''}$freeMint: Boolean, $postsPerPage: Int) {
      posts(where: { saleDate_gt: $dateStart, saleDate_lt: $dateEnd, ${props.symbol !== 'All' ? 'blockchain: { symbol: $symbol }, ' : ''}${props.category !== 'All NFTs' ? 'category: { name: $category }, ' : ''}freeMint: $freeMint }, first: $postsPerPage, orderBy: saleDate_ASC) {
        id
        name
        description
        mainImage {
          id
          url
        }
        totalSupply
        saleDate
        saleTimeTbd
        featured
        freeMint
        mintPrice
        mintPriceTbd
        website
        twitter
        discord
        instagram
        blockchain {
          symbol
        }
        category {
          name
        }
      }
      postsConnection {
        pageInfo {
          pageSize
        }
      }
    }
  `;
};
