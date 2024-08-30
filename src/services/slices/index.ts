import { combineReducers, combineSlices } from '@reduxjs/toolkit';
import { burgerConstructorSlice } from './burgerConstructorSlice';
import { feedSlice } from './feedSlice';
import { ingrediensSlice } from './ingredientsSlice';
import { orderSlice } from './orderSlice';
import { userSlice } from './userSlice';

export const rootReducer = combineSlices(
  userSlice,
  burgerConstructorSlice,
  ingrediensSlice,
  feedSlice,
  orderSlice
);
