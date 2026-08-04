import { createContext } from 'react';

const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
});

export default CartContext;
