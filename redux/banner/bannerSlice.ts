import { createSlice } from '@reduxjs/toolkit';
// import { getCookie } from 'utils/cookies';

import { IBanner } from './model';

const initialState: IBanner = {
  isVisible: false,
};
const bannerSlice = createSlice({
  name: 'isVisible',
  initialState,
  reducers: {
    setIsVisible: (state, action) => {
      state.isVisible = action.payload;
    },
  },
});
export const { setIsVisible } = bannerSlice.actions;
export default bannerSlice.reducer;
