import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import type { Category } from '../../routes/category/category.types';

import type { CategoriesState } from './categories.types';

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetchCategoriesStart(state) {
      state.isLoading = true;
    },
    fetchCategoriesSuccess(state, action: PayloadAction<Category[]>) {
      state.isLoading = false;
      state.categories = action.payload;
      state.error = null;
    },
    fetchCategoriesFail(state, action: PayloadAction<Error>) {
      state.isLoading = false;
      state.categories = [];
      state.error = action.payload;
    },
  },
});

const categoriesReducer = categoriesSlice.reducer;

export const {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFail,
} = categoriesSlice.actions;

export default categoriesReducer;
