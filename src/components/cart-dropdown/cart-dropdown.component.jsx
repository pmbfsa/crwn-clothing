import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selectors.js';

import CartItem from '../cart-item/cart-item.component.jsx';
import Button from '../button/button.component.jsx';

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from './cart-dropdown.styles.jsx';

const CartDropdown = () => {
  const navigate = useNavigate();

  const cartItems = useSelector(selectCartItems);

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  };

  return (
    <CartDropdownContainer>
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
