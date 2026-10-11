import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test/test.utils';

import { setupStore } from '../../../store/store';
import { signOutStart } from '../../../store/user/user.slice';

import Navigation from '../navigation.component';

describe('Navigation component', () => {
  it('should render sign in link and not sign out link if there is no currentUser', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: null,
          isLoading: false,
          error: null,
        },
      },
    });

    const signInLinkElement = screen.getByText(/sign in/i);
    expect(signInLinkElement).toBeInTheDocument();

    const signOutLinkElement = screen.queryByText(/sign out/i);
    expect(signOutLinkElement).toBeNull();
  });

  it('should render sign out link and not sign in link if there is a currentUser', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: {
            id: '1',
            createdAt: Date.toString(),
            displayName: 'Teste',
            email: 'teste@teste.com',
          },
          isLoading: false,
          error: null,
        },
      },
    });

    const signInLinkElement = screen.queryByText(/sign in/i);
    expect(signInLinkElement).toBeNull();

    const signOutLinkElement = screen.getByText(/sign out/i);
    expect(signOutLinkElement).toBeInTheDocument();
  });

  it('should not render a cart dropdown if isCartOpen is false', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: { cart: { isCartOpen: false, cartItems: [] } },
    });

    const cartDropdownElement = screen.queryByText(/your cart is empty/i);
    expect(cartDropdownElement).toBeNull();
  });

  it('should render a cart dropdown if isCartOpen is true', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: { cart: { isCartOpen: true, cartItems: [] } },
    });

    const cartDropdownElement = screen.getByText(/your cart is empty/i);
    expect(cartDropdownElement).toBeInTheDocument();
  });

  it('should dispatch signOutStart action when clicking on the sign out link', () => {
    const store = setupStore(true, {
      user: {
        currentUser: {
          id: '1',
          createdAt: Date.toString(),
          displayName: 'Teste',
          email: 'teste@teste.com',
        },
        isLoading: false,
        error: null,
      },
    });

    const dispatchSpy = vi.spyOn(store, 'dispatch');

    renderWithProviders(<Navigation />, {
      store,
    });

    const signOutLinkElement = screen.getByText(/sign out/i);
    expect(signOutLinkElement).toBeInTheDocument();

    fireEvent.click(signOutLinkElement);
    expect(dispatchSpy).toHaveBeenCalled();

    const signOutAction = signOutStart();
    expect(dispatchSpy).toHaveBeenCalledWith(signOutAction);
  });
});
