import algoliasearch from 'algoliasearch';
import axios, { AxiosRequestConfig } from 'axios';
import { ethers } from 'ethers';
import { GraphQLClient } from 'graphql-request';

import { AlertCategory } from '../redux/alerts/model';
import { CryptoCurrencyParams, CryptoCurrencyStatParams } from '../redux/crypto/model';
import { INftFloorPrice, IRarityTokens, IWalletNFTPnL } from '../redux/my-nfts/model';
import { FetchCryptoNewsParams, FetchNewsParams, INettyNews } from '../redux/news/model';
import { CollectionsAssetsParams, ITokensByColl, ITopSalesDataParams, TopSalesDetailNftsParams } from '../redux/top-sales/model';
import { IEthCurrency, ISaveWallet, IUserDetails, IWalletValueParams } from '../redux/wallet/model';
import { clearCookies, getCookie, setCookie } from '../utils/cookies';
import { buildParams } from '../utils/formatter';

const BASE_URL = 'https://app-api-1.nettyart.io';
const NETTY_URL = 'https://app-api.nettyworth.io/api';
// const NETTY_URL = 'http://localhost:3001/api';
const OPENSEA_URL = 'https://api.opensea.io/api/v1';
const HYGRAPH_URL = `https://api-us-east-1.hygraph.com/v2/${process.env.NEXT_PUBLIC_HYGRAPH_API_KEY}/master`;
const UPSHOT_URL = 'https://api.upshot.xyz/v2';
const GALLOP_URL = 'https://api.prod.gallop.run/v1';
export const QUICKNODE_URL = `https://distinguished-attentive-river.discover.quiknode.pro/${process.env.NEXT_PUBLIC_QUICKNODE_API_KEY}/`;
export const ETHWallet = '0x04a6Fa2a0DdAA58186Bdb5A92627419eABa79635';
export const searchClient = algoliasearch(`${process.env.NEXT_PUBLIC_ALGOLIA_APP_ID}`, `${process.env.NEXT_PUBLIC_ALGOLIA_API_KEY}`);
export const MAIL_CHIMP_URL = 'https://nettyart.us5.list-manage.com/subscribe/post-json?u=231e2a6d374606653a3e22abe&id=0d65199a02&f_id=0062efe6f0&c=jQuery19005687377112970748_1667558282051&amp=&subscribe=Subscribe&_=1667558282052';

export const getEthCurrency = async (): Promise<IEthCurrency> => {
  return axios.get(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`).then((res) => res.data.result);
};

export const getWalletBalance = async (walletAddress: string) => {
  const Provider = new ethers.providers.JsonRpcProvider(QUICKNODE_URL);
  const balance = await Provider.getBalance(walletAddress, 'latest');
  return balance;
};

const getRequest = async (url: string, config?: AxiosRequestConfig, isOpenseaUrl: boolean = false, isNettyWorth = false) => {
  let requestUrl;

  if (isNettyWorth) {
    requestUrl = NETTY_URL + url;
  } else if (isOpenseaUrl) {
    requestUrl = OPENSEA_URL + url;
  } else {
    requestUrl = BASE_URL + url;
  }

  const requestConfig = { ...config };

  if (isOpenseaUrl) {
    requestConfig.headers = { accept: 'application/json', 'X-API-KEY': 'c1051ef9ad3643a0abaeb5f2a7126352' };
  } else {
    const token = getCookie('_token');

    if (token) {
      requestConfig.headers = {
        ...requestConfig?.headers,
        Authorization: `Bearer ${token}`,
        // withCredentials: true
      };
    }
  }
  const result = await axios.get(requestUrl, requestConfig);
  return result.data;
};

export const postRequest = async (url: string, body?: object, config?: AxiosRequestConfig, isOpenseaUrl = false, isNettyWorth = false) => {
  const requestConfig = { ...config };
  let requestUrl;

  if (isNettyWorth) {
    requestUrl = NETTY_URL + url;
  } else if (isOpenseaUrl) {
    requestUrl = OPENSEA_URL + url;
  } else {
    requestUrl = BASE_URL + url;
  }

  const token = getCookie('_token');
  if (token) {
    requestConfig.headers = {
      ...requestConfig?.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  const result = await axios.post(requestUrl, body, requestConfig);
  return result.data;
};

const putRequest = async (url: string, body?: Record<string, any>, config?: AxiosRequestConfig, withAuth = true) => {
  const token = getCookie('_token');

  if (withAuth) {
    config = {
      ...config,
      headers: {
        ...config?.headers,
        Authorization: `Bearer ${token}`,
      },
      // withCredentials: true,
    };
  }

  const result = await axios.put(NETTY_URL + url, body, config);

  return result.data;
};

export const getCollectionStat = async (collectionSlug: string) => {
  return getRequest(`/asset_contract/${collectionSlug}`, undefined, true);
};

export const getRelevantCollection = async (ownerAddress: string) => {
  return getRequest(
    `/collections?asset_owner=${ownerAddress}`,
    {
      params: {
        offset: 0,
        limit: 300,
      },
    },
    true
  );
};

export const getAssetsDetails = async (asset: { collectionAddress: string; collectionTokenId: string }) => {
  return axios.get(`${NETTY_URL}/nftb/value?collectionAddress=${asset.collectionAddress}&tokenId=${asset.collectionTokenId}`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
};
export interface FavoriteProps {
  itemId: number | string;
  category: 'NFTSales' | 'CryptoSales';
  value: boolean;
}

export const toggleFavoriteApi = (payload: FavoriteProps) => {
  return putRequest('/favorites/toggle', payload);
};

export const getUserCryptoFav = async () => {
  return getRequest('/favorites?category=CryptoSales', {}, false, true);
};

export const getUserNFTFav = async <T>(): Promise<T> => {
  return getRequest('/favorites?category=NFTSales', {}, false, true);
};

export const getTopSalesDetailFilters = async (slug: string) => {
  return postRequest(`/nft-top-sales/api/assets/traits/${slug}`);
};

export const getTopSalesDetailNfts = async (slug: string, body: { traits: string }, params: TopSalesDetailNftsParams) => {
  return postRequest(`/nft-top-sales/api/assets/${slug}`, body, { params });
};

export const getNewsData = async (params: FetchNewsParams) => {
  const res = await axios.get('https://wp.nettyworth.io/wp-json/wp/v2/posts', { params });
  return res;
};

export const getNewsDetail = async (slug: string): Promise<INettyNews[]> => {
  const res = await axios.get(`https://wp.nettyworth.io/wp-json/wp/v2/posts?slug=${slug}`);
  return res.data;
};

export const saveWallet = async (walletData: ISaveWallet) => {
  const res = await axios.post(`${NETTY_URL}/eth/wallets`, walletData);
  return res;
};

export const getCryptoCurrency = async (params: CryptoCurrencyParams) => {
  const res = await getRequest('/crypto/prices?convert=USD', { params }, false, true);
  return res;
};
export const getNotifications = async () => {
  const res = await getRequest('/notifications', {}, false, true);
  return res;
};

export const setNotifications = async (alertCategory: { category: AlertCategory; value: boolean }) => {
  const res = await postRequest('/notifications/settings', alertCategory, undefined, false, true);
  return res;
};
export const getCryptoFilters = async () => {
  const res = await axios.get(`${NETTY_URL}/crypto/fiat`);
  return res.data;
};

export const registerUser = async (body: Record<string, any>) => {
  const res = await postRequest('/users/register', body, undefined, false, true);
  return res;
};

export const getUserDetail = async (): Promise<Pick<IUserDetails, 'email' | 'name' | 'phone' | 'profile_picture'>> => {
  const res = await getRequest('/users/profile', undefined, false, true);
  return res;
};

export const updateUserDetail = async (body: Pick<IUserDetails, 'email' | 'name' | 'phone'>) => {
  const res = await putRequest('/users/updateprofile', body);
  return res;
};

export const loginUser = async (credentials: { email: string; pwd: string }) => {
  const res = await postRequest('/auth', credentials, { withCredentials: true }, false, true);
  return res;
};

export const passwordReset = async () => {
  const res = await getRequest('/users/password-reset', undefined, false, true);
  return res;
};

export const passwordUpdate = async (body: { password: string; token: string; email: string }, url: 'forgot-password' | 'password-reset') => {
  const res = await postRequest(`/users/${url}`, body, undefined, false, true);
  return res;
};

export const forgotPassword = async (body: { email: string }) => {
  const res = await postRequest('/users/reset-password', body, undefined, false, true);
  return res;
};

export const uploadUserImg = async (body: FormData) => {
  const res = await postRequest(
    '/users/updateProfileImage',
    body,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
    false,
    true
  );
  return res;
};

export const logoutUser = async () => {
  const token = getCookie('_token');
  try {
    const res = await axios.get(`${NETTY_URL}/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    clearCookies();
    const img = document.createElement('img');
    img.src = 'https://mail.google.com/mail/u/0/?logout&hl=en';
    document.getElementById('body')?.appendChild(img);

    return res;
  } catch (e) {
    throw new Error('');
  }
};

export const refreshToken = async () => {
  const token = getCookie('_token');

  return axios.get(`${NETTY_URL}/refresh`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
};

const axiosInstance = axios.create();

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error) {
      if (originalRequest.url === `${NETTY_URL}/refresh`) {
        // await logoutUser();
        // removeCookie('_token');
        // window.location.reload();
        return Promise.reject(error);
      }
      if (error.response.status === 403 || error.response.data === 'jwt expired') {
        const {
          data: { accessToken },
        }: any = await refreshToken();

        setCookie('_token', accessToken);

        return axiosInstance({
          ...originalRequest,
          headers: { ...originalRequest.headers, Authorization: `Bearer ${accessToken}` },
          sent: true,
        });
      }
    }

    return Promise.reject(error);
  }
);

export const getCryptoDetails = async (params: { id: string }) => {
  const res = await axios.get(`${NETTY_URL}/crypto/quote`, { params });
  return res.data;
};

export const getCryptoMetadata = async (params: { symbol: string }) => {
  const res = await axios.get(`${NETTY_URL}/crypto/metadata`, { params });
  return res.data;
};

export const getCryptoMap = async (params: { start?: number; limit?: number; symbol: string }) => {
  const res = await axios.get(`${NETTY_URL}/crypto/currencies`, { params });
  return res.data;
};
export const getCryptoNews = async (url: string, params: FetchCryptoNewsParams) => {
  const res = await axios.get(`https://cryptonews-api.com/api/v1${url}&token=${process.env.NEXT_PUBLIC_CRYPTO_NEWS_KEY}`, { params });
  return res.data;
};

const getfromGallop = async (url: string, config: Record<string, any>) => {
  const options = {
    method: 'POST',
    headers: {
      mode: 'no-cors',
      accept: 'application/json',
      'content-type': 'application/json',
      'x-api-key': `${process.env.NEXT_PUBLIC_GALLOP_API_KEY}`,
    },
    body: JSON.stringify(config),
  };
  const res = await fetch(`${GALLOP_URL}${url}`, options);
  const nftData = await res.json();
  return nftData.response;
};
export const getNFTValue = async ({ wallet_address, historical, include_hist_nfts }: IWalletValueParams) => {
  return getfromGallop('/insights/eth/getWalletValuation', { wallet_address, historical, include_hist_nfts });
};

export const getCollectionFloorPrice = async (collection_address: string[]): Promise<INftFloorPrice> => {
  return getfromGallop('/data/eth/getMarketplaceFloorPrice', { collection_address });
};

export const getTokenRarityByCollection = async (collection_address: string, token_id: string[]): Promise<IRarityTokens[]> => {
  return getfromGallop('/analytics/eth/getRarity', { collection_address, token_id });
};

export const getSummaryTokenStats = async (collection_address: string, token_id: string[], rept_curr: 'eth' | 'usd') => {
  return getfromGallop('/analytics/eth/getTokenSummary', { collection_address, token_id, rept_curr });
};

export const getTokensByCollection = async (collection_address: string, page: number, page_size: 50 | 100 | 150): Promise<ITokensByColl> => {
  return getfromGallop('/data/eth/getTokens', { collection_address, page, page_size });
};

export const getWalletTotalCost = async (wallet_address: string, rept_curr: 'eth' | 'usd', include_detail: boolean): Promise<IWalletNFTPnL> => {
  return getfromGallop('/analytics/eth/getWalletPnL', { wallet_address, rept_curr, include_detail });
};

export const graphqlClient = new GraphQLClient(HYGRAPH_URL, {
  headers: {
    authorization:
      'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NjYwNDI0MjYsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEuaHlncmFwaC5jb20vdjIvY2w5ZDhqeG5vMDRvNDAxdW84bnN2NHVpaS9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiMzhiN2ZiZTgtNDNkMS00MjRiLTgzNzYtY2Y2ZGUyOTYwODkwIiwianRpIjoiY2w5ZGFuN21pMDgydDAxdXUxaG54NDh0biJ9.Aryxu8axVaACoPhEgfTGOQmtg27HU64ZF6uqjf6ekKhg_jFC6ZsgRvS5mlL0f1TcExr1g47MCxWEp5aPVD3WYP90I2Np0ZP9dUvPEXTJ7RLBMl5coe3-dPZxgJhpb2y_0a9k7SG7hMtYSR1nIJQbyNTelQNH1UP2cJ-P-msNB6jI9R7UkroRh5XaGA--ftSRf3nA7BI906xjbsa8r39SZHho78ArXpaGkBATP9uRllKntLbYajLi1uBKaVpZqmtOytOvKa1SDHkygCWJKfaL_GtM6328pLhOhNsArvZmD2uxKTc22LCbjfV2nmrxyOCVYbkkrfCgaV3C-K5oZZUHUBtyw2-U3DZb1RCkc87AOtr_a70Nse4XdxU_WmnJ1kotKKPJP0oB3upFecjIXF88_TiDqsv9asvsDuYje9fL_58NnyG3EnjOD9QQK4hk17h0iTrBRL2NOYyLH77x3jDreAbLpJ4-P-fOY7q_WlQ_XY6JMLaC30a3TuhQXpyVxyYB01KXRjctu4NaCsC1uUR_IvwI8Z1gBzkdLsI3gsb7B5Hw_JPGvqtZ1J0F2_SGju1yFxEenDdYBVcz55LsbzjfdBX_XJMZRwvNbVG_EY3_cIkv2w5NLpMcut9rtIXfNutKOxO4Lir8PjenptWA7mgb3cE1-ml-jr_Pj8Z28t7Spek',
  },
});

export const getCryptoStats = async (params: CryptoCurrencyStatParams) => {
  const res = await axios.get(`${NETTY_URL}/crypto/stats`, { params });
  return res.data;
};

const getfromUpshot = async (url: string, params: Record<string, any>) => {
  const res = await fetch(`${UPSHOT_URL}${url}?${new URLSearchParams(params).toString()}`, {
    method: 'GET',
    headers: { accept: 'application/json', 'x-api-key': 'UP-b983fbddb7a043259d38d929' },
  });
  const nftData = await res.json();
  return nftData.data;
};

export const getTopSalesCollection = async (params: ITopSalesDataParams) => {
  const modifiedparams = buildParams(params);
  return getfromUpshot('/collections', modifiedparams);
};

export const getTopSalesDetail = async (params: CollectionsAssetsParams, url: string) => {
  const { slug, ...restParams } = params;
  return getfromUpshot(`/collections/${slug}/${url}`, restParams);
};

export const getWalletUpshot = <T>(params: { walletAddress: string } & Omit<ITopSalesDataParams, 'search_term' | 'tag_ids' | 'slug'>, url: string): Promise<T> => {
  const { walletAddress, ...queryParams } = params;
  const modifiedParams = buildParams(queryParams);
  return getfromUpshot(`/wallets/${walletAddress}/${url}`, modifiedParams);
};
