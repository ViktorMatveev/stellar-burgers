import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TIngredient } from '@utils-types';
import { INGREDIENTS_SLICE_NAME } from './sliceNames';
import { getIngredients } from '../../services/thunk/ingredients';

interface TIngredientsState {
  ingredients: TIngredient[];
  requestStatus: RequestStatus;
}

const initialState: TIngredientsState = {
  ingredients: [],
  requestStatus: RequestStatus.Idle
};

export const ingrediensSlice = createSlice({
  name: INGREDIENTS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Succsess;
        state.ingredients = action.payload;
      });
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    getStatus: (state) => state.requestStatus
  }
});

export const ingredientActions = ingrediensSlice.actions;
export const ingredientSelectors = ingrediensSlice.selectors;
