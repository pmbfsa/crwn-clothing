import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test/test.utils';

import CartItem from '../cart-item.component';

const mockCartItem = {
  id: 1,
  imageUrl: 'URL A',
  name: 'Item 1',
  price: 10,
  quantity: 1,
};

describe('CartItem component', () => {
  it('should render cart item', () => {
    renderWithProviders(<CartItem cartItem={mockCartItem} />);

    const cartItemElement = screen.getByText(/Item 1/i);
    expect(cartItemElement).toBeInTheDocument();
  });
});
