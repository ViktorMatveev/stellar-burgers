import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { ORDER_SLICE_NAME } from './sliceNames';
import { getOrderByNumber, getOrders, orderBurger } from '../thunk/order';

interface TOrderState {
  order: TOrder | null;
  orders: TOrder[];
  requestStatus: RequestStatus;
}

const initialState: TOrderState = {
  order: null,
  orders: [],
  requestStatus: RequestStatus.Idle
};

export const orderSlice = createSlice({
  name: ORDER_SLICE_NAME,
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.order = null;
      state.requestStatus = RequestStatus.Idle;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(getOrders.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Succsess;
        state.orders = action.payload;
      })
      .addCase(orderBurger.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.orders.push(action.payload.order);
        state.requestStatus = RequestStatus.Succsess;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Succsess;
        state.order = action.payload.orders[0];
        const newOrders = action.payload.orders.filter(
          (order) =>
            !state.orders.some(
              (existingOrder) => existingOrder._id === order._id
            )
        );
        state.orders.push(...newOrders);
      });
  },
  selectors: {
    getOrder: (state) => state.order,
    getOrders: (state) => state.orders,
    getOrderRequestStatus: (state) => state.requestStatus
  }
});

export const orderSelectors = orderSlice.selectors;
export const { resetOrder } = orderSlice.actions;
