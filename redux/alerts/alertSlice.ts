import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { IAlertState, INotification } from './model';
import { getNotifications } from '../../api/api';

const initialState: IAlertState = {
  notification: null,
  loading: false,
};

export const fetchUserNotification = createAsyncThunk<INotification>('alert/fetchfetchUserNotification', async (_, { rejectWithValue }) => {
  try {
    const res = await getNotifications();
    return res;
  } catch (e) {
    return rejectWithValue((e as AxiosError).message);
  }
});

const alertSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserNotification.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserNotification.fulfilled, (state, action) => {
      state.loading = false;
      state.notification = action.payload;
    });
  },
});

export default alertSlice.reducer;
