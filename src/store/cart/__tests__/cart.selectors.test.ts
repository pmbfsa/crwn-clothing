import type { PersistedRootState } from '../../store';

import { initialState } from '../cart.slice';

import {
  selectIsCartOpen,
  selectCartItems,
  selectCartCount,
  selectCartTotal,
} from '../cart.selectors';

const mockState = {
  cart: {
    ...initialState,
    cartItems: [
      { id: 1, imageUrl: 'URL A', name: 'Item A', price: 10, quantity: 1 },
      { id: 2, imageUrl: 'URL B', name: 'Item B', price: 5, quantity: 2 },
    ],
  },
} as PersistedRootState;

describe('Cart selectors', () => {
  it('should return cart isCartOpen state for selectIsCartOpen', () => {
    const isCartOpen = selectIsCartOpen(mockState);
    expect(isCartOpen).toBe(mockState.cart.isCartOpen);
  });

  it('should return cart items array for selectCartItems', () => {
    const cartItems = selectCartItems(mockState);
    expect(cartItems).toEqual(mockState.cart.cartItems);
  });

  it('should return countability of cart items array for selectCartCount', () => {
    const mockStateCount = mockState.cart.cartItems.reduce(
      (prev, curr) => prev + curr.quantity,
      0,
    );

    const cartItems = selectCartCount(mockState);
    expect(cartItems).toEqual(mockStateCount);
  });

  it('should return total value of cart items array for selectCartTotal', () => {
    const mockStateTotal = mockState.cart.cartItems.reduce(
      (prev, curr) => prev + curr.quantity * curr.price,
      0,
    );

    const cartItems = selectCartTotal(mockState);
    expect(cartItems).toEqual(mockStateTotal);
  });
});
