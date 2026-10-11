import {
  initialState,
  setIsCartOpen,
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from '../cart.slice';

import cartReducer from '../cart.slice';

describe('Cart slice', () => {
  it('should set isCartOpen value when setIsCartOpen is called', () => {
    const newState = cartReducer(initialState, setIsCartOpen(true));
    const expectedState = { ...initialState, isCartOpen: true };
    expect(newState).toEqual(expectedState);
  });

  it('should add a new product into an empty cartItems when addItemCart is called', () => {
    const mockProduct = {
      id: 1,
      imageUrl: 'URL A',
      name: 'Teste',
      price: 10,
    };

    const newState = cartReducer(initialState, addItemToCart(mockProduct));
    const expectedState = {
      ...initialState,
      cartItems: [{ ...mockProduct, quantity: 1 }],
    };

    expect(newState).toEqual(expectedState);
  });

  it('should add a new product to a filled cartItems when addItemCart is called', () => {
    const mockProduct = {
      id: 1,
      imageUrl: 'URL A',
      name: 'Teste',
      price: 10,
    };

    const newState = cartReducer(
      { ...initialState, cartItems: [{ ...mockProduct, quantity: 1 }] },
      addItemToCart({ ...mockProduct, id: 2 }),
    );

    const expectedState = {
      ...initialState,
      cartItems: [
        { ...mockProduct, quantity: 1 },
        { ...mockProduct, quantity: 1, id: 2 },
      ],
    };

    expect(newState).toEqual(expectedState);
  });

  it('should add quantity for a matching product in cartItems when addItemCart is called', () => {
    const mockProduct = {
      id: 1,
      imageUrl: 'URL A',
      name: 'Teste',
      price: 10,
    };

    const newState = cartReducer(
      {
        ...initialState,
        cartItems: [
          { ...mockProduct, quantity: 1 },
          { ...mockProduct, quantity: 1, id: 2 },
        ],
      },
      addItemToCart(mockProduct),
    );

    const expectedState = {
      ...initialState,
      cartItems: [
        { ...mockProduct, quantity: 2 },
        { ...mockProduct, quantity: 1, id: 2 },
      ],
    };

    expect(newState).toEqual(expectedState);
  });

  it('should reduce matched product quantity by one from cartItems when removeItemCart is called', () => {
    const mockCartItem = {
      id: 1,
      imageUrl: 'URL A',
      name: 'Teste',
      price: 10,
      quantity: 2,
    };

    const newState = cartReducer(
      {
        ...initialState,
        cartItems: [mockCartItem, { ...mockCartItem, id: 2 }],
      },
      removeItemFromCart(mockCartItem),
    );

    const expectedState = {
      ...initialState,
      cartItems: [
        { ...mockCartItem, quantity: 1 },
        { ...mockCartItem, quantity: 2, id: 2 },
      ],
    };

    expect(newState).toEqual(expectedState);
  });

  it('should remove product with one quantity from cartItems when removeItemCart is called', () => {
    const mockCartItem = {
      id: 1,
      imageUrl: 'URL A',
      name: 'Teste',
      price: 10,
      quantity: 1,
    };

    const newState = cartReducer(
      {
        ...initialState,
        cartItems: [mockCartItem, { ...mockCartItem, id: 2 }],
      },
      removeItemFromCart(mockCartItem),
    );

    const expectedState = {
      ...initialState,
      cartItems: [{ ...mockCartItem, id: 2 }],
    };

    expect(newState).toEqual(expectedState);
  });

  it('should do nothing by trying to remove a nonexistent product in cartItems when removeItemCart is called', () => {
    const mockCartItem = {
      id: 1,
      imageUrl: 'URL A',
      name: 'Teste',
      price: 10,
      quantity: 1,
    };

    const newState = cartReducer(
      {
        ...initialState,
        cartItems: [mockCartItem, { ...mockCartItem, id: 2 }],
      },
      removeItemFromCart({ ...mockCartItem, id: 3 }),
    );

    const expectedState = {
      ...initialState,
      cartItems: [mockCartItem, { ...mockCartItem, id: 2 }],
    };

    expect(newState).toEqual(expectedState);
  });

  it('should clear a product from cartItems when clearItemCart is called', () => {
    const mockCartItem = {
      id: 1,
      imageUrl: 'URL A',
      name: 'Teste',
      price: 10,
      quantity: 2,
    };

    const newState = cartReducer(
      {
        ...initialState,
        cartItems: [mockCartItem, { ...mockCartItem, id: 2 }],
      },
      clearItemFromCart(mockCartItem),
    );

    const expectedState = {
      ...initialState,
      cartItems: [{ ...mockCartItem, id: 2 }],
    };

    expect(newState).toEqual(expectedState);
  });
});
