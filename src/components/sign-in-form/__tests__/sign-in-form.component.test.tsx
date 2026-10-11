import { screen, fireEvent } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../../utils/test/test.utils';

import { setupStore } from '../../../store/store';
import {
  emailSignInStart,
  googleSignInStart,
} from '../../../store/user/user.slice';

import SignInForm from '../sign-in-form.component';

describe('SignInForm component', () => {
  it('should render the sign in form', () => {
    renderWithProviders(<SignInForm />);

    const signInFormElement = screen.getByTestId('sign-in-form');
    expect(signInFormElement).toBeInTheDocument();
  });

  it('should dispatch emailSignInStart with the filled email and password when sign in button is clicked', async () => {
    const mockUserData = { email: 'teste@teste.com', password: 'teste' };

    const user = userEvent.setup();
    const store = setupStore(true);

    const dispatchSpy = vi.spyOn(store, 'dispatch');

    renderWithProviders(<SignInForm />, { store });

    const emailInputElement = screen.getByTestId('sign-in-email-input');
    await user.type(emailInputElement, mockUserData.email);

    const passwordInputElement = screen.getByTestId('sign-in-password-input');
    await user.type(passwordInputElement, mockUserData.password);

    const submitButtonElement = screen.getByRole('button', {
      name: 'Sign In',
    });
    await user.click(submitButtonElement);

    expect(dispatchSpy).toHaveBeenCalledWith(emailSignInStart(mockUserData));
  });

  it('should dispatch googleSignInStart when google sign in button is clicked', () => {
    const store = setupStore(true);

    const dispatchSpy = vi.spyOn(store, 'dispatch');

    renderWithProviders(<SignInForm />, { store });

    const googleButtonElement = screen.getByRole('button', {
      name: /google sign in/i,
    });

    fireEvent.click(googleButtonElement);

    expect(dispatchSpy).toHaveBeenCalledWith(googleSignInStart());
  });
});
