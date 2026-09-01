import type { CartItem } from '../../components/cart-item/cart-item.types';

export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[];
};
