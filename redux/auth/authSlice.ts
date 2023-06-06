import { createSlice, PayloadAction, Store } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { IAuthState } from './model';
// import { RootState } from '../store';
export type RootState = ReturnType<Store['getState']>;

const initialState: IAuthState = {
  isAuth: null,
  showAnimation: false,
};
export const authSlice = createSlice({
  name: 'isAuth',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuth = action.payload;
    },
    setShowAnimation: (state, action) => {
      state.showAnimation = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(HYDRATE, (state, { payload }) => ({ ...state, ...payload.page }));
  },
});
export const { setIsAuthenticated, setShowAnimation } = authSlice.actions;
export default authSlice.reducer;
