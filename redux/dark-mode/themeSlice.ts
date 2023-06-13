import { createSlice } from '@reduxjs/toolkit';

import { Theme } from './model';
import { getCookie } from '../../utils/cookies';

const initialState: Theme = {
  mode: getCookie('theme'),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
