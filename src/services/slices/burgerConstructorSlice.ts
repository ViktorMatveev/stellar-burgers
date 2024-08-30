import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { BURGER_CONSTRUCTOR_SLICE_NAME } from './sliceNames';
import { getIngredients } from '../thunk/ingredients';

interface TBurgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: BURGER_CONSTRUCTOR_SLICE_NAME,
  initialState,
  reducers: {
    addItem: {
      prepare: (ingredients: TIngredient) => ({
        payload: { ...ingredients, id: nanoid() }
      }),
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      }
    },
    removeItem: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    resetConstructor: (state) => (state = initialState),

    reorderConstructor: (
      state,
      { payload }: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = payload;
      const ingredients = [...state.ingredients];
      ingredients.splice(to, 0, ingredients.splice(from, 1)[0]);
      state.ingredients = ingredients;
    }
  },
  selectors: {
    getBun: (state) => state.bun,
    getIngredients: (state) => state.ingredients
  }
});

export const burgerConstructorSelectors = burgerConstructorSlice.selectors;
export const burgerConstructorActions = burgerConstructorSlice.actions;
