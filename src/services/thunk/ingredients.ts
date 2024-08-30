import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { INGREDIENTS_SLICE_NAME } from '../slices/sliceNames';
import { TIngredient } from '@utils-types';

export const getIngredients = createAsyncThunk<TIngredient[]>(
  `${INGREDIENTS_SLICE_NAME}/getIngredients`,
  async () => await getIngredientsApi()
);
