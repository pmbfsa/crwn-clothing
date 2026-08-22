import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    fetchCategoriesSuccess(state, action) {
      state.isLoading = false;
      state.categories = action.payload;
      state.error = null;
    },
    fetchCategoriesFail(state, action) {
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
