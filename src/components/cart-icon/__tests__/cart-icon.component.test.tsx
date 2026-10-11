import { screen, fireEvent } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test/test.utils';

import { setupStore } from '../../../store/store';
import { setIsCartOpen } from '../../../store/cart/cart.slice';

import CartIcon from '../cart-icon.component';

describe('CartIcon component', () => {
  it('should display the correct cart item count', () => {
    renderWithProviders(<CartIcon />, {
      preloadedState: {
        cart: {
          isCartOpen: false,
          cartItems: [
            {
              id: 1,
              imageUrl: 'http://test.com.br',
              name: 'Item A',
              price: 10,
              quantity: 1,
            },
            {
              id: 2,
              imageUrl: 'http://test.com.br',
              name: 'Item B',
              price: 20,
              quantity: 2,
            },
          ],
        },
      },
    });

    const cartIconElement = screen.getByText('3');
    expect(cartIconElement).toBeInTheDocument();
  });

  it('should dispatch isCartOpen(true) when cart is close and icon is clicked', () => {
    const store = setupStore(true, {
      cart: { cartItems: [], isCartOpen: false },
    });

    const dispatchSpy = vi.spyOn(store, 'dispatch');

    renderWithProviders(<CartIcon />, { store });

    const cartIconElement = screen.getByTestId('cart-icon');
    fireEvent.click(cartIconElement);
    expect(dispatchSpy).toHaveBeenCalledWith(setIsCartOpen(true));
  });

  it('should dispatch isCartOpen(false) when cart is open and icon is clicked', () => {
    const store = setupStore(true, {
      cart: { cartItems: [], isCartOpen: true },
    });

    const dispatchSpy = vi.spyOn(store, 'dispatch');

    renderWithProviders(<CartIcon />, { store });

    const cartIconElement = screen.getByTestId('cart-icon');
    fireEvent.click(cartIconElement);
    expect(dispatchSpy).toHaveBeenCalledWith(setIsCartOpen(false));
  });
});
