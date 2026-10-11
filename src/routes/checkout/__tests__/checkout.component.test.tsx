import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test/test.utils';

import Checkout from '../checkout.component';

const mockCartItems = [
  { id: 1, imageUrl: 'URL A', name: 'Item A', price: 10, quantity: 1 },
  { id: 2, imageUrl: 'URL B', name: 'Item B', price: 5, quantity: 3 },
  { id: 3, imageUrl: 'URL C', name: 'Item C', price: 2, quantity: 2 },
  { id: 4, imageUrl: 'URL D', name: 'Item D', price: 1, quantity: 1 },
];

describe('Checkout component', () => {
  it('should render', () => {
    renderWithProviders(<Checkout />);

    const checkoutElement = screen.getByTestId('checkout');
    expect(checkoutElement).toBeInTheDocument();
  });

  it('should render each cart item', () => {
    renderWithProviders(<Checkout />, {
      preloadedState: { cart: { isCartOpen: false, cartItems: mockCartItems } },
    });

    mockCartItems.forEach((cartItem) => {
      const cartItemElement = screen.getByText(`${cartItem.name}`);
      expect(cartItemElement).toBeInTheDocument();
    });
  });

  it('should render total cart value', () => {
    renderWithProviders(<Checkout />, {
      preloadedState: { cart: { isCartOpen: false, cartItems: mockCartItems } },
    });

    const totalElement = screen.getByText(/30/i);
    expect(totalElement).toBeInTheDocument();
  });
});
