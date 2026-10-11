import type { SubmitEvent, ChangeEvent } from 'react';

import { useState } from 'react';

import { useAppDispatch } from '../../store/hooks';

import { signUpStart } from '../../store/user/user.slice';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { SignUpContainer } from './sign-up-form.styles';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const dispatch = useAppDispatch();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const formSubmitHandle = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password and Confirm fields don't match.");
      return;
    }

    dispatch(signUpStart({ email, password, displayName }));
    resetFormFields();
  };

  const fieldChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer data-testid="sign-up-form">
      <h2>Dan't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={formSubmitHandle}>
        <FormInput
          data-testid="sign-up-name-input"
          label="Display Name"
          name="displayName"
          value={displayName}
          type="text"
          onChange={fieldChangeHandle}
          required
        />
        <FormInput
          data-testid="sign-up-email-input"
          label="Email"
          name="email"
          value={email}
          type="email"
          onChange={fieldChangeHandle}
          required
        />
        <FormInput
          data-testid="sign-up-password-input"
          label="Password"
          name="password"
          value={password}
          type="password"
          onChange={fieldChangeHandle}
          required
        />
        <FormInput
          data-testid="sign-up-confirm-password-input"
          label="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          type="password"
          onChange={fieldChangeHandle}
          required
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
