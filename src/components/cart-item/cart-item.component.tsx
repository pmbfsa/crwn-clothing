import type { FC } from 'react';

import type { CartItemProps } from './cart-item.types';

import {
  CartItemContainer,
  ItemDetails,
  ItemImage,
  Name,
  Price,
} from './cart-item.styles';

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  return (
    <CartItemContainer>
      <ItemImage src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <Name>{name}</Name>
        <Price>
          {quantity} x ${price}
        </Price>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
