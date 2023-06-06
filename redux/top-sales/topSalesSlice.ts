/* eslint-disable no-console */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { CollectionsAssetsParams, ITopSalesData, ITopSalesDataParams, TopSalesState } from './model';
import { getTopSalesCollection, getTopSalesDetail } from '../../api/api';
import { menuItems } from '../../constant';

export const fetchCollectionsByPage = createAsyncThunk<ITopSalesData, ITopSalesDataParams, { rejectValue: string }>('sales/fetchByPage', async (params, { rejectWithValue }) => {
  try {
    const response = await getTopSalesCollection(params);
    return response;
  } catch (e) {
    return rejectWithValue((e as AxiosError).message);
  }
});

export const fetchCollection = createAsyncThunk('sales/fetchCollection', async (slug: string, { rejectWithValue }) => {
  try {
    const response = await getTopSalesCollection({ slug });
    return response;
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const fetchCollectionAssets = createAsyncThunk('sales/fetchSalesDetail', async (params: CollectionsAssetsParams, { rejectWithValue }) => {
  try {
    const res = await getTopSalesDetail(params, 'assets');
    return res;
  } catch (e) {
    return rejectWithValue((e as AxiosError).message);
  }
});

export const fetchCollectionTraitTypes = createAsyncThunk('sales/fetchCollectionTraitTypes', async (params: CollectionsAssetsParams, { rejectWithValue }) => {
  try {
    const res = await getTopSalesDetail(params, 'trait_types');
    return res.trait_types;
  } catch (e) {
    return rejectWithValue((e as AxiosError).message);
  }
});

const initialState: TopSalesState = {
  Collection: null,
  CollectionsAssets: null,
  CollectionTraits: null,
  NftTopSalesDetailFilter: {},
  selectedDay: menuItems[0].name,
  selectedDate: menuItems[0].date,
  loading: false,
  detailNftsLoading: false,
  error: null,
  singleCollectionLoading: false,
  CollectionAssetLoading: false,
  CollectionTraitLoading: false,
  NftTopSalesCollections: {} as ITopSalesData,
};

const topSalesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    selectDay(state, action: PayloadAction<string[]>) {
      const [date, day] = action.payload;
      state.selectedDay = day;
      state.selectedDate = date;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollectionsByPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCollectionsByPage.fulfilled, (state, action) => {
        state.loading = false;
        state.NftTopSalesCollections = action.payload;
      })
      .addCase(fetchCollectionsByPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchCollectionAssets.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchCollection.pending, (state) => {
        state.singleCollectionLoading = true;
      })
      .addCase(fetchCollection.fulfilled, (state, action) => {
        state.singleCollectionLoading = false;
        state.Collection = action.payload;
      })
      .addCase(fetchCollectionAssets.fulfilled, (state, action) => {
        state.CollectionAssetLoading = false;
        state.CollectionsAssets = action.payload;
      })
      .addCase(fetchCollectionTraitTypes.pending, (state) => {
        state.CollectionTraitLoading = true;
      })
      .addCase(fetchCollectionTraitTypes.fulfilled, (state, action) => {
        state.CollectionTraitLoading = false;
        state.CollectionTraits = action.payload;
      });
  },
});

export const { selectDay } = topSalesSlice.actions;
export default topSalesSlice.reducer;
