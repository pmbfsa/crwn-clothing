import { useContext } from 'react';

import BUTTON_TYPE_CLASS from '../button/button-type-class.jsx';

import Button from '../button/button.component.jsx';

import CartContext from '../../contexts/cart.context.jsx';

import {
  ProductCardContainer,
  Footer,
  Name,
  Price,
} from './product-card.styles.jsx';

const ProductCard = ({ product }) => {
  const { name, imageUrl, price } = product;

  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

  return (
    <ProductCardContainer>
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
