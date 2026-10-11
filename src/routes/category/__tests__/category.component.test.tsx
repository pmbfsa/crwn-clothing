import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test/test.utils';

import Category from '../category.component';

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>();
  return {
    ...actual,
    useParams: () => ({
      category: 'mens',
    }),
  };
});

describe('Category component', () => {
  it('should render a Spinner if isLoading is true', () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          categories: [],
          isLoading: true,
          error: null,
        },
      },
    });

    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
  });

  it('should render Category with products if isLoading is false', () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          categories: [
            {
              items: [
                {
                  id: 1,
                  imageUrl: 'test',
                  name: 'Product 1',
                  price: 10,
                },
                {
                  id: 2,
                  imageUrl: 'test',
                  name: 'Product 2',
                  price: 20,
                },
              ],
              title: 'mens',
            },
          ],
          isLoading: false,
          error: null,
        },
      },
    });

    const spinnerElement = screen.queryByTestId('spinner');
    expect(spinnerElement).toBeNull();

    const product1Element = screen.getByText(/product 1/i);
    expect(product1Element).toBeInTheDocument();

    const product2Element = screen.getByText(/product 2/i);
    expect(product2Element).toBeInTheDocument();
  });
});
