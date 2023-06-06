import { createSlice } from '@reduxjs/toolkit';

import { IPortfolio } from './model';
import { getCookie } from '../../utils/cookies';

const initialState: IPortfolio = {
  isOpen: getCookie('isOpen') ? getCookie('isOpen') : null,
  searchIsOpen: false,
};
const portfolioSlice = createSlice({
  name: 'isOpen',
  initialState,
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    searchHandler: (state) => {
      state.searchIsOpen = !state.searchIsOpen;
    },
  },
});
export const { setIsOpen, searchHandler } = portfolioSlice.actions;
export default portfolioSlice.reducer;
