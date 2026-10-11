import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test/test.utils';

import CategoriesPreview from '../categories-preview.component';

describe('CategoriesPreview component', () => {
  it('should render spinner if categories isLoading is true', () => {
    renderWithProviders(<CategoriesPreview />, {
      preloadedState: {
        categories: { categories: [], isLoading: true, error: null },
      },
    });

    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
  });

  it('should render CategoryPreview for each mapped category', () => {
    const mockCategories = [
      {
        title: 'Category A',
        items: [
          { id: 1, imageUrl: 'URL AA', name: 'Item AA', price: 10 },
          { id: 2, imageUrl: 'URL AB', name: 'Item AB', price: 20 },
          { id: 3, imageUrl: 'URL AC', name: 'Item AC', price: 30 },
        ],
      },
      {
        title: 'Category B',
        items: [
          { id: 4, imageUrl: 'URL BA', name: 'Item BA', price: 40 },
          { id: 5, imageUrl: 'URL BB', name: 'Item BB', price: 50 },
          { id: 6, imageUrl: 'URL BC', name: 'Item BC', price: 60 },
        ],
      },
    ];

    renderWithProviders(<CategoriesPreview />, {
      preloadedState: {
        categories: {
          categories: mockCategories,
          isLoading: false,
          error: null,
        },
      },
    });

    const spinnerElement = screen.queryByTestId('spinner');
    expect(spinnerElement).toBeNull();

    const categoryAElement = screen.getByText(/category a/i);
    expect(categoryAElement).toBeInTheDocument();

    const categoryBElement = screen.getByText(/category b/i);
    expect(categoryBElement).toBeInTheDocument();
  });
});
