import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../../utils/test/test.utils';

import { setupStore } from '../../../store/store';
import { signUpStart } from '../../../store/user/user.slice';

import SignUpForm from '../sign-up-form.component';

describe('SignUpForm component', () => {
  it('should render the sign up form', () => {
    renderWithProviders(<SignUpForm />);

    const signUpFormElement = screen.getByTestId('sign-up-form');
    expect(signUpFormElement).toBeInTheDocument();
  });

  it('should alert user when password and confirm password fields do not match when sign up button is clicked', async () => {
    const mockUserData = {
      name: 'teste',
      email: 'teste@teste.com',
      password: 'teste',
    };

    const user = userEvent.setup();

    window.alert = vi.fn();

    renderWithProviders(<SignUpForm />);

    const displayNameElement = screen.getByTestId('sign-up-name-input');
    await user.type(displayNameElement, mockUserData.name);

    const emailElement = screen.getByTestId('sign-up-email-input');
    await user.type(emailElement, mockUserData.email);

    const passwordElement = screen.getByTestId('sign-up-password-input');
    await user.type(passwordElement, mockUserData.password);

    const confirmPasswordElement = screen.getByTestId(
      'sign-up-confirm-password-input',
    );
    await user.type(confirmPasswordElement, mockUserData.password.concat('2'));

    const signUpButton = screen.getByRole('button', { name: /sign up/i });
    await user.click(signUpButton);

    expect(window.alert).toHaveBeenCalledWith(
      "Password and Confirm fields don't match.",
    );
  });

  it('should dispatch signUpStart with filled display name, email and password when sign up button is clicked', async () => {
    const mockUserData = {
      name: 'teste',
      email: 'teste@teste.com',
      password: 'teste',
    };

    const user = userEvent.setup();
    const store = setupStore(true);

    const dipatchSpy = vi.spyOn(store, 'dispatch');

    renderWithProviders(<SignUpForm />, { store });

    const displayNameElement = screen.getByTestId('sign-up-name-input');
    await user.type(displayNameElement, mockUserData.name);

    const emailElement = screen.getByTestId('sign-up-email-input');
    await user.type(emailElement, mockUserData.email);

    const passwordElement = screen.getByTestId('sign-up-password-input');
    await user.type(passwordElement, mockUserData.password);

    const confirmPasswordElement = screen.getByTestId(
      'sign-up-confirm-password-input',
    );
    await user.type(confirmPasswordElement, mockUserData.password);

    const signUpButton = screen.getByRole('button', { name: /sign up/i });
    await user.click(signUpButton);

    expect(dipatchSpy).toHaveBeenCalledWith(
      signUpStart({
        email: mockUserData.email,
        password: mockUserData.password,
        displayName: mockUserData.name,
      }),
    );
  });
});
