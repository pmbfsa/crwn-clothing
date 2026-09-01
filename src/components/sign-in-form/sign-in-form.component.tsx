import type { SubmitEvent, ChangeEvent } from 'react';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  googleSignInStart,
  emailSignInStart,
} from '../../store/user/user.slice';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import BUTTON_TYPE_CLASS from '../button/button-type-class';

import { SignInContainer, ButtonContainer } from './sign-in-form.styles';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = () => {
    dispatch(googleSignInStart());
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const formSubmitHandle = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(emailSignInStart({ email, password }));

    resetFormFields();
  };

  const fieldChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={formSubmitHandle}>
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
        <ButtonContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASS.google}
            onClick={signInWithGoogle}
          >
            Google sign in
          </Button>
        </ButtonContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
