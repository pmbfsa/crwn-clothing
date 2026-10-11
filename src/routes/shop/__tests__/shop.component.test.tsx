import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test/test.utils';

import { setupStore } from '../../../store/store';
import { fetchCategoriesStart } from '../../../store/categories/categories.slice';

import Shop from '../shop.component';

describe('Shop component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch fetchCategoriesStart on mount', () => {
    const store = setupStore(true);

    const dispatchSpy = vi.spyOn(store, 'dispatch');

    renderWithProviders(<Shop />, { store });

    expect(dispatchSpy).toHaveBeenCalledWith(fetchCategoriesStart());
  });

  it('should render CategoriesPreview on the index route', () => {
    const store = setupStore(true, {
      categories: {
        categories: [{ title: 'teste', items: [] }],
        isLoading: false,
        error: null,
      },
    });

    vi.spyOn(store, 'dispatch').mockImplementation((action) => action);

    renderWithProviders(<Shop />, { store });

    const categoryPreviewElement = screen.getByTestId('category-preview');
    expect(categoryPreviewElement).toBeInTheDocument();
  });

  it('should render Category on a category route', () => {
    const store = setupStore(true);

    vi.spyOn(store, 'dispatch').mockImplementation((action) => action);

    renderWithProviders(<Shop />, { store, route: '/teste' });

    const categoryElement = screen.getByTestId('category');
    expect(categoryElement).toBeInTheDocument();
  });
});
