import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { CryptoCurrencyParams, CryptoCurrencyStatParams, ICryptoData } from './model';
import { getCryptoCurrency, getCryptoDetails, getCryptoFilters, getCryptoMap, getCryptoMetadata, getCryptoStats } from '../../api/api';

export const fetchCryptoCurrency = createAsyncThunk('crypto/fetchCryptoCurrency', async (params: CryptoCurrencyParams, { rejectWithValue }) => {
  try {
    const res = await getCryptoCurrency(params);
    return res;
  } catch (e) {
    return rejectWithValue((e as AxiosError).message);
  }
});

export const fetchCryptoCurrencyMount = createAsyncThunk('crypto/fetchCryptoCurrencyMount', async (params: CryptoCurrencyParams, { rejectWithValue }) => {
  try {
    const res = await getCryptoCurrency(params);
    return res;
  } catch (e) {
    return rejectWithValue((e as AxiosError).message);
  }
});

export const fetchCryptofilters = createAsyncThunk('crypto/fetchCryptofilters', async (_, { rejectWithValue }) => {
  try {
    const res = await getCryptoFilters();
    return res;
  } catch (e) {
    return rejectWithValue((e as AxiosError).message);
  }
});

export const fetchCrypoDetails = createAsyncThunk('crypto/fetchCryptoDetails', async (params: { id: string }, { rejectWithValue }) => {
  try {
    const res = await getCryptoDetails(params);
    return res;
  } catch (e) {
    return rejectWithValue((e as AxiosError).message);
  }
});

export const fetchCryptoMetadata = createAsyncThunk('crypto/fetchCryptoMetadata', async (params: { symbol: string }, { rejectWithValue }) => {
  try {
    const res = await getCryptoMetadata(params);
    return res;
  } catch (e) {
    return rejectWithValue((e as AxiosError).message);
  }
});

export const fetchtCryptoMap = createAsyncThunk('crypto/fetchtCryptoMap', async (params: { start?: number; limit?: number; symbol: string }, { rejectWithValue }) => {
  try {
    const res = await getCryptoMap(params);
    return res;
  } catch (e) {
    return rejectWithValue((e as AxiosError).message);
  }
});

export const fetchCryptoStats = createAsyncThunk('crypto/fetchCryptoStats', async (params: CryptoCurrencyStatParams, { rejectWithValue }) => {
  try {
    const res = await getCryptoStats(params);
    return res;
  } catch (e) {
    return rejectWithValue((e as AxiosError).message);
  }
});

const initialState: ICryptoData = {
  cryptoData: {
    data: [],
    favourites: [],
    status: null,
  },
  cryptoDetails: {
    data: null,
    status: null,
  },
  currencyData: {
    data: [],
    status: null,
  },
  cryptoMap: null,
  cryptoStats: null,
  statsLoading: false,
  cryptoMetadata: null,
  loading: false,
  filtersLoading: false,
  detailsLoading: false,
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoCurrencyMount.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCryptoCurrencyMount.fulfilled, (state, action) => {
        state.cryptoData.data = [...action.payload.data];
        state.cryptoData.favourites = action.payload.favorites;
        state.loading = false;
      })
      .addCase(fetchCryptoCurrency.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCryptoCurrency.fulfilled, (state, action) => {
        state.cryptoData.data = [...state.cryptoData.data, ...action.payload.data];
        state.cryptoData.status = action.payload.status;
        state.loading = false;
      })
      .addCase(fetchCryptofilters.pending, (state) => {
        state.filtersLoading = true;
      })
      .addCase(fetchCryptofilters.fulfilled, (state, action) => {
        state.filtersLoading = false;
        state.currencyData.data = action.payload.data;
        state.currencyData.status = action.payload.status;
      })
      .addCase(fetchCrypoDetails.pending, (state) => {
        state.detailsLoading = true;
      })
      .addCase(fetchCrypoDetails.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.cryptoDetails.data = action.payload.data;
        state.cryptoDetails.status = action.payload.status;
      })
      .addCase(fetchCryptoMetadata.fulfilled, (state, action) => {
        state.cryptoMetadata = action.payload.data;
      })
      .addCase(fetchCryptoStats.pending, (state) => {
        state.statsLoading = true;
      })
      .addCase(fetchCryptoStats.fulfilled, (state, action) => {
        state.statsLoading = false;
        state.cryptoStats = action.payload.data;
      })
      .addCase(fetchtCryptoMap.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchtCryptoMap.fulfilled, (state, action) => {
        state.loading = false;
        state.cryptoMap = action.payload.data;
      });
  },
});

export default cryptoSlice.reducer;
