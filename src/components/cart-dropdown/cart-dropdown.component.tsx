import { useNavigate } from 'react-router';
import { useAppSelector } from '../../store/hooks';

import { selectCartItems } from '../../store/cart/cart.selectors';

import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from './cart-dropdown.styles';

const CartDropdown = () => {
  const navigate = useNavigate();

  const cartItems = useAppSelector(selectCartItems);

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  };

  return (
    <CartDropdownContainer data-testid="cart-dropdown">
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>

      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
