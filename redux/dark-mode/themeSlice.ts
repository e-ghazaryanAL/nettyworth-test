import { createSlice } from '@reduxjs/toolkit';

import { Theme } from './model';

const initialState: Theme = {
  mode: 'light',
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
