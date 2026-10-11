import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test/test.utils';

import CategoryPreview from '../category-preview.component';

const mockCategoryPreview = {
  title: 'Category A',
  products: [],
};

describe('CategoryPreview', () => {
  it('should render category preview', () => {
    const { title, products } = mockCategoryPreview;

    renderWithProviders(
      <CategoryPreview key={title} title={title} products={products} />,
    );

    const categoryPreviewElement = screen.getByTestId('category-preview');
    expect(categoryPreviewElement).toBeInTheDocument();
  });

  it('should render at maximum 4 products cards', () => {
    const { title, products } = {
      ...mockCategoryPreview,
      products: [
        { id: 1, imageUrl: 'URL A', name: 'Item 1', price: 10 },
        { id: 2, imageUrl: 'URL B', name: 'Item 2', price: 20 },
        { id: 3, imageUrl: 'URL C', name: 'Item 3', price: 30 },
        { id: 4, imageUrl: 'URL D', name: 'Item 4', price: 40 },
        { id: 5, imageUrl: 'URL E', name: 'Item 5', price: 50 },
      ],
    };

    renderWithProviders(
      <CategoryPreview key={title} title={title} products={products} />,
    );

    const productCardElements = screen.getAllByTestId('product-card');
    expect(productCardElements.length).toBe(4);
  });
});
