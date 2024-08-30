import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { FEED_SLICE_NAME } from './sliceNames';
import { getFeeds } from '../thunk/feed';

interface TFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  requestStatus: RequestStatus;
}

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  requestStatus: RequestStatus.Idle
};

export const feedSlice = createSlice({
  name: FEED_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Succsess;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  },
  selectors: {
    getFeeds: (state) => state.orders,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday,
    getFeedRequestStatus: (state) => state.requestStatus
  }
});

export const feedSelectors = feedSlice.selectors;
