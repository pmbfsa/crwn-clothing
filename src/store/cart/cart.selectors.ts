import { createSelector } from 'reselect';

import type { PersistedRootState } from '../store';

const selectCartSlice = (state: PersistedRootState) => state.cart;

export const selectIsCartOpen = createSelector(
  [selectCartSlice],
  (cartSlice) => cartSlice.isCartOpen,
);

export const selectCartItems = createSelector(
  [selectCartSlice],
  (cartSlice) => cartSlice.cartItems,
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0),
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0,
  ),
);
