import { createAsyncThunk } from '@reduxjs/toolkit';
import { ORDER_SLICE_NAME } from '../slices/sliceNames';
import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi,
  TNewOrderResponse,
  TOrderResponse
} from '@api';

export const getOrders = createAsyncThunk(
  `${ORDER_SLICE_NAME}/getOrders`,
  async () => {
    const orders = await getOrdersApi();
    return orders;
  }
);

export const orderBurger = createAsyncThunk<TNewOrderResponse, string[]>(
  `${ORDER_SLICE_NAME}/orderBurger`,
  async (dataOrder) => {
    const order = await orderBurgerApi(dataOrder);
    return order;
  }
);

export const getOrderByNumber = createAsyncThunk(
  `${ORDER_SLICE_NAME}/getOrderByNumber`,
  async (number: number) => {
    const order = await getOrderByNumberApi(number);
    return order;
  }
);
