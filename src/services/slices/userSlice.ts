import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TUser } from './../../utils/types';
import { USER_SLICE_NAME } from './sliceNames';
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '../thunk/user';

interface TUserState {
  isLoadind: boolean;
  error: string | null;
  isAuthChecked: boolean;
  user: TUser | null;
  requestStatus: RequestStatus;
}

const initialState: TUserState = {
  user: null,
  isLoadind: false,
  error: null,
  isAuthChecked: false,
  requestStatus: RequestStatus.Idle
};

export const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.isLoadind = true;
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoadind = false;
        state.error = action.error.message as string;
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.error = null;
        state.isLoadind = false;
        state.isAuthChecked = true;
        state.user = action.payload;
        state.requestStatus = RequestStatus.Succsess;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isLoadind = true;
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoadind = false;
        state.error = action.error.message as string;
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.error = null;
        state.isLoadind = false;
        state.isAuthChecked = true;
        state.user = action.payload;
        state.requestStatus = RequestStatus.Succsess;
      })
      .addCase(getUser.pending, (state, action) => {
        state.isLoadind = true;
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoadind = false;
        state.error = action.error.message as string;
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.error = null;
        state.isLoadind = false;
        state.isAuthChecked = true;
        state.user = action.payload;
        state.requestStatus = RequestStatus.Succsess;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.isLoadind = true;
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoadind = false;
        state.error = action.error.message as string;
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.error = null;
        state.isLoadind = false;
        state.isAuthChecked = true;
        state.user = action.payload;
        state.requestStatus = RequestStatus.Succsess;
      })
      .addCase(logoutUser.pending, (state, action) => {
        state.isLoadind = true;
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoadind = false;
        state.error = action.error.message as string;
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.error = null;
        state.isLoadind = false;
        state.isAuthChecked = false;
        state.user = null;
        state.requestStatus = RequestStatus.Succsess;
      });
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked,
    getUserRequestStatus: (state) => state.requestStatus,
    gerError: (state) => state.error
  }
});

export const userActions = userSlice.actions;
export const userSelectors = userSlice.selectors;
