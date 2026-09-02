import type { SubmitEvent, ChangeEvent } from 'react';

import { useState } from 'react';

import { useAppDispatch } from '../../store/hooks';

import type { AuthError } from 'firebase/auth';

import { AuthErrorCodes } from 'firebase/auth';

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

    try {
      dispatch(signUpStart({ email, password, displayName }));

      resetFormFields();
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert('Cannot sign up, email already in use.');
      } else {
        console.log('user create authentication failed:', error);
      }
    }
  };

  const fieldChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer>
      <h2>Dan't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={formSubmitHandle}>
        <FormInput
          label="Display Name"
          name="displayName"
          value={displayName}
          type="text"
          onChange={fieldChangeHandle}
          required
        />
        <FormInput
          label="Email"
          name="email"
          value={email}
          type="email"
          onChange={fieldChangeHandle}
          required
        />
        <FormInput
          label="Password"
          name="password"
          value={password}
          type="password"
          onChange={fieldChangeHandle}
          required
        />
        <FormInput
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
