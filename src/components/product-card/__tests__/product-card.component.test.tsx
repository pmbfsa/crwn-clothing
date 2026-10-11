import { screen, fireEvent } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test/test.utils';

import ProductCard from '../product-card.component';

describe('Product cart component', () => {
  it('should add product item to cart when the button is clicked', () => {
    const mockProduct = {
      id: 1,
      imageUrl: 'https://test.com',
      name: 'Item A',
      price: 10,
    };

    const { store } = renderWithProviders(
      <ProductCard product={mockProduct} />,
      {
        preloadedState: {
          cart: {
            isCartOpen: false,
            cartItems: [],
          },
        },
      },
    );

    const addItemToCartElement = screen.getByText(/add to cart/i);
    fireEvent.click(addItemToCartElement);

    expect(store.getState().cart.cartItems.length).toBe(1);
  });
});
