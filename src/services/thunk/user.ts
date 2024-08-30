import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TAuthResponse,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../slices/sliceNames';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { Token } from '@utils-types';

export const getUser = createAsyncThunk(
  `${USER_SLICE_NAME}/getUser`,
  async () => {
    const response = await getUserApi();
    return response.user;
  }
);

export const registerUser = createAsyncThunk(
  `${USER_SLICE_NAME}/registerUser`,
  async (dataUser: TRegisterData) => {
    const responce = await registerUserApi(dataUser);
    setCookie(Token.AccessToken, responce.accessToken);
    localStorage.setItem(Token.RefreshToken, responce.refreshToken);
    return responce.user;
  }
);

export const loginUser = createAsyncThunk(
  `${USER_SLICE_NAME}/loginUser`,
  async (dataUser: TLoginData) => {
    const responce = await loginUserApi(dataUser);
    setCookie(Token.AccessToken, responce.accessToken);
    localStorage.setItem(Token.RefreshToken, responce.refreshToken);
    return responce.user;
  }
);

export const logoutUser = createAsyncThunk(
  `${USER_SLICE_NAME}/logoutUser`,
  async () => {
    await logoutApi();
    deleteCookie(Token.AccessToken);
    localStorage.removeItem(Token.RefreshToken);
  }
);

export const updateUser = createAsyncThunk(
  `${USER_SLICE_NAME}/updateUser`,
  async (data: Partial<TRegisterData>) => {
    const responce = await updateUserApi(data);
    return responce.user;
  }
);
