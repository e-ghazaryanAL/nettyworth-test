import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser, Trigger } from './model';

const initialState: IUser = {
  wallets: [],
  name: '',
  email: '',
  userImage: '',
  nettyWorth: 0,
  NFTValue: 0,
  collectionStats: null,
  nftInfo: null,
  loading: false,
  NFTInventory: [],
  trigger: 'portfolioCTA',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getCollectionStats: (state, action) => {
      state.collectionStats = action.payload;
    },
    getNftInfo: (state, action) => {
      state.nftInfo = action.payload;
    },
    getWalletDetail: (state, action) => {
      state.wallets = [action.payload];
    },
    addNFTValue: (state, action) => {
      state.NFTValue = action.payload;
      state.nettyWorth = action.payload + state.wallets[0].ethUsdValue;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTriggerMethod: (state, action: PayloadAction<Trigger>) => {
      state.trigger = action.payload;
    },
    setUserImage: (state, action) => {
      state.userImage = action.payload;
    },
  },
});

export const { getCollectionStats, getNftInfo, getWalletDetail, addNFTValue, setLoading, setTriggerMethod, setUserImage } = userSlice.actions;
export default userSlice.reducer;
