import type { PersistedRootState } from '../../store';

import { initialState } from '../categories.slice';

import {
  selectCategories,
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from '../categories.selectors';

const mockState = {
  categories: {
    ...initialState,
    categories: [
      {
        title: 'mens',
        items: [
          { id: 1, imageUrl: 'Test 1', name: 'Product 1', price: 10 },
          { id: 2, imageUrl: 'Test 2', name: 'Product 2', price: 20 },
        ],
      },
      {
        title: 'womens',
        items: [
          { id: 3, imageUrl: 'Test 3', name: 'Product 3', price: 30 },
          { id: 4, imageUrl: 'Test 4', name: 'Product 4', price: 40 },
        ],
      },
    ],
  },
} as PersistedRootState;

describe('Categories selectors', () => {
  it('should return categories data for selectCategories', () => {
    const categories = selectCategories(mockState);
    expect(categories).toEqual(mockState.categories.categories);
  });

  it('should return categories isLoading state for selectCategoriesIsLoading', () => {
    const isLoading = selectCategoriesIsLoading(mockState);
    expect(isLoading).toBe(mockState.categories.isLoading);
  });

  it('should return the converted categories items array into the appropriate categories map for selectCategoriesMap', () => {
    const expectedCategoriesMap = {
      mens: [
        { id: 1, imageUrl: 'Test 1', name: 'Product 1', price: 10 },
        { id: 2, imageUrl: 'Test 2', name: 'Product 2', price: 20 },
      ],
      womens: [
        { id: 3, imageUrl: 'Test 3', name: 'Product 3', price: 30 },
        { id: 4, imageUrl: 'Test 4', name: 'Product 4', price: 40 },
      ],
    };

    const categoriesMap = selectCategoriesMap(mockState);
    expect(categoriesMap).toEqual(expectedCategoriesMap);
  });
});
