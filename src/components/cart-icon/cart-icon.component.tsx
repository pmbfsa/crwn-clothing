import { useAppSelector, useAppDispatch } from '../../store/hooks';

import {
  selectIsCartOpen,
  selectCartCount,
} from '../../store/cart/cart.selectors';
import { setIsCartOpen } from '../../store/cart/cart.slice';

import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
  const dispatch = useAppDispatch();

  const isCartOpen = useAppSelector(selectIsCartOpen);
  const cartCount = useAppSelector(selectCartCount);

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
