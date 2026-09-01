import type { CategoryItem } from '../../routes/category/category.types';

export type CartItem = CategoryItem & {
  quantity: number;
};

export type CartItemProps = {
  cartItem: CartItem;
};
