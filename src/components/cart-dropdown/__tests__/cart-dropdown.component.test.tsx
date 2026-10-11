import { Routes, Route } from 'react-router';
import { screen, fireEvent } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test/test.utils';

import CartDropdown from '../cart-dropdown.component';
import Checkout from '../../../routes/checkout/checkout.component';

const mockRoutes = (
  <Routes>
    <Route index element={<CartDropdown />} />
    <Route path="/checkout" element={<Checkout />} />
  </Routes>
);

describe('CartDropdown component', () => {
  it('should render', () => {
    renderWithProviders(mockRoutes);

    const cartDropdownElement = screen.getByTestId('cart-dropdown');
    expect(cartDropdownElement).toBeInTheDocument();
  });

  it('should render an info message for an empty cart', () => {
    renderWithProviders(mockRoutes, {
      preloadedState: {
        cart: { isCartOpen: true, cartItems: [] },
      },
    });

    const cartDropdownElement = screen.getByText(/Your cart is empty/i);
    expect(cartDropdownElement).toBeInTheDocument();
  });

  it('should render cart items for a filled cart', () => {
    renderWithProviders(mockRoutes, {
      preloadedState: {
        cart: {
          isCartOpen: true,
          cartItems: [
            {
              id: 1,
              imageUrl: 'URL A',
              name: 'Item 1',
              price: 10,
              quantity: 1,
            },
            {
              id: 2,
              imageUrl: 'URL B',
              name: 'Item 2',
              price: 20,
              quantity: 2,
            },
          ],
        },
      },
    });

    const cartItem1Element = screen.getByText(/Item 1/i);
    expect(cartItem1Element).toBeInTheDocument();

    const cartItem2Element = screen.getByText(/Item 2/i);
    expect(cartItem2Element).toBeInTheDocument();
  });

  it('should render Checkout when button is clicked', () => {
    renderWithProviders(mockRoutes);

    const checkoutButtonElement = screen.getByRole('button', {
      name: /GO TO CHECKOUT/i,
    });

    fireEvent.click(checkoutButtonElement);

    const checkoutElement = screen.getByTestId('checkout');
    expect(checkoutElement).toBeInTheDocument();
  });
});
