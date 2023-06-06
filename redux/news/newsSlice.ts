import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { FetchCryptoNewsParams, FetchNewsParams, FetchUpcomingNftsVariables, IBlockchainMenuPaylod, NewsState, IUpcomingPostPayload, IUpcomingCategoriesPayload } from './model';
import { getCryptoNews, getNewsData, graphqlClient } from '../../api/api';
import { getBlockChainMenu, getCategoryMenu, getUpcomingNfts } from '../../api/apoloQueries';

export const fetchNewsData = createAsyncThunk('news/fetchNewsData', async (params: FetchNewsParams, { rejectWithValue }) => {
  try {
    const { isMobile, ...param } = params;
    const res = await getNewsData(param);

    return { isMobile, data: res.data, totalPages: res.headers['x-wp-totalpages'] };
  } catch (e) {
    return rejectWithValue((e as AxiosError).message);
  }
});

export const fetchCryptoNews = createAsyncThunk('news/fetchCryptoNews', async ({ url, params }: { url: string; params: FetchCryptoNewsParams }, { rejectWithValue }) => {
  const { isLoadMore, ...param } = params;

  try {
    const res = await getCryptoNews(url, param);
    return { data: res.data, isMobile: isLoadMore, total_pages: res.total_pages };
  } catch (e) {
    return rejectWithValue((e as AxiosError).message);
  }
});

export const fetchDashboardNews = createAsyncThunk('news/fetchDashboardNews', async ({ url, params }: { url: string; params: {} & FetchCryptoNewsParams }, { rejectWithValue }) => {
  try {
    const res = await getCryptoNews(url, params);
    return res;
  } catch (e) {
    return rejectWithValue((e as AxiosError).message);
  }
});

export const fetchDashboardNewsMount = createAsyncThunk('news/fetchDashboardNewsMount', async (_, { rejectWithValue }) => {
  try {
    const res = await getCryptoNews('/category?section=general&source=Cointelegraph,Decrypt,Reuters,Benzinga,Coindesk,Cryptonews,TheBlock&topic=NFT', { page: 1, items: 4 });
    return res;
  } catch (e) {
    return rejectWithValue((e as AxiosError).message);
  }
});

export const fetchUpcomingNfts = createAsyncThunk('news/fetchUpcomingNfts', async (variables: FetchUpcomingNftsVariables, { rejectWithValue }) => {
  try {
    const res = await graphqlClient.request<IUpcomingPostPayload>(getUpcomingNfts, variables);
    return res;
  } catch (e) {
    return rejectWithValue((e as AxiosError).message);
  }
});

export const fetchBlockChainMenu = createAsyncThunk('news/fetchBlockChainMenu', async (_, { rejectWithValue }) => {
  try {
    const res = await graphqlClient.request<IBlockchainMenuPaylod>(getBlockChainMenu);
    return res;
  } catch (e) {
    return rejectWithValue((e as AxiosError).message);
  }
});

export const fetchCategoryMenu = createAsyncThunk('news/fetchCategoryMenu', async (_, { rejectWithValue }) => {
  try {
    const res = await graphqlClient.request<IUpcomingCategoriesPayload>(getCategoryMenu);
    return res;
  } catch (e) {
    return rejectWithValue((e as AxiosError).message);
  }
});

const initialState: NewsState = {
  newsData: [],
  newsDetail: [],
  dashboardNews: [],
  cryptoNews: [],
  crypoNewsTotalPages: 0,
  cryptoNewsLoading: false,
  dashboardNewsTotalPages: 0,
  dashboardNewsLoading: false,
  upcomingNfts: null,
  upcomingBlockchainMenu: null,
  upcomingCategoryMenu: null,
  newsTotalPages: 0,
  newsPage: 1,
  loading: false,
  detailLoading: false,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewsData.fulfilled, (state, action) => {
        state.loading = false;
        state.newsData = action.payload.isMobile ? [...state.newsData, ...action.payload.data] : action.payload.data;
        state.newsTotalPages = Number(action.payload.totalPages);
      })
      .addCase(fetchUpcomingNfts.fulfilled, (state, action) => {
        state.upcomingNfts = action.payload;
      })
      .addCase(fetchBlockChainMenu.fulfilled, (state, action) => {
        state.upcomingBlockchainMenu = [{ symbol: 'All', name: 'All Blockchains' }, ...action.payload.blockchains];
      })
      .addCase(fetchCategoryMenu.fulfilled, (state, action) => {
        state.upcomingCategoryMenu = [{ name: 'All NFTs' }, ...action.payload.categories];
      })
      .addCase(fetchDashboardNews.pending, (state) => {
        state.dashboardNewsLoading = false;
      })
      .addCase(fetchDashboardNewsMount.fulfilled, (state, action) => {
        state.dashboardNews = [...action.payload.data];
      })
      .addCase(fetchDashboardNews.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardNews = [...state.dashboardNews, ...action.payload.data];
        state.dashboardNewsTotalPages = action.payload.total_pages;
      })
      .addCase(fetchCryptoNews.pending, (state) => {
        state.cryptoNewsLoading = true;
      })
      .addCase(fetchCryptoNews.fulfilled, (state, action) => {
        state.cryptoNewsLoading = false;
        state.cryptoNews = action.payload.isMobile ? [...state.cryptoNews, ...action.payload.data] : action.payload.data;
        state.crypoNewsTotalPages = action.payload.total_pages;
      });
  },
});

export default newsSlice.reducer;
