import { screen, fireEvent } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test/test.utils';

import CheckoutItem from '../checkout-item.component';

const mockCartItem = {
  id: 1,
  imageUrl: 'URL A',
  name: 'Item 1',
  price: 10,
  quantity: 3,
};

describe('CheckoutItem component', () => {
  it('should render cart item', () => {
    renderWithProviders(
      <CheckoutItem key={mockCartItem.id} cartItem={mockCartItem} />,
    );

    const checkoutItemElement = screen.getByText(/Item 1/i);
    expect(checkoutItemElement).toBeInTheDocument();
  });

  it('should add item quantity when right arrow is clicked', () => {
    const { store } = renderWithProviders(
      <CheckoutItem key={mockCartItem.id} cartItem={mockCartItem} />,
      {
        preloadedState: {
          cart: { isCartOpen: false, cartItems: [mockCartItem] },
        },
      },
    );

    const rightArrowElement = screen.getByTestId('right-arrow');
    fireEvent.click(rightArrowElement);

    expect(store.getState().cart.cartItems[0].quantity).toBe(4);
  });

  it('should remove item quantity when left arrow is clicked', () => {
    const { store } = renderWithProviders(
      <CheckoutItem key={mockCartItem.id} cartItem={mockCartItem} />,
      {
        preloadedState: {
          cart: { isCartOpen: false, cartItems: [mockCartItem] },
        },
      },
    );

    const leftArrowElement = screen.getByTestId('left-arrow');
    fireEvent.click(leftArrowElement);

    expect(store.getState().cart.cartItems[0].quantity).toBe(2);
  });

  it('should clear item quantity when x button is clicked', () => {
    const { store } = renderWithProviders(
      <CheckoutItem key={mockCartItem.id} cartItem={mockCartItem} />,
      {
        preloadedState: {
          cart: { isCartOpen: false, cartItems: [mockCartItem] },
        },
      },
    );

    const xButtonElement = screen.getByTestId('x-button');
    fireEvent.click(xButtonElement);

    expect(store.getState().cart.cartItems).toEqual([]);
  });
});
