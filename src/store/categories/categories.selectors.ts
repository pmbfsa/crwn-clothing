import { createSelector } from 'reselect';

import type { PersistedRootState } from '../store';

import type { CategoriesMap } from './categories.types';

const selectCategoriesSlice = (state: PersistedRootState) => state.categories;

export const selectCategories = createSelector(
  [selectCategoriesSlice],
  (categoriesSlice) => categoriesSlice.categories,
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce<CategoriesMap>((acc, category) => {
      const { title, items } = category;

      acc[title.toLowerCase()] = items;

      return acc;
    }, {}),
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoriesSlice],
  (categoriesSlice) => categoriesSlice.isLoading,
);
