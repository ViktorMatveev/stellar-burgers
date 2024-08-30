import { createAsyncThunk } from '@reduxjs/toolkit';
import { FEED_SLICE_NAME } from '../slices/sliceNames';
import { getFeedsApi } from '@api';

export const getFeeds = createAsyncThunk(
  `${FEED_SLICE_NAME}/getFeeds`,
  async () => {
    const feeds = await getFeedsApi();
    return feeds;
  }
);
