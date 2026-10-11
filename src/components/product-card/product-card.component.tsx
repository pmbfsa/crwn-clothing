import type { FC } from 'react';

import { useAppDispatch } from '../../store/hooks';

import type { ProductCardProps } from './product-card.types';

import { addItemToCart } from '../../store/cart/cart.slice';

import BUTTON_TYPE_CLASS from '../button/button-type-class';

import Button from '../button/button.component';

import {
  ProductCardContainer,
  Footer,
  Name,
  Price,
} from './product-card.styles';

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { name, imageUrl, price } = product;

  const dispatch = useAppDispatch();

  const addProductToCart = () => dispatch(addItemToCart(product));

  return (
    <ProductCardContainer data-testid="product-card">
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
        <Button
          buttonType={BUTTON_TYPE_CLASS.inverted}
          onClick={addProductToCart}
        >
          Add to cart
        </Button>
      </Footer>
    </ProductCardContainer>
  );
};

export default ProductCard;
