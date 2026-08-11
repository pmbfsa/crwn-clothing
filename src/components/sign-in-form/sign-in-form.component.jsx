import { useState } from 'react';
import {
  signInWithGooglePopup,
  signInAuthWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils.js';

import BUTTON_TYPE_CLASS from '../button/button-type-class.jsx';

import FormInput from '../form-input/form-input.component.jsx';
import Button from '../button/button.component.jsx';

import { SignInContainer, ButtonContainer } from './sign-in-form.styles.jsx';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const formSubmitHandle = async (event) => {
    event.preventDefault();

    try {
      await signInAuthWithEmailAndPassword(email, password);

      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        alert('Incorrect email and password');
      } else {
        console.log('sign in authentication failed:', error.message);
      }
    }
  };

  const fieldChangeHandle = (event) => {
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
