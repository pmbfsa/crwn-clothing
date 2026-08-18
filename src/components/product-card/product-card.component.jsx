import { useSelector, useDispatch } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selectors.js';
import { addItemToCart } from '../../store/cart/cart.actions.js';

import BUTTON_TYPE_CLASS from '../button/button-type-class.jsx';

import Button from '../button/button.component.jsx';

import {
  ProductCardContainer,
  Footer,
  Name,
  Price,
} from './product-card.styles.jsx';

const ProductCard = ({ product }) => {
  const { name, imageUrl, price } = product;

  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

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
