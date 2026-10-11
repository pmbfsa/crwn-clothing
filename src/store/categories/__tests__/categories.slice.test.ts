import {
  initialState,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFail,
} from '../categories.slice';

import categoriesReducer from '../categories.slice';

describe('Categories slice', () => {
  it('should set isLoading to true when fetchCategoriesStart is called', () => {
    const newState = categoriesReducer(initialState, fetchCategoriesStart());
    const expectedState = { ...initialState, isLoading: true };
    expect(newState).toEqual(expectedState);
  });

  it('should set categories value when fetchCategoriesSuccess is called', () => {
    const mockCategories = [
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
    ];

    const newState = categoriesReducer(
      initialState,
      fetchCategoriesSuccess(mockCategories),
    );

    const expectedState = { ...initialState, categories: mockCategories };

    expect(newState).toEqual(expectedState);
  });

  it('should set error value when fetchCategoriesError is called', () => {
    const mockError = new Error('Error fetching categories');

    const newState = categoriesReducer(
      initialState,
      fetchCategoriesFail(mockError),
    );

    const expectedState = { ...initialState, error: mockError };

    expect(newState).toEqual(expectedState);
  });
});
