import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IMyNftsState, WalletDetailOptions } from './model';
import { getWalletDetails } from '../../api/api';

export const fetchMyNfts = createAsyncThunk('myNfts/fetchMyNfts', async ({ address, page }: WalletDetailOptions, { rejectWithValue }) => {
  try {
    const res = await getWalletDetails(address, page);
    return res.nftInfo;
  } catch (e) {
    return rejectWithValue(e);
  }
});

const initialState: IMyNftsState = {
  myNfts: {
    owner: '',
    assets: [],
    pageNumber: 1,
    totalItems: 0,
    totalPages: 1,
  },
  loading: false,
};

const myNftsSlice = createSlice({
  name: 'myNfts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyNfts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyNfts.fulfilled, (state, action) => {
        state.loading = false;
        state.myNfts = action.payload;
      });
  },
});

export default myNftsSlice.reducer;
