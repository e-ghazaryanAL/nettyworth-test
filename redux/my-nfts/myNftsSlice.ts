import { createSlice } from '@reduxjs/toolkit';

import { IMyNftsState } from './model';

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
});

export default myNftsSlice.reducer;
